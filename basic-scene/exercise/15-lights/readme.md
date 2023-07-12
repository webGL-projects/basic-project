# Lights

Addi ng light is as easy as adding meshes.

there are multiple types of lights:
 1. Ambient Light: 
 This light globally illuminates all objects in the scene equally.

This light cannot be used to cast shadows as it does not have a direction.

we can use it to simulate light bouncing. (fill light)

 https://threejs.org/docs/#api/en/lights/AmbientLight

 2. Directional Light:
 A light that gets emitted in a specific direction. This light will behave as though it is infinitely far away and the rays produced from it are all parallel. The common use case for this is to simulate daylight; the sun is far enough away that its position can be considered to be infinite, and all light rays coming from it are parallel.

 it will have a sun-like effect as if the sun rays were travelling in parallel

 https://threejs.org/docs/index.html#api/en/lights/DirectionalLight

 https://threejs.org/docs/index.html#api/en/helpers/DirectionalLightHelper

 3. Hemishpere Light:
A light source positioned directly above the scene, with color fading from the sky color to the ground color.

This light cannot be used to cast shadows.

it is similar to the Ambeint light but with different color from the sky than the colr coming from the ground.

https://threejs.org/docs/index.html#api/en/lights/HemisphereLight

https://threejs.org/docs/index.html#api/en/helpers/HemisphereLightHelper

4. Point Light:
A light that gets emitted from a single point in all directions. A common use case for this is to replicate the light emitted from a bare lightbulb.

This light can cast shadows

it is almost like a lighter the light starts at an infinitely small and spe=reads uniformaly in every directoin.

by default, the light intensity doesn't fade we can control the fade distance and how fast it fades with distance and decay

https://threejs.org/docs/#api/en/lights/PointLight

https://threejs.org/docs/index.html#api/en/helpers/PointLightHelper

5. Rect Area Light:
RectAreaLight emits light uniformly across the face a rectangular plane. This light type can be used to simulate light sources such as bright windows or strip lighting.

Important Notes:

a. There is no shadow support.
b. Only MeshStandardMaterial and MeshPhysicalMaterial are supported.
c. You have to include RectAreaLightUniformsLib into your scene and call init().

it works like the big rectangle lights you can see on the photoshoot set, it's a mix between directional light and a diffuse light

you can position and rotate the light , you can also use lookAt() to retate more easily 

https://threejs.org/docs/index.html#api/en/lights/RectAreaLight

https://threejs.org/docs/index.html#examples/en/helpers/RectAreaLightHelper

6. Spot Light:
This light gets emitted from a single point in one direction, along a cone that increases in size the further from the light it gets.

This light can cast shadows

it is like a flashlight starting at a point and oriented in a dirction 

penumbra: the partially shaded outer region of the shadow cast by an opaque object.

to rotate SpotLight we need to add its target property to the scene and move it

https://threejs.org/docs/index.html#api/en/lights/SpotLight

https://threejs.org/docs/index.html#api/en/helpers/SpotLightHelper

## Performance
Lights can cost a lot when it comes to performances

Lights with Minimal Cost:
a. AmbientLight
b. HemisphereLight

Lights with Moderate Cost:
a. DirectionalLight
b. PointLight

Lights with High Cost:
a. SpotLight
b. RectAreaLight

## Baking
The idea is to bake the light into the texture this can be done in a 3D software.

The drawback is that we cannot move the light anymore and we have to load hugh texture

## Helpers 
are used to assist with positioning the lights 

SpotLightHelper: has no size 

RectAreaHelper: it is not part of the THREE variable and we must import it