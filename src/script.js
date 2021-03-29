import './styles.css'
import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import cameraModel from './models/camera/camera.fbx';

import cameraDiffuse from './models/camera/textures/Camera_01_8-bit_Diffuse.png'
import cameraMetallic from './models/camera/textures/Camera_01_8-bit_Metallic.png'
import cameraNormal from './models/camera/textures/Camera_01_8-bit_Normal.png'
import cameraRoughness from './models/camera/textures/Camera_01_8-bit_Roughness.png'

import lensDiffuse from './models/camera/textures/Camera_01_Lens_8-bit_Diffuse.png'
import lensMetallic from './models/camera/textures/Camera_01_Lens_8-bit_Metallic.png'
import lensNormal from './models/camera/textures/Camera_01_Lens_8-bit_Normal.png'
import lensRoughness from './models/camera/textures/Camera_01_Lens_8-bit_Roughness.png'

import strapDiffuse from './models/camera/textures/Camera_01_StrapCover_8-bit_Diffuse.png'
import strapMetallic from './models/camera/textures/Camera_01_StrapCover_8-bit_Metallic.png'
import strapNormal from './models/camera/textures/Camera_01_StrapCover_8-bit_Normal.png'
import strapRoughness from './models/camera/textures/Camera_01_StrapCover_8-bit_Roughness.png'

import * as dat from 'dat.gui'
import { MeshStandardMaterial } from 'three';

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas#watch-canvas');

// Scene
const scene = new THREE.Scene();

// Model
const fbx_loader = new FBXLoader();
const texture_loader = new THREE.TextureLoader();
let model = null;

let mesh = null;

fbx_loader.load( cameraModel, function ( object ) {

  object.traverse( function ( child ) {

    if ( child.isMesh ) {

      child.castShadow = true;
      child.receiveShadow = true;
      // child.material = new MeshStandardMaterial({
      //   metalnessMap: texture_loader.load(cameraMetallic),
      //   map: texture_loader.load(cameraDiffuse),
      //   normalMap: texture_loader.load(cameraNormal),
      //   roughnessMap: texture_loader.load(cameraRoughness)
      // });
    }
  } );

  model = object;
  scene.add(model);
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
  canvas: canvas,
  alpha: true
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