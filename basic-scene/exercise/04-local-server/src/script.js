import * as THREE from 'three'; // will import all the core classes available to us from the node module

console.log("Hello Three JS!!");
console.log(THREE); // it returns an object with all classes


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
};

const  camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height); // This is one type of cameras 
camera.position.x=1; // +ve left and -ve right
camera.position.y=-1; // -ve up and +ve down 
camera.position.z=3; // +ve toward us and -ve away from us
scene.add(camera); // you need to add the camera to scene

// Renderer
const canvas = document.querySelector('canvas.webgl'); // this is ued to fetch the canvas html element to use it in the renderer 
// you need to use class in HTML don't use className
const renderer = new THREE.WebGLRenderer({
canvas: canvas // or use canvas alone 
});  // This is one of the renderers 

renderer.setSize(sizes.width, sizes.height); // used to resize the canvas 

renderer.render(scene, camera); // render the scene

