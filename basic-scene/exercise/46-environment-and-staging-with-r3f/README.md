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

## Shadows 
Default Shadows: the shadow must be activated, and the meshes to cast shadows and the floor to recieve shadows

this causes the time to render to be significantly higher (lower FPS)

Baking if the scene were static, we could have added the BakeShadows helper from drei, this will render the shadows once and not on eact frame

it takes less time to render that before, but still a bit more since that baked shadows needs to be rendered in the final result

configuring the shadows: each light casting shadows will render the scene in a specific way and output it in what we call 'shadow map' this shadow map is then used to know if a surface is in the shade or not, by default the shadow map resolution is rather low in order to maintain solid performance 

most properties (even deep ones) are still accessable from the attributes, by seperating the different depth with dashes - 

Soft Shadows, the default one are too sharp, there are many ways to soften them:
1. Percent Closer Soft Shadow (PCSS): will make the shadow look blurry by picking the shadow map texture at an ofsset position according to the distance between the surface casting the shadow and the surface receiving the shadow, it's acheived in Three.js thanks to spidersharma03

https://github.com/spidersharma03
https://threejs.org/examples/#webgl_shadowmap_pcss

implementing this solution implies modifying the shader chunks of three.js directly, which is a bit messy, drei has a helper <softShadows> 

this helper will modify the shaders directly and each change applied on it's attributes will re-compline all the shader supporting shadows, we can tweak the attributes

the performance also took a hit 

Accumulative Shadows: it will accumulate multiple shadow renders, and we are goinig to move the light randomly before each render, the shadow will be composed of multiple renders from various angles, making it look soft and very realistic 

the AccumulativeShadows can be rendered on a plane only 

shadows on the mesh must be deactivated because the Accumaltive shadow is a shadow

the default scale is 10

we need to provide lights  

the shadow looks bad, because AccumaltiveShadows is doing a lot of shadow renders but always from the same directional light at the exact same position, we need to move it randomly on each frame, using RandomizeLight helper

The RandomizeLight has multiple attributes to control the behaviour of the light:
1. amount: how many lights (by default there is multiple lights)
2. radius: the amplitude of the jiggle
3. intensity: the intensity of the lights
4. ambient: act like if a global light was illuminating the whole scene, making only tight spaces and crevices receiving shadows

and control on the shadow map:
1. castShadow: if it should cast shadows
2. bias: the bias offset like for directional light shadows
3. mapSize: the shadow map size
4. size: the amplitude of the shadow (top, right, bottom, and left all at once)
5. near and far: how close and far the shadow map will render objects

we have access to some attributes like:
1. **color**: the color of the shadow
2. **opacity**: the opacity of the shadow
3. **frames**: how many shadow renders to do, the shadow will look better but Three.js will do renders on the first frame
4. **temporal**: spread the renders across multiple frames

a weird shape is beign drawn on the shadow if you move the camera, this due to the directional light helper messing up with the shadow map

**moving shadow**, using Ininfity on the frames, when using infinite frame the accumulativeShadows is only blending the last 20 shadow renders

so we set blend to a higher value, the higher the blend, the less chance you have the shadows on fast moving objects

use debug ui to find the perfect values 

**Contact Shadow**: it doesn't rely on the default shadow system of Three.js 

it works without a light and only on a plane 

the ContactShadow will render the whole scene a bit like the directional light does, but with the camera taking place of the camera taking place of the floor instead of the light it'll then blur the shadow map it look better

we can bake a shadow by setting the frames attribute on the <contactShadoe> to 1

it looks good but it has limitations:
* the shadows always comes from the front of the plane (positive y in our case)
* it's not physically accurate
* it blurs the shadow regardless of the distance from the objects
* it pulls quite a lot on the performance 


## Sky 

https://threejs.org/examples/webgl_shaders_sky.html

it is available in the sky helper

this class is physics based and tries to reproduce a realistic sky according to various parameters like mieCoefficient, mieDirectionalG, rayleigh and trubidity (Very hard for now we will just move the sun)

the usual way of setting a sun poisition is spherical coordinates 
* create a Spherical 
* clreate a Vector3
* Use its setFromSpherical method

## Evironment Map
we can use HDRI textures, it's like a 360 photo where the pixel data goes beyond the traditional color range

 there is Environment Texture

 we are going to use the environemnt map to illuminate the scene to prevent conflicts

 we are going to use traditional cube textures

if we want the environment to be the background we add it as an attribute  

HDRI textures, we can use one image covering the surronding, it's like a 360 photo and it's usually in High Dynamic Range in order to make the illumination data more accurate

it makes sense since light doesn't reakky stop at a range

Website to find HDRI environement maps is
https://polyhaven.com/hdris

* download the HDR version not EXR
* try to keep the resolution as small as possible 

Presets: drei created presets that willl take the files directly from poly haven 
https://github.com/pmndrs/drei/blob/master/src/helpers/environment-assets.ts

we can add <mesh> inside the environemnt 

by default the background of the environment map is black, we can change that

using meshes to illuminate our scene sounds like a limited solution since light shouldn't be limited to the color spectrum, in real life, we should be able to make the red plane brighter, to our eyes, it should become white like when a heated metal reaches very high tempreture 

using literal value like red, on the basic material doesn't allow us to control the actual intensity of the color, since color attribute is used to istantiate a Three.js color, we can also send an array containing the seperated red, green and blue values

for that we use LightFormer helper 
https://codesandbox.io/s/lwo219?file=/src/App.js:917-1016

using it in realistic scenes with reflection will add a lot to the coposition and realism 

adding the environment map to scene re-render it which will take some resourcese, if the environment map is used to illuminate the scene use small resolution 

**Ground** 
when using environment map as a background we have the feeling that objects are floating because the image is infinitely far 

 By adding a ground attribute, the projection of the environment map will make it look as if the floor underneath the object is near

 the ground is considered to be at the 0 elevation of the scene this means that, in theory our project are inside the ground

 fix it by moving them up a little with their position-y attribute

## Stage
it has minimal configuration

it will set environment map, shadows, two directional lights and center the scene

we can change the directional lights preset ('rembrandt', 'portrait', 'upfront', 'soft') 