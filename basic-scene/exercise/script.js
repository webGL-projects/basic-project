console.log("Hello Three JS!");

// Call the Three Js library
console.log(THREE); // this an old way to call the three js library also this method has two limitaions: 1. we only have access to core classes we can't use orbitControls for example 2. when opening an HTML file the browser won't let you execute JS instruction due to security reasons you won't be able to load texures or models to run JS we need to use build tools like vite webpack .etc

// Scene
const scene = new THREE.Scene(); // this is how we create a scene

// Mesh
const geometry = new THREE.BoxGeometry(1, 1, 1); // The Geometry needed for the Mesh BoxGeometry(width, height, depth) can be adjusted in the documentation for visual representation of the final shape DOCS ARE A MUST!!
const material = new THREE.MeshBasicMaterial({ color: 'red' }); // we use curly braces because sometimes we need more details to pass through
const mesh = new THREE.Mesh(geometry, material); // This is the mesh it needs geometry amd material to pass through as variables
scene.add(mesh); // This is how you add the mesh the the scene!!

// the heirchy is scene then mesh then matrial and geometry

// Camera

const sizes ={
    width: 800,
    height: 600
}
const  camera = new THREE.PrespectiveCamera(75, sizes.width / sizes.height); // This is one type of cameras 
camera.position.x=2; // to the left
camera.position.y=-1; // up 
camera.position.z=3; // toward us
Scene.add(camera); // you need to add the camera to scene

// Renderer
const canvas = document.querySelector('.webgl'); // this is ued to fetch the canvas html element to use it in the renderer 
const renderer = new THREE.WebGLRenderer({
canvas: canvas // or use canvas alone 
});  // This is one of the renderers 
renderer.setSize(sizes.width, sizes.height); // used to resize the canvas 

renderer.render(scene, camera); // render the scene