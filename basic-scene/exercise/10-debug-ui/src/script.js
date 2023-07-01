import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import * as dat from 'lil-gui';

/*
To debug our code we need to use a debug UI like 

1. Dat.GUI This will be used 
lil-gui
https://github.com/dataarts/dat.gui

2. Control Panel
https://github.com/freeman-lab/control-panel

3. controlkit
https://github.com/automat/controlkit.js

4. guify
https://github.com/colejd/guify

5. oui 
https://github.com/wearekuva/oui

*/

/*
 Debug
*/

const gui = new dat.GUI();

/*
    This creates a debug UI but it will be empty wecan add:
     1. Range: for numbers with minimum and maximum value
     2. color: for colors with various formats
     3. checkbox: for booleans (true or false)
     4. select: for a choice from a list of values
     5. button: to trigger functions
     6. Folder: to roganize the panel if you have too many elements
    
    gui.add(object, name of tweak) we can add more parameters like min, max and step

    we can also use the min(), max(), strp() methods 

    we can change the name with name()

    lil.gui will change the type of tweak according to the type of property

    color use addColor()
*/

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */

const colorFormats = {
	string: '#ffffff',
	int: 0xffffff,
	object: { r: 1, g: 1, b: 1 },
	array: [ 1, 1, 1 ],
    spin: () => {
        console.log('spin')
        gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI *2 })
    }
};

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: colorFormats.string })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// range
gui.add(mesh.position, 'x').min(-3).max(3).step(0.01) // debug UI
gui.add(mesh.position, 'y', -3, 3, 0.01).name('Elevation') // debug UI
gui.add(mesh.position, 'z', -3, 3, 0.01) // debug UI

// booleans 
gui.add(mesh, 'visible') // show and hide the mesh
gui.add(material, 'wireframe')

// color 
 gui.addColor(colorFormats, 'string').onChange( () => {
    material.color.set(colorFormats.string)
 })

 // Functions
 gui.add(colorFormats, 'spin')

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
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

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

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()