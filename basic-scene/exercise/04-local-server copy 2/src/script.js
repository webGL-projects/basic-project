import * as THREE from 'three'; // will import all the core classes available to us from the node module

console.log("Hello Three JS!!");
console.log(THREE); // it returns an object with all classes


// Scene
const scene = new THREE.Scene(); // this is how we create a scene

// // Mesh
// const geometry = new THREE.BoxGeometry(1, 1, 1); // The Geometry needed for the Mesh BoxGeometry(width, height, depth) can be adjusted in the documentation for visual representation of the final shape DOCS ARE A MUST!!
// const material = new THREE.MeshBasicMaterial({ color: 'red' }); // we use curly braces because sometimes we need more details to pass through
// const mesh = new THREE.Mesh(geometry, material); // This is the mesh it needs geometry amd material to pass through as variables
// scene.add(mesh); // This is how you add the mesh the the scene!!

// // mesh.position.x = 0.7;
// // mesh.position.y= - 0.6;
// // mesh.position.z = 1;

// // The above methods can be replaced with the set method!!
// mesh.position.set(0.7, -0.6, 1);

// // mesh.position.normalize() // it transforms the positin until it is length is equal to 1
// console.log("Length: ", mesh.position.length());
// // console.log("normalize :", mesh.position.normalize());

// // Scale 
// // mesh.scale.multiplyScalar(0.5) // multiply the size
// // mesh.scale.x = 2; // you can scale by axis!!
// mesh.scale.set(2, 0.5, 0.5);

// // Rotation
// // mesh.rotation.y= Math.PI / 2; // 3.14159....

// mesh.rotation.reorder('YXZ'); 
// mesh.rotation.set(Math.PI * 0.25, Math.PI * 0.25, 0);

// Groups

const group = new THREE.Group();
group.position.y = 1;
group.scale.y = 2;
group.rotation.y = 1;
scene.add(group);

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
)

group.add(cube1);
group.add(cube2);
group.add(cube3);
cube2.position.x = -2;
cube3.position.x = 2;

// Axes Helper a class used to help visualize the 3 axis easily
const axesHelper = new THREE.AxesHelper() ; // It takes two as argument
scene.add(axesHelper);

// the heirchy is scene then mesh then matrial and geometry

// Camera

const sizes ={
    width: 800,
    height: 600
};

const  camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height); // This is one type of cameras 
// camera.position.x=1; // +ve left and -ve right
// camera.position.y=-1; // -ve up and +ve down 
// camera.position.z=3; // +ve toward us and -ve away from us
camera.position.set(0, 0, 3);
scene.add(camera); // you need to add the camera to scene
// console.log("Distance to: ", mesh.position.distanceTo(camera.position));

// Look At
// camera.lookAt(new THREE.Vector3(0, -1, 0));

// Renderer
const canvas = document.querySelector('canvas.webgl'); // this is ued to fetch the canvas html element to use it in the renderer 
// you need to use class in HTML don't use className
const renderer = new THREE.WebGLRenderer({
canvas: canvas // or use canvas alone 
});  // This is one of the renderers 


renderer.setSize(sizes.width, sizes.height); // used to resize the canvas 

renderer.render(scene, camera); // render the scene

