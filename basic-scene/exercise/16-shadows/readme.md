# Shadows
Core Shadows: are The dark shadows in the back of the objects

but we need drop shadows first

Shadow have always been a challenge for real-time 3D rendering and developers must find tricks to display relistic shadows ar a reasonable frame rate 

Three.js has a built-in solution, it's not perfect but it's convenient.

* when we do one render, Threejs will do a render for each light supporting shadows 
* Those renders will simulate what the light sees as if it was a camera
* During these lights renders, a MeshDepthMaterial replaces all meshes materials

MeshDepthMaterial: A material for drawing geometry by depth. Depth is based off of the camera near and far plane. White is nearest, black is farthest.

https://threejs.org/docs/index.html#api/en/materials/MeshDepthMaterial