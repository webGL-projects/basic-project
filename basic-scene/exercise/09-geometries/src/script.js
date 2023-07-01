import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


/* 
BufferGeometery class
https://threejs.org/docs/#api/en/core/BufferGeometry

BoxGeometrey
https://threejs.org/docs/#api/en/geometries/BoxGeometry

PlaneGeometrey
https://threejs.org/docs/#api/en/geometries/PlaneGeometry

CircleGeometrey 
https://threejs.org/docs/#api/en/geometries/CircleGeometry

ConeGeometrey
https://threejs.org/docs/#api/en/geometries/ConeGeometry

cylinderGeometery
https://threejs.org/docs/#api/en/geometries/CylinderGeometry

RingGeometrey
https://threejs.org/docs/#api/en/geometries/RingGeometry

TorusGeometery
https://threejs.org/docs/#api/en/geometries/TorusGeometry

TorusknotGeometrey
https://threejs.org/docs/#api/en/geometries/TorusKnotGeometry

DodecahedronGeometry
https://threejs.org/docs/#api/en/geometries/DodecahedronGeometry

OctahedronGeometry
https://threejs.org/docs/#api/en/geometries/OctahedronGeometry

TetrahedronGeometry
https://threejs.org/docs/#api/en/geometries/TetrahedronGeometry

IcosahedronGeometry
https://threejs.org/docs/#api/en/geometries/IcosahedronGeometry

SphereGeometry
https://threejs.org/docs/#api/en/geometries/SphereGeometry

ShapeGeometery
https://threejs.org/docs/#api/en/geometries/ShapeGeometry

TubeGeometry
https://threejs.org/docs/#api/en/geometries/TubeGeometry

ExtrudeGeometry
https://threejs.org/docs/#api/en/geometries/ExtrudeGeometry

LatheGeometry
https://threejs.org/docs/#api/en/geometries/LatheGeometry

TextGeometry
https://threejs.org/docs/?q=textge#examples/en/geometries/TextGeometry

By Combining those, we can create pretty complex shapes

*/

 
// Object
// const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)

const geometry = new THREE.BufferGeometry( )
/*
The Box Geometry accepts 6 parameters
1. width: x-axis
2. height: y-axis
3. depth: z-axis
4. WidthSegemts: how many subdivisions in the x-axis
5. HeightSegments: how many subdivisions in the y-axis
6. DepthSegments: how many subdivisions in the z-axis 

- The Subdivisions corresponds to how much triangles should compose a face 
 * 1 = 2 triangles perface
 *  2 = 8 triangles per face

The problem is we can't see these triangles.
*/

/* 
Creating our own geometery by using buffer geometery

to create our own geometery we need to store out data using float32Array 
 * Typed array
 * can only store floats
 * fixed length 
 * easier to handle for the computer

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array

*/
 
// const positionsArray = new Float32Array([
    //     0, 0 , 0,
    //     0, 1, 0,
    //     1, 0, 0
    // ]); // we used 9 to create a triangle because we have 3 varticies each one needs 3 value(x,y,z)
    
    const count = 5000;
    const positionsArray = new Float32Array(count * 3 * 3)
    
    for (let i=0; i < count; i++) {
        positionsArray[i] = (Math.random() - 0.5) * 4
    }
    // we can convert the Float32Array to a BufferAttribute 
    const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3) // 3 corresponds to how much values compose one vertex


// we can send this BufferAttribute to our BufferGeometery with setAttribute()
geometry.setAttribute('position', positionsAttribute) // 'position is used in sheders

/*
Index: some Geometry have faces that share common verticies when creating a BufferGeometry we can specify a bunch of verticies and then the indicies to create the faces and re-use verticies multiple times
*/

/*
old boring way to fill the Float32Array

const positionsArray = new Float32Array(9); // we used 9 to create a triangle because we have 3 varticies each one needs 3 value(x,y,z)

positionsArray[0] = 0;
positionsArray[1] = 0;
positionsArray[2] = 0;

positionsArray[3] = 0;
positionsArray[4] = 1;
positionsArray[5] = 0;

positionsArray[6] = 1;
positionsArray[7] = 0;
positionsArray[8] = 0;
*/



const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true }) // we use the wireframe to see the subdisions
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
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

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
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