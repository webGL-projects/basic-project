# Particles 
Particles can be used tio create stars, smoke, rain, dust, fire, etc. 

 you can have thousands of them with a reasonable frame reate each particle is composed of a plane(two triangles) always facing the camera.

 creating particles is like creating a mesh 
  a. a geometry https://threejs.org/docs/#api/en/core/BufferGeometry
  b. a material https://threejs.org/docs/#api/en/materials/PointsMaterial
  c. a points instance (instead of a mesh) https://threejs.org/docs/#api/en/objects/Points

each vertex of the geometry will become a particle 

when instatiating a PointsMaterial we change the size property to control all particles size and the sizeAttenuation to specify if the distant particles should be smaller than close particles

we can customize our geometry using BufferGeometry 

we can change ther color of the particles with the color property on the PointsMaterial 

we can use the map property to put textures on those particles

The texture Provided are a resized version of the pack provided by kenny 

https://twitter.com/KenneyNL
https://www.kenney.nl/assets/particle-pack

you can create your own 

By default the front particles hide the back ones to solve that we activate the transparncey and use the texture on the alphaMap property intead of the map this allow us to see the edges of the particles 
That is because the perticles are drawn in the same order as they are created, and webGL doesn't really know which one is in front of the other, there are multiple ways of fixing this

1. Alpha Test: it is a value between 0 and 1 the enables the webgl to know when to render the pixel according to that pixel's transparerancy, by default, the value is 0 meaning that the pixel will be rendered anyway use 0.001

2. Depth Test: when drawing, the WebGL tests if what's drawn is closer than what's already drawn, that is called depth testing and can be deactivated with alphaTest

deactivating the depth testing might create bugs if you have other objects in your scene or particles with different colors

3. Depth Write: the depth of what's beign drawn is stored in what we call a depth buffer instead of not testing if the particale is closed than what's in this depth buffer, we can tell the webGL not to write particles in that depth buffer with depthtest 

the solution depends on the project 

## Blending 
the webGL currently draws pixels one on top of the other with the blending property we can tell the webGL to add the color of the pixel to the color of the pixel already drawn changing the blending property to THRR.AdditiveBlending, this will impact the performance 

we can have a diiferent color for each particale add aa color attribute with 3 values (red, green, blue), but we need to change the vertexColors property to true, but the base vertex color affects the other colors

## Animate
there are multiple ways to animate the particles

1. Using the Points as an object: Points class inherits from the object3D so we can move , rotate and scale the points

2. changing the attributes: we can update each vertex seperatly in particlesGeometry.attributes.position.array because this array contains the particales positionswe have to go 3 by 3 , but threejs needs to be notified when a geometry attribute changes, we need to set the needsUpdate to true on the poisition attribute

you should avoid this technique because updating the whole attribute on each frame os bad for performances

3. using custom shaders: this is the best way to create our own shaders and we will do that in a later lesson