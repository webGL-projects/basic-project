import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'


THREE.ColorManagement.enabled = false

/*
Debug UI
*/
const gui = new dat.GUI()


/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

const matcapTexture = textureLoader.load('/textures/matcaps/1.png')
// const matcapTexture = textureLoader.load('/textures/matcaps/2.png')
// const matcapTexture = textureLoader.load('/textures/matcaps/3.png')
// const matcapTexture = textureLoader.load('/textures/matcaps/4.png')
// const matcapTexture = textureLoader.load('/textures/matcaps/5.png')
// const matcapTexture = textureLoader.load('/textures/matcaps/6.png')
// const matcapTexture = textureLoader.load('/textures/matcaps/7.png')
// const matcapTexture = textureLoader.load('/textures/matcaps/8.png')

const gradientTexture = textureLoader.load('/textures/gradients/5.jpg')

const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/1/px.jpg',
    '/textures/environmentMaps/1/nx.jpg',
    '/textures/environmentMaps/1/py.jpg',
    '/textures/environmentMaps/1/ny.jpg',
    '/textures/environmentMaps/1/pz.jpg',
    '/textures/environmentMaps/1/nz.jpg'
]) // six images to repesent the 6 sides of the cube 


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
// const material = new THREE.MeshBasicMaterial()

// // map a texture on the material
// material.map = doorColorTexture

// // Add color
// material.color = new THREE.Color('#ff0000')
// material.color = new THREE.Color('#f00')
// material.color = new THREE.Color('red')
// material.color = new THREE.Color('rgb(255, 0, 0)')
// material.color = new THREE.Color(0xff0000)

// // Show Wireframe
// // material.wireframe = true

// // opacity
// material.transparent = true // also used for alphaMap
// material.opacity = 0.5


// // alphaMap controls the transparency with a texture 
// material.alphaMap = doorAlphaTexture

// // Side lets you decide which side of a face is visible THREE.FrontSide (default) THREE.BackSide THREE.DoubleSide
// material.side = THREE.DoubleSide


// Mesh Normal Material
// const material = new THREE.MeshNormalMaterial()

// // Flat Shading
// material.flatShading = true

// Mesh Mar Cap Material
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture

// Mesh Depth Material 
// const material = new THREE.MeshDepthMaterial()

// Mesh Lambert Material
// const material = new THREE.MeshLambertMaterial()

// MEsh Phong Material 
// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color(0xff0000)

// Mesh Toon Material
// const material = new THREE.MeshToonMaterial()
// material.gradientMap = gradientTexture
// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter
// gradientTexture.generateMipmaps = false

// Mesh Standard Material 
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.2
material.metalness = 0.7

material.envMap = environmentMapTexture;


// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1

// material.displacementMap = doorHeightTexture // it looks bad because we don't have enough vertecies and the displacement os too strong
// material.displacementScale = 0.05

// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture

// material.normalMap = doorNormalTexture // details
// material.normalScale.set(0.5, 0.5)

// material.transparent = true // for the alpha map to show
// material.alphaMap = doorAlphaTexture 

// debug UI
gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)
gui.add(material, 'aoMapIntensity').min(0).max(10).step(0.0001)
gui.add(material, 'displacementScale').min(0).max(1).step(0.0001)




// Istantiating materials
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material
)
sphere.position.x = - 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 64, 128),
    material
)
torus.position.x = 1.5



scene.add(sphere, plane, torus)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.5)
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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
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
renderer.outputColorSpace = THREE.LinearSRGBColorSpace
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
// const clock = new THREE.Clock()

// const tick = () =>
// {
//     const elapsedTime = clock.getElapsedTime()

//     // Update controls
//     controls.update()

//     // Render
//     renderer.render(scene, camera)

//     // Call tick again on the next frame
//     window.requestAnimationFrame(tick)
// }

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    plane.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    plane.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
