# Environment and Staging with R3F 
Until now, we’ve been using a very simple environment with one directional light source and one ambient light source.

## Background Color
there are multiple way to do that but it depends on the project

https://threejs.org/docs/#api/en/math/Color

by default the backgroung is transparent 

 1. Dirctly in CSS
 2. setClearColor on the renderer: we need access to the renderer once it is created, we create a function in the index.js, the state we be sent as an argument of the function and the renderer will be available in the gl property
 3. Scene background: smae as before but we use the scene from the state
 4. R3F color: we create the color using JSX

 ## Lights
 all default Three.js lights are supported in R3F

 we use the lights helpers, using useHelper from drei 

 we need a reference for a directional light 

wehen using useHelper the first parameter is the refernce to the light source and the second parameter is the helper class we want to use from Three.js

THREE must be imported to access the DirectinalLightHelper class, the helper also work with cameraHelper as well

