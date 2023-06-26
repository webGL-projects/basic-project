import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

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
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    // width: 800,
    // height: 600

    // to get the viewport width and height we use
    width: window.innerWidth,
    height: window.innerHeight // these method have margin so we need to do some css

}

/* 
when we change the size of the browser the canvas does not resize, to solve it we need to use size listeners
*/ 

window.addEventListener('resize', () => {
    console.log('Window has been resized!!');

    // update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // update the camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

 

    // update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // in case the user changes the window from a screen to another
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

   /*
    Pixel Ratio:
      it corresponds to how many physical pixels you have on the screen for one pixel unit on the software part
    Pixel ratio greater than 1 cause blurry render and stairs effect on the edges
    pixel ratio of 2 means 4 times more pixels to render , PR of 3 means 9 times the pixels and so on
    Hisgest pixel ratios are usually on the weakest devices - mobiles 

    to get the pixel ratio we can use window.devicePixelRatio to update thr renderer accordingly
    we need to limit the pixelRatio because in devices with higher PR it will be too much for the device to handle
    */
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // Limiting the device Pixel Ratio to 2 


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