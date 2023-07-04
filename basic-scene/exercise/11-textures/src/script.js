import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

THREE.ColorManagement.enabled = false // to make the colors be more accurate 


/**
 * Base
 */

/*
Textures 
are images that will cover the surface of the geometies many types with many different effects

Door Texture will be used 
https://3dtextures.me/2019/04/16/door-wood-001/

color or albedo 
The texture is a diffuse map and it defines how light interacts with an object's surface in real world situations
it is applied on the geometry

Alpha 
a greyscale image where the white is visible and the black is not

height 
greyscale image that move the verticies (white move up, black down, and perfect greyscale it won't move) to create some relief , it needs enough subdivision  

Normal
it adds details, doesn't need subdivision, the vertices won't move, lure the light about the face orientation, better performances than adding a height texture with a lot of subdivision.

ambient occlusion
a grayscale image, add fake shadows in crevices, not physically accurate, helps to create contrast and see details

metalness
a greyscale image, white is metalic, black non-metalic, mostly for reflection.

Roughness
a greayscale image, in duo with the metalness, white is rough, black is smooth, mostly for light dissipation

these textures follow the Physically-based Rendering (PBR) principles,
Physically based rendering
many technics that tend to follow real-life directions to get realstic results
becoming the standerd for realstic renders
many software, engines and libraries are using it

to add image to the project we can add them in /src/ file will not be used

or we will add them to the static folder to access them directly 
*/

// This how we load images in Javascript 

// one way of loading images
// const image = new Image()
// image.onload = () => {
//     console.log('image loaded')
//     const texture = new THREE.Texture(image) // this is used to create a texture to load our image on
//     console.log(texture)
// }
// image.src = '/textures/door/color.jpg'

// const image = new Image()
// const texture = new THREE.Texture(image) // this is used to create a texture to load our image on
// image.onload = ()=> {
//     texture.needsUpdate = true
//     console.log('image loaded')
//     console.log(texture)
// }
// image.src = '/textures/door/color.jpg'

// loading textures using textureLoader

const loadingManager = new THREE.LoadingManager()

loadingManager.onStart = () => {
    console.log('Loading Started')
}
loadingManager.onLoad = () => {
    console.log('Loading Finished')
}
loadingManager.onProgress = () => {
    console.log('loading progressing')
}
loadingManager.onError = () => {
    console.log('Loading Error')
}

const textureLoader = new THREE.TextureLoader(loadingManager)

// const texture = textureLoader.load(
//     '/textures/door/color.jpg',
//     () => {
//         console.log('load')
//     },
//     () => {
//         console.log('progress')
//     },
//     () => {
//         console.log('error')
//     },
//     )

/**
 * Object
 */

