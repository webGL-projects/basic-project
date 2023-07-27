# Drei 
scenes are going to get even simplier

Because react has the ability to make things reusable, R3F took advantage of that and developers created many components called helpers

 some examples are:
 1. Camera Controls
 2. Complex Geometries
 3. Post-Processing
 4. HTML Implementation
 5. Loaders
 6. Environment Settings
 7. Complex Calculations

some of them will be implemented as components <theHelper> and some as hooks (useHelper) most of them are regrouped in drei (Three in German)

https://github.com/pmndrs/drei
https://drei.pmnd.rs/?path=/docs/abstractions-screenspace--docs

drei are helpers used to mkae life easier 

drei is part of the @react-three scope

OrbitControls is set with enabledDamping which make the animation smoother and we don't have to ask it to update itself on each frame

TransformControls add a gimzo that allows the user to transform (position, rotation or sacle) the object, we need to wrap the mesh with it (The gimzo is in the center by default) (object inside an object) 

to fix the issue we can:
1. move the position attribute to the TransformControls
2. seperate them using a reference and an attribute: thos solution makes the mesh independent from <TransformControls> (we deactivate <TransformControls> without side effects)

OrbitControls conflict: to solve it we can add makeDefault to the <orbitControls>

Modes: it is set as translate by default, but we can change it to rotate or scale with the mode attribute 

Pivot Controls: is an alternative solution to dealing with gizmo with diferent features and it's for the developers

it does not work as a group like the transformControls, if we want it to be in the center we will use the anchor attribute to change it's position (which is relative to the object)

the PivotControls visibility works like any object in the scene and will be hidden if it os behind other objects, we use depthTest attribute with false value to render on top of the scene, we can control the look of it like the thickness of the lines with lineWidth and the colors of the axes with axisColor or the size with scale

by default it has perspective, meaning it'll get smaller the futher away from the camera 

## HTML
Html will add a DOM element that will stick to your object

we can add it to a <mesh> a <group> or anything that inherits from Object3D 

we use wrapperClass to target the Html in css

we can hide thew html, when an object is infront of it with the occlude attribute, to acheive that we need to have a refernce to the various objects that can occlude the html

