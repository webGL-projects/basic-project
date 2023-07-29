# Environment and Staging with R3F 
Until now, we’ve been using a very simple environment with one directional light source and one ambient light source.

## Background Color
there are multiple way to do that but it depends on the project

by default the backgroung is transparent 

 1. Dirctly in CSS
 2. setClearColor on the renderer: we need access to the renderer once it is created, we create a function in the index.js, the state we be sent as an argument of the function and the renderer will be available in the gl property
 3. Scene background: smae as before but we use the scene from the state
 4. R3F color: we create the color using JSX
