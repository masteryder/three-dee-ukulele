import './styles.css'
import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import ukuleleModel from './models/ukulele/ukulele.fbx';

import uDiffuse from './models/ukulele/textures/Ukulele_01_8-bit_Diffuse.png'
import uMetallic from './models/ukulele/textures/Ukulele_01_16-bit_Metallic.png'
import uNormal from './models/ukulele/textures/Ukulele_01_8-bit_Normal.png'
import uRoughness from './models/ukulele/textures/Ukulele_01_16-bit_Roughness.png'
import uHeight from './models/ukulele/textures/Ukulele_01_16-bit_Height.png'


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

fbx_loader.load( ukuleleModel, function ( object ) {

  object.traverse( function ( child ) {

    if ( child.isMesh ) {
      child.castShadow = true;
      child.receiveShadow = true;

      let ukuleleMaterial = new MeshStandardMaterial({
        metalnessMap: texture_loader.load(uMetallic),
        map: texture_loader.load(uDiffuse),
        normalMap: texture_loader.load(uNormal),
        roughnessMap: texture_loader.load(uRoughness),
      });
      child.material = ukuleleMaterial;
      child.depthWrite = false;
    }
  });
  model = object;
  scene.add(model);
} );

// Lights

const light1Color = {
  color: 0xffffff
}

const pointLight = new THREE.PointLight(light1Color.color, .5)
pointLight.position.x = 0
pointLight.position.y = 100
pointLight.position.z = 300
scene.add(pointLight)



const light1folder = gui.addFolder('Light 1');
light1folder.addColor(light1Color, 'color').onChange(()=>{
  pointLight.color.set(light1Color.color);
})
light1folder.add(pointLight.position, 'x')
light1folder.add(pointLight.position, 'y')
light1folder.add(pointLight.position, 'z')
light1folder.add(pointLight, 'intensity')


const light2Color = {
  color: 0x550e0e
}

const pointLight2 = new THREE.PointLight(light2Color.color,  .5)
pointLight2.position.x = 400
pointLight2.position.y = -1000
pointLight2.position.z = 0
scene.add(pointLight2)

const light2folder = gui.addFolder('Light 2');
light2folder.addColor(light2Color, 'color').onChange(()=>{
  pointLight2.color.set(light2Color.color)
})
light2folder.add(pointLight2.position, 'x')
light2folder.add(pointLight2.position, 'y')
light2folder.add(pointLight2.position, 'z')
light2folder.add(pointLight2, 'intensity')


const light3Color = {
  color: 0x2553b1
}
const pointLight3 = new THREE.PointLight(light3Color.color, 1)
pointLight3.position.x = 0
pointLight3.position.y = -400
pointLight3.position.z = 1000
scene.add(pointLight3)

const light3folder = gui.addFolder('Light 3');
light3folder.addColor(light3Color, 'color').onChange(()=>{
  pointLight3.color.set(light3Color.color)
})
light3folder.add(pointLight3.position, 'x')
light3folder.add(pointLight3.position, 'y')
light3folder.add(pointLight3.position, 'z')
light3folder.add(pointLight3, 'intensity')


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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 10000)
camera.position.set(0,350, 500)
gui.add(camera.position, 'x')
gui.add(camera.position, 'y')
gui.add(camera.position, 'z')

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