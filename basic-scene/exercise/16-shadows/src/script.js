import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

THREE.ColorManagement.enabled = false

/**
 * Textures
 */

const textureLoader = new THREE.TextureLoader()
const bakedTexture = textureLoader.load('/textures/bakedShadow.jpg')
const simpleShadow= textureLoader.load('/textures/simpleShadow.jpg')
/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3)
directionalLight.position.set(2, 2, - 1)
gui.add(directionalLight, 'intensity').min(0).max(1).step(0.001)
gui.add(directionalLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(directionalLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(directionalLight.position, 'z').min(- 5).max(5).step(0.001)

// Activate the shadows
directionalLight.castShadow = true
console.log(directionalLight.shadow)

// in case of an error
directionalLight.castShadow = false

// Render Size Optimization 
directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024

// Near and Far

directionalLight.shadow.camera.top = 2
directionalLight.shadow.camera.right = 2
directionalLight.shadow.camera.bottom = - 2
directionalLight.shadow.camera.left = - 2

directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 6

// Directional Camera Helper used to help us find the near and far
const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
scene.add(directionalLightCameraHelper)
// to hide the helper
directionalLightCameraHelper.visible = false

// Blur
directionalLight.shadow.radius = 10

scene.add(directionalLight)

// Spot Light
const spotLight = new THREE.SpotLight(0xffffff, 0.4, 10, Math.PI *0.3)

spotLight.castShadow = true
spotLight.position.set(0, 2, 2)

// in case of an error
spotLight.castShadow = false

scene.add(spotLight, spotLight.target)

// Map Size
spotLight.shadow.mapSize.width = 2048
spotLight.shadow.mapSize.height = 2048

// Feild of Veiw = amplitude
spotLight.shadow.camera.fov = 30


// Near and Far
spotLight.shadow.camera.near = 1
spotLight.shadow.camera.far = 6

// Spot Light Helper
const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera)
scene.add(spotLightCameraHelper)

spotLightCameraHelper.visible = false

// Point Light
const pointLight = new THREE.PointLight(0xffffff, 0.3)

pointLight.castShadow = true
pointLight.position.set(-1, 1, 0)

// in case of an error
pointLight.castShadow = true

scene.add(pointLight)

// Map Size
pointLight.shadow.mapSize.width = 1024
pointLight.shadow.mapSize.height = 1024

// Near and Far
pointLight.shadow.camera.near = 0.1
pointLight.shadow.camera.far = 5


// Point Light Helper
const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera)
scene.add(pointLightCameraHelper)

pointLightCameraHelper.visible = false

/**
 * Materials
 */
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.7
gui.add(material, 'metalness').min(0).max(1).step(0.001)
gui.add(material, 'roughness').min(0).max(1).step(0.001)

/**
 * Objects
 */
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)


// the sphere cast a shadow 
sphere.castShadow = true


// const plane = new THREE.Mesh(
//     new THREE.PlaneGeometry(5, 5),
//     new THREE.MeshBasicMaterial({
//         map: bakedTexture
//     })
//     )

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
        material
    )
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.5

// The plane receives a shadow
plane.receiveShadow = true

const sphereShadow = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 1.5),
    new THREE.MeshBasicMaterial({
        color: 0x00000,
        transparent: true,
        alphaMap: simpleShadow
    })
)
sphereShadow.rotation.x = - Math.PI * 0.5
sphereShadow.position.y = plane.position.y + 0.01

scene.add(sphere, sphereShadow, plane)

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

// we need to activate shadow maps in the renderer
renderer.shadowMap.enabled = true

// Shadow Map Algorithm - update the shadow map
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// Deactivate the shadows to bake them in
renderer.shadowMap.enabled = false



/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update the sphere
    sphere.position.x = Math.cos(elapsedTime) * 1.5
    sphere.position.z = Math.sin(elapsedTime) * 1.5
    sphere.position.y = Math.abs(Math.sin(elapsedTime * 3 ))

        // Update the sphere Shadow
        sphereShadow.position.x = Math.cos(elapsedTime) * 1.5
        sphereShadow.position.z = Math.sin(elapsedTime) * 1.5
        sphereShadow.material.opacity = (1 - Math.abs(sphere.position.y)) * 0.3
    

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()