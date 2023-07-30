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

## Lazy Loading
at the moment R3F is holding the rendering of the experience as long as everything isn't ready in our scene, this includes the loading of the model 

because of theat it will show white sceen until the scene is fully rendered.

in local servers, we don't see that, so we do network throttling we can activate the Network throttling to simulate a real-life experience with a model that takes time to load

 1. open the developer tools, go to network tab
 2. activate throttling

 the default values aren't always adapted and you might want to add a custom connection speed (100Mbit/s in download works well in our case) (developer tolls must be open in order for the throttling to keep working)

 this delay is bad because the user won't be able to see anything for a while instead we want the scene to be visible with the floor and once the model is loaded and ready it should appear

 to acheive lazy loading we use <Suspense> tag, it is a React component that will wait for the process to be done before rendering the component

 Fallback is an attribut and it is what the user will see if the compnent is not ready (in our case, while the model is loading)

 ## GLTF Loading with drei
R3F implements multiple loader helpers like useGLTF and useFBX

useGLTF takes care of everything so no need for the DRACO decoder

preloding we can use it with the useGLTF even though it is a function it can have intances, the same file must be used 

## Multiple instances
we use the clone helper

the amount of geometries and shaders stays the same, it creates multiple meshes, but based on the same geometries and materials

## GLTF to component
if we want to change something in the model we need to traverse the model and find the right child save it some where and change what we want 

other method is to use a 3D software 

better is to have the model as a component with the parts in the model as JSX, that's what GLTF -> React Three Drie does

https://github.com/pmndrs/gltfjsx
https://gltf.pmnd.rs/

the tool assumes that the model is available in the root directory 

now we have much more control over the model

the shadows looks weird with strips crossing the srface of the hamburger, this is called shadow acne and it's due to the model cating shadows on itself

we can fix that by tweaking the bias or shadowBias on the directional light shadow

## Animation
drei has a helper named useAnimations

since we have access to the animations of the model 

we use AnimationAction to convert the animation using the aniamtions.actions object

https://threejs.org/docs/?q=action#api/en/animation/AnimationAction

before starting any of those actions, it's better to do it once the component finished rendering for the first time using useEffect

R3f and useAnimation will take care of updating the animattion on each frame 

crossFadeFrom will fade out the previouse action and fade in the next action

animation control and cleanup phase: we want to give the user the ability to choose the animation, and fade the incoming animation so we don't get brutal change