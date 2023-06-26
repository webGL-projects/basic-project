import * as THREE from 'three'


/*
Cursor

This part does not have anything to do with threeJS 
*/

// this use to listen to the mouse movement 
const cursor = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = - (event.clientY / sizes.height - 0.5);
    // console.log(cursor.x, cursor.y)  // These values are in pixel we don't want that we want to have a value with amplitude of 1 and that can be +ve and -ve

})

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

// Camera

// Perspective camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
/*
 Perspective camera (Feild of view (45-75), Aspect Ratio (Width/Heigth), Near, Far)
 Near Corresponds to how close the camera can see
 Far is hpw far th camera can see

 Near & Far Create a range where the objects will show any closer and further will not show!

 Using Exetreme values like 0.00001 and 999999999 will cause z-fighting
 z-fighting is when the GPU does not know which plain of view is first so it murges the two objects togeather creating the glitch look
 to avoid it use 0.1 and 100 by default change it when neccessary don't use exetreme values 

 https://threejs.org/docs/#api/en/cameras/OrthographicCamera
*/

// Orthographic camera 

// const aspectRatio = sizes.width / sizes.height;
// console.log(aspectRatio)
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100)

/*
it has no perspective.
The objects has the same size no matter the distance to the camera

Parameters instead of FOV we provide fow far the camera can see in each direction (left, right, top, bottom) then the near and far
by default left = -1, right= 1 top= 1 bottom = -1

because it has no perspective the cube looks flat, it's because we are rendering a square area into  a rectangle canvas we need to use the canvas ratio (width/height)

We calculate the aspect ration and multiply it to the left and right parameters to have a visual correct object

https://threejs.org/docs/#api/en/cameras/OrthographicCamera
*/


// camera.position.x = 2
// camera.position.y = 2 // to start controling the camera
camera.position.z = 3
console.log(camera.position.length())

camera.lookAt(mesh.position)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects ==> Animations
    // mesh.rotation.y = elapsedTime;

    // Update Camera ==> Moving camera with mouse
    // camera.position.x = cursor.x * 10;
    // camera.position.y = - cursor.y * 10; // the Y-axis in threeJS is +ve Going up so we must invert the y-axis value either here or above i will do it here
    
    // to move the camera around the center of the scene we use Math.sin() Math.cos() and Math.PI
    camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2;
    camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2;
    camera.position.y = cursor.y * 2;
    
    camera.lookAt(mesh.position) // move the camera arounfd the object still can't see the back of the cube
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()