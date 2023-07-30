# Load Models
Draco is an open-source library for compressing and decompressing 3D geometric meshes and point clouds. It is intended to improve the storage and transmission of 3D graphics.

GLTF loading is the standard and the most frequantly used format

R3F provides a hook named useLoader the abstarct loading

we need to send it the Three.js loader class we want to use and the path to the file, because it is a GLFT, we need to import GLTFLoader from three

https://threejs.org/docs/#examples/en/loaders/GLTFLoader

the path started with ./ which should work in most cases './hamberger.glb' will look for the file in the same folder and the files located in the /public/ folder are made available like if they are at the root of the website 

we need to add the model.scene somewhere in the JSX, to do that we need to use <primitive />

<primitive /> is a holder for whatever we want to put in it, it's not a real object, but it's a container supported bt R3F what will handle and display whatever we put in its object attribute

## Draco
if we use the GLTF Loader we get an error, so we need DRACOLoader instance with setDRACOLoader()

https://threejs.org/docs/#examples/en/loaders/DRACOLoader

to do that we can pass a third argument to the useLoader() and send it a function that will give us access to the loader instance, we can associate a DRACOLoader instance 
