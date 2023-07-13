# Shadows
Core Shadows: are The dark shadows in the back of the objects

but we need drop shadows first

Shadow have always been a challenge for real-time 3D rendering and developers must find tricks to display relistic shadows ar a reasonable frame rate 

Three.js has a built-in solution, it's not perfect but it's convenient.

* when we do one render, Threejs will do a render for each light supporting shadows 
* Those renders will simulate what the light sees as if it was a camera
* During these lights renders, a MeshDepthMaterial replaces all meshes materials
* The lights renders are stored as textures and we call those shadow maps
* They are then used on every material supposed to recieve shadows and project on the geometry 

MeshDepthMaterial: A material for drawing geometry by depth. Depth is based off of the camera near and far plane. White is nearest, black is farthest.

https://threejs.org/docs/index.html#api/en/materials/MeshDepthMaterial

we need to activate the shadow maps on the renderer
then we need to go through each object and decide if it can cast a shadow with castShadow and if it can recieve shadow with receivedShadow

as a reminder the lights that cast a shadow are 
 1. pointLight
 2. DirectionalLight
 3. SpotLight

we need to activate the shadows on the light with castShadow

## Shadow Map optimization
it can be done by controlling:

 1. Render Size: we can access the shadow map in the shadow property of each light
 By default the size is 512x512, wwe can improve it but we need to keep 0f power of 2 for the mipmapping

 2. Near and Far: it is more about precision 
 Threejs is using cameras to do the shadow maps renders those cameras have the same properties like near and far

 to help us debug, we can use a CameraHelper with the camera used for the shadow map in the directionalLight.shadow.camera

 3. Amplitude: we can see the amplitude is too large, because we are using a DirectionalLight, Threejs using and OrthographicCamera 

 the smaller the values, the more precise the shadow will be  if it's too small the shadows will be cropped

 4. Blur: it can be controlled using the raduis property, this technique use the proximity of the camera with the object, it's a general and cheap blur

 5. Shadow Map Algorithm: there are different types of shadow maps
  a. THREE.BasicShadowMap - Very performant but lousy quality
  b. THREE.PCFShadowMap - Less performant but smoother edges (default)
  c. THREE.PCFSoftShadowMap - Less Performant but even softer edges The radius doesn't work
  d. THREE.VSMShadowMap - Less performant, more contraints, can have unexpected results 

## SpotLight Shadow Map 
Mixing Shadow doesn't look good and there is not much to do about it

same techniques used in the directional light 

Spot Light uses Perspective camera we must change the fov propertu to adopt the amplitude

## PointLight Shadow Map
the camera helper used is a perspectiveCamerafacing downward Three.js uses a perspectiveCamera but in all 6 directions and finishes downward

same controls as before

# Baking Shadows
a good alternative to Three.js shadows are baked , we integrate shadows in textures that we apply on materials

we need to deactivate the shadows (it may cause an error when using castShadow)

the issue with it is that it is not dynamic 

## Baking Shadows Alternative
we can also use a more simpler baked shadow and move it so is stays under the sphere 

create a plane slightly above the floor with an alphaMap using the simpleShadow