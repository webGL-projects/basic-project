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

## Text
Generating a3D text geometry has its limits
1. we can notice the polygons
2. takes a lot of CPU resource
3. Some fonts won't look very good
4. doesn't support line breaks

to solve all that we use SDF Fonts

SDF: Signed Distance Feild and is usually used it fragment shaders to draw shapes

we send a 2D or 3D point to an SDF shape function that returns how for the point if from the shape, any shape is possible if it can be represented mathmatically 

 Imagine that you want to draw a simple disc on a flat plane
 * we get the distance of the UV coordinate (the fragment we are drawing) ot the center of the disc
 * we decide on a radius 
 * if th edistance we got earlier is less that the reduis, we are in the disc and we can draw the pixel
 * if the distance exceeds the redius, we have moved beyond the disc and we draw nothing

https://twitter.com/iquilezles
https://iquilezles.org/articles/distfunctions2d/
https://iquilezles.org/articles/distfunctions/

for font it is more complex, be cause we can't express that mathmatically 

developers have created scripts that generate textures containing the distance information for each character if a font

we can then use that texture to indicate the distance between the fragment we are drawing and the supposed character
if the distance is closer to a specific value, we draw the text otherwise we draw nothing 

the value saved in the texture is the distnce between the point we are drawing and the character this enables features such as:
1. changing the thickness 
2. adding an outline
3. adding a blur
4. Drawing huge text using the natural interpolation between pixels
5. Having a lot of wards while using the smae collection of characters

the text helper uses Troika library 

https://github.com/protectwise/troika
https://github.com/protectwise/troika/tree/main/packages/troika-three-text

the default font is Roboto and comes from the Google Font CDN we can provide different fonts

https://transfonter.org/
https://www.fontsquirrel.com/tools/webfont-generator // use to transforme it to woff 
https://fonts.google.com/
https://gwfh.mranftl.com/fonts

it works like most objects in the scene and we can play with its position, rotation and scale

we can limit the width to see the line breaks with the maxWidth attribute

## Float 
makes the object float like a baloon in the air