/*
UV unwrapping
The texture is beign stretched or squeezed in different ways to cover the geometry
this caleed UN unwrapping and it's like unwrapping an origami or a candy wrap to make it flat
each vertex will have a 2D coordinate on a flat plane (usually a square)

Those UV Coordinates are genetrated by Three.js
if you create your own geometry you'll have to specify the UV coordinates
if you are making the geometry using a 3D software, you'll also have to do the UV unwrapping

Transform the texture
we can do repeat which is a vector2 property with x and y 
https://threejs.org/docs/index.html#api/en/math/Vector2

by default, the texture doesn't repeat and the last pixel get stretched we can change that with THREE.ReapeatWrapping on the wrapS and wrapT properties

we can offset the texture using theoffSet property which is a vector2

we can rotate the texture using the rotation property, it occurs in the bottom left corner that has the UV value of 0, 0 which is known as the pivot point
we can change the pivot point with the center property which is a Vector2

Filtering and Mipmapping
the face of the cube's texture is blurry due to filtering and mipmapping

Mipmapping is a technique that consists of creating half a smaller version of a texture again and again until we get a 1x1 texture
all those texture variations are sent to the GPU, and the GPU will choose the most appropriate version of the texture 
this is already handeled by Three.js and the GPU but we can choose different algorithms
Filter Algorithms:
 1. Minification Filter: Happens when the pixels of the texture are smaller than the pixels of the render, in other words the texture is too big for the surface, it covers
   we can change the minification filter of the texture using the minFilter property with those 6 values
   a. THREE.NearestFilter pixels are more sharp but also glitchy, we don't need the mipmaps we can deactivate the mipmaps generation with colorTexture.generateMipmaps = false
   b. THREE.LinearFilter
   c. THREE.NearestMipmapNearestFilter
   d. THREE.NearestMipmapLeanerFilter
   e. THREE.LinearMipmapNearestFilter
   f. THREE.LinearMipmapLinearFilter (default) 

 2. Magnification Filter: opposite to the Minification Filter
   we can change the magnification filter of the texture using the magFilter property with those 2 values:
    a. THREE.NearestFilter 
    b. THREE.LinearFilter (default)

THREE.NearestFilter is cheaper than the other ones and if the result is fine with you just use it

Texture Format and Optimsation
when creating textures, keep in mind 3 crucial elements
 1. The Weight
 2. The Size ( or the resolution )
 3. The Data

 the weight
The users will have to to download the texture
choose the right type of file
 1. .jpg - lossy compression but usually lighter
 2. .png - lossless compression but usually heaavier

you can use copression websites and softwares like TinyPNG

the size 
each  pixel of the texture will have to be stored on the GPU regardless of the images's weight 
GPU has Storage limitaions
it's even worse because mipmapping increases the number of pixels to store 
try to reduce the size of the images as much as possible 

The mipmapping will produce a half smaller version of the texture repeatedly until 1x1
Because of that, the texture width and height must be a power of 2 
 1. 512x512
 2. 1024x1024
 3. 512x2048 

 The Data
Textures support transparncey but we can't have transparency in .jpg if we want to have only one texture that combine color and alpha, we better use .png file
if we are using a normal texture we want to have the exact values which os why we shouldn't apply lossy compression and we better use .png for those

Sometimes we can combine different data into one texture by using the red, green, blue and alpha channels seperatly

the difficulty is to find the right combination of texture formats and resolutions
*/

// const colorTexture = textureLoader.load('/textures/door/color.jpg')
// const colorTexture = textureLoader.load('/textures/checkerboard-1024x1024.png')
// const colorTexture = textureLoader.load('/textures/checkerboard-8x8.png')
const colorTexture = textureLoader.load('/textures/minecraft.png')
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const heightTexture = textureLoader.load('/textures/door/height.jpg')
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

//Vector2 because it needs x and y values
// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3

// colorTexture.wrapS = THREE.RepeatWrapping
// colorTexture.wrapT = THREE.RepeatWrapping // or MirrorRepeatWrapping

// colorTexture.offset.x = 0.5
// colorTexture.offset.y = 0.5
// // not Vector2
// colorTexture.rotation = Math.PI * 0.25

// //Vector2
// colorTexture.center.x = 0.5
// colorTexture.center.y = 0.5
colorTexture.generateMipmaps = false
colorTexture.minFilter = THREE.NearestFilter
colorTexture.magFilter = THREE.NearestFilter 

/* we cannot use the image directly we need to transform it into a texture
https://threejs.org/docs/index.html#api/en/textures/Texture

we need to use that texture in the material, but the texture variable has been declared in a funtion and we can access it globally 
to solve that issue we can create the texture outside of the function and update it once the image is loaded with needUpdate = true


texture loader used to load texture better and faster
https://threejs.org/docs/index.html#api/en/loaders/TextureLoader


one TextureLoader can hold muliple textures

we can send 3 functions after the path 
 1. load when the image loaded succesfully
 2. progress when the loading is progressing
 3. error if something went wrong

loading Manager:
it is use to mutualize the events, it's useful if we want to know the global loading progress or be informed when everything is loaded 
https://threejs.org/docs/index.html#api/en/loaders/managers/LoadingManager

*/

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


const geometry = new THREE.BoxGeometry(1, 1, 1)
console.log(geometry.attributes.uv)
const material = new THREE.MeshBasicMaterial({ map: colorTexture }) // we added the texture to the material
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)


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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 1
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
renderer.outputColorSpace = THREE.LinearSRGBColorSpace // to make the color more accurate
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