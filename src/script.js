import './styles.css'
import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import cameraModel from './models/camera/camera.fbx';
import * as dat from 'dat.gui'

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas#watch-canvas');

// Scene
const scene = new THREE.Scene();

// Model
const loader = new FBXLoader();
let model = null;

loader.load( cameraModel, function ( object ) {

  object.traverse( function ( child ) {

    if ( child.isMesh ) {

      child.castShadow = true;
      child.receiveShadow = true;

    }

  } );

  model = object;
  scene.add( model );

} );

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

/**
 * Sizes
 */
 const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () =>
{
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

/**
 * Renderer
 */
 const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
* Animate
*/

const clock = new THREE.Clock()

const tick = () =>
{

  const elapsedTime = clock.getElapsedTime()

  // Update objects
  if(model != null){
    model.rotation.y = .5 * elapsedTime
  }

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()