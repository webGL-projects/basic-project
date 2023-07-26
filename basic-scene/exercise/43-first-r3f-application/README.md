# React Three fiber 
R3F is a react renderer, we write JSX and it gets rerdered into Three.js

R3F will set default parameters to simplify our life 

the @ of the npm dependencies at the beginning means it's part of a bigger system (Scoop) 

## Syntax 

https://docs.pmnd.rs/react-three-fiber/getting-started/introduction
https://twitter.com/0xca0a/status/1445409346305892353
https://journey.pmnd.rs/  // Very Important 
https://docs.pmnd.rs/react-three-fiber/advanced/scaling-performance#instancing

* the geometry and thematerial are automatically associated with the mesh
* The syntax is shorter and easier to understand 
* Default parameters are automatically set for us

## how Does R3F know how to combine components?
we have two <mesh> inside the <group> R3F will create the group , then call add() on it and pass it the two meshes

attach atrribute allows the developer to assign the component to a specific property of the parent instead of trying to add() it

we don't have to do that R3F will first check the name of the component 
* if it ends with 'Material' it 'll assign it to the material attribute
* if it ends with 'Geometry' it 'll assign it to the geometry attribute

R3F will implement all classes automatically

why camelCase, this is react convention Native host elements (the ones available in the rederer) are in calmelCase while custom components are in PascalCase
* Automatically generated primitive components are in CamelCase 
* More specific components are in PAscalCase

## Resize
<Canvsa> will take the size of the parent (#root)
So we can make the parent fill the veiwport the same goes for the n=bode and html 

## What Happened 
1. we didn't create a scene
2. we didn't have to create the WebGLRenderer 
3. The scene is beign rendered on each frame 
4. The default settings are making it look appealing (antialias, encoding, etc.)
5. we didn't have to place a PerspectiveCamera
6. we didn't have to pull it back from the center

* when you resize the viewport, everything that needs resizing is handeled automatically 
* we didn't have ato provide any specific value fot the <torusKnotGeometry>
* we didn't have to import the mesh nor the sphereGeometry not he meshNormalMaterial
* we don't have to reload the page 

hook will only work in components created inside the canvas

to change the values of a Geometry we need to pass the values as args attribute as annray in the geometry tag 

https://threejs.org/docs/#api/en/geometries/SphereGeometry

in the case of the geometry, be careful not to updte those values too much or animate them , each change will result in the whole geometry beign rebuilt

https://threejs.org/docs/?q=meshbasi#api/en/materials/MeshBasicMaterial

it's better to add the attribute directly 

a better way of changing the values is to set the relative properties with the corresponding attributes 

## Animation
We use the useFrame (From R3F) hook to do animations

useFrame can only be called from a component that is inside the <Canvas> 

useFrame is called on every Frame. 

to use useFrame we need a reference 

we need to take care of the frame Rate this is done by using state and delta in the useFrame

* State contains information about our Three.js evironment like the camera, the renderer, the scene etc. 
* delta contains the time spent since the last frame in seconds 

## Group
Like threejs we can group objects using the group class

## Orbit Controls
https://threejs.org/docs/#examples/en/controls/OrbitControls

orbit controls are not part of the default Three.js classes (in the THREE variable) we can't declare it like we declare a <mesh> 

we are going to import it and convert it to a declartive version

to convert it we use extend, it will automatically convert a three.js into a declaritive version and make it available in JSX, it must be provide with an object so Threejs knows what to call it 

we need to send the camera and the DOM Elelment to it we can find them in the state variable but we want them once when everything is ready only

we use useThree hook to retrieve the camera and the DOM Element (provides the data once unlike useFrame)

## Lights
By default the lights comes from above

## Custom geometry 
we are going to create a mesh with it's geometry composed of random triangles

we need to create muliple attributets for the geometry 
1. posiotion
2. count no. of verticies
3. itemSize no. of items in the array that compose one vertex
4. array the actual array

by deafult we only see the frontside of the geometry, we need to set the side property to DoubleSide

the code in the custome object  will be renderd everytime the component needs to be drawn 

to solve that we use useMemo as it remebers the value (like a chache)

we can specify variables that, if changed, would force useMemo to forget about the saved value and call the function again

## Compute neromal vertcies
we didn't provide any normal to the geometry and the triangles don't know where they are orinted, to solve that we use the computeVetexNormals on the bufferGeometry 

we are going to use ref!

the geometry will render the first time once refreshed the geometry will disappear

so useEffect will be here to the rescue, empty array will be send as an attribute to render after the first draw

## Canvas Setting
the <canvas> copmonent is setting uo a bunch of things for us (scene, camera, renderer, antialias, encoding, .etc) so that it looks good with minimal effort 

but sometime we need to change those settings

we send the parameters by following the default structure

let's say we use a orthographic camera, this makes the fov useless and the view seems very far from the scene playing with the top, right, bottom, left porperties is a bad idea because R3F is already uoadteing those to keep a ratio adapted to the viewport

## Animate The Camera
we have access to the camera and clock and everthing needed in state provided to the useFrame function 

https://threejs.org/docs/?q=clock#api/en/core/Clock

## Antialias
it used to element the stairs effect on the geometry 

it is on bt default, we can remove it by adding a gl attribute to the <canvas> and send it an object, as we did with the camera

the gl refers to hte WebGLRender and we can deactivate the antialias by setting the proprty to false

## Ton Mapping
R3F sets the toneMapping to ACESFilmicToneMapping

it's nat a true HDR to LDR since the default render is aleady in LDR, but it tweaks the color to make it look like HDR, to remove it, we can add the flat attribute to the <Canvas> this will result in noToneMapping beign assigned to toneMapping (same as LinearToneMapping), we can send a specific tone mapping using the gl atribute 

## Output Encoding
the outputEncoding is already set to sRGBEncoding

Color encoding is a way of encoding and decoding colors so that we store color information in a more optimised way since we are limited by the amount of possible values per channel

## Alpha
The background of the render is transparent

## Pixel Ratio
R3F handles the pixel ratio automatically, it;s good to clamp it in order to avoid performance issues on devices with a very high pixel ratio 

we can force it by sending a specific value to the dpr attribute on the <Canvas>




