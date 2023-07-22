import * as THREE from "three";
import * as dat from "lil-gui";
import gsap from 'gsap'

THREE.ColorManagement.enabled = false;

/**
 * Debug
 */
const gui = new dat.GUI();

/**
 * Twxture Loader
 */

const textureLoader = new THREE.TextureLoader();

const gradientTexture = textureLoader.load("/textures/gradients/5.jpg");
gradientTexture.magFilter = THREE.NearestFilter;

const parameters = {
  materialColor: "#ffeded",
};

gui.addColor(parameters, "materialColor").onChange(() => {
  material.color.set(parameters.materialColor),
  particleMaterial.color.set(parameters.materialColor)
});

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Test cube
 */
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial({ color: '#ff0000' })
// )
// scene.add(cube)

/**
 * Objects
 */

// Material
const material = new THREE.MeshToonMaterial({
  color: parameters.materialColor,
  gradientMap: gradientTexture,
});

// Meshes
const ObjectDistance = 4; // it will get handy!

const torusMesh = new THREE.Mesh(
  new THREE.TorusGeometry(1, 0.4, 16, 60),
  material
);

const coneMesh = new THREE.Mesh(new THREE.ConeGeometry(1, 2, 32), material);

const torusKnotMesh = new THREE.Mesh(
  new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
  material
);

// torusMesh.position.y = - ObjectDistance * 0
coneMesh.position.y = -ObjectDistance * 1;
torusKnotMesh.position.y = -ObjectDistance * 2;

// object Positions
torusMesh.position.x = 2
coneMesh.position.x = -2
torusKnotMesh.position.x = 2

scene.add(torusMesh, coneMesh, torusKnotMesh);

const sectionMeshes = [torusMesh, coneMesh, torusKnotMesh];

// Particles
// Geometry 
const particlesConut = 200 
const positions = new Float32Array(particlesConut * 3)
 
for (let i = 0; i< particlesConut; i++){
    positions[i*3] = (Math.random() - 0.5) * 10
    positions[i*3 + 1] = ObjectDistance * 0.5 -  Math.random() * ObjectDistance * sectionMeshes.length
    positions[i*3 + 2] = (Math.random() - 0.5) * 10
}

const particlesGeometry = new THREE.BufferGeometry()
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

// Material
const particleMaterial = new THREE.PointsMaterial({
   color: parameters.materialColor,
   sizeAttenuation: true,
   size: 0.03 
})
 
// Points
const particles = new THREE.Points(particlesGeometry, particleMaterial)
scene.add(particles)

// lights
const directionalLight = new THREE.DirectionalLight("#ffffff", 1);
directionalLight.position.set(1, 1, 0);
scene.add(directionalLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

/**
 * Cursor
 */
const cursor = {
    x: 0,
    y: 0
}

window.addEventListener("mousemove", (event) => {
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = event.clientY / sizes.height - 0.5
})

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */

// Camera Group
const cameraGroup = new THREE.Group()
scene.add(cameraGroup)

// Base camera
const camera = new THREE.PerspectiveCamera(
  35,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 6;
cameraGroup.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true, // to help solve the elastic scroll
});
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Scroll
 */
let scrollY = window.scrollY;
let currentSection = 0; 
window.addEventListener("scroll", () => {

  scrollY = window.scrollY;
//   console.log(scrollY);
const newSection = Math.round(scrollY / sizes.height) // this works because each section is exactly 1 height of the viewport

    if(newSection != currentSection){
        currentSection = newSection
        // console.log('Changed', currentSection)

        gsap.to(
            sectionMeshes[currentSection].rotation, 
            {
                duration: 1.5,
                ease: 'power2.inOut',
                x: '+=6',
                y: '+=3',
                z: '+=1.5'
            }
        )
    } // This doesn't work we need to change some code in the tick function 
// console.log(newSection)
});

/**
 * Animate
 */
const clock = new THREE.Clock();
let previouseTime = 0 // for Easing

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previouseTime
  previouseTime = elapsedTime


  // Animate Camera
    camera.position.y = - scrollY / sizes.height * ObjectDistance

    const parallaX = cursor.x * 0.5
    const parallaY = - cursor.y * 0.5

    // Easing Formula
    cameraGroup.position.x  += (parallaX - cameraGroup.position.x) * deltaTime * 5
    cameraGroup.position.y += (parallaY - cameraGroup.position.y) * deltaTime * 5 // this replaces the first one to fix it we will put the camera in a group

  // Animate Meshes
  for (const mesh of sectionMeshes) {
    // mesh.rotation.x = elapsedTime * 0.1;
    // mesh.rotation.y = elapsedTime * 0.12;

    mesh.rotation.x += deltaTime * 0.1;
    mesh.rotation.y += deltaTime * 0.12;
  }

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
