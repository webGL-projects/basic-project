# Haunted House
Only primitives will be used as geometies

## Tips
instead of using random measures we are going to cinsider 1 unit as 1 meter

there is no pyrimed in threejs, we use ConeGeometry 

we can add multiple thing not manually but procedurally 

ThreeJS Supports Fog, with the fog class
    * Color
    * near - how far from the camera does the fog start
    * Far - how far from the camera will the fog be fully opaque

to activate the fog, add the fog property to the scene 

to fix the background, we must change the clear color of the renderer and use the same color as the fog, we can use it using the setClearColor() on the renderer