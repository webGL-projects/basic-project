# Post Processing with R3F 
in previous lessons, we used post-processing by adding passes each pass had its own code and was completing one or multiple renders then the next pass would do the same, these passes all occurred indepndentently and some of them were doing the same renders(depth renders, normal renders, etc.) which resulted in oerfiormance issues 

the solution postprocessing, the various passes will be merged into the least number of passes possible, we ralk about 'effects' 

the effects will be merged togeather into one multiple passes (if needed) automatically while keeping the other in which we added them and we can even choose the blending of each effect

https://github.com/pmndrs/react-postprocessing
https://docs.pmnd.rs/react-postprocessing/introduction
https://docs.pmnd.rs/react-postprocessing/effects/bloom
https://docs.pmnd.rs/react-postprocessing/effects/custom-effects

## Implement 
two dependencies are requied 
 * @react-three/postprocessing
 * postprocessing 

 You might notice that all materials are changing when adding <EffectComposer>.

It’s a bug in the latest versions of @react-three/postprocessing due to EffectComposer rendering the scene with MeshNormalMaterial for later use in the effects.

It’ll automatically disappear once you add effects and you can ignore it.

Multisampling: is used to prevent the aliasing effect by default, the value at 8 and we can lower it down to 0 in order to disable it completely with the multisampling attribute

## Finding Effects and how to implement them 

https://github.com/pmndrs/postprocessing
https://pmndrs.github.io/postprocessing/public/docs/
https://pmndrs.github.io/postprocessing/public/demo/#antialiasing
https://github.com/pmndrs/postprocessing/wiki/Custom-Effects

Blending: blendFunction is an attribute available for all effects works like blending in image editing softwares and it's how the color of what we are drawing merges with what's behind, the default blending is normal and it simply draws the effect on top of the previous one 

to change the blending we need to get the type of blending

debugUI is preferable to find the best blending

## Glitch Effect
it will glitch the screen randomly

it is a good idea to add a warning, because some people are sensitive 

## Noise Effect
it will add parasitesto the screen, we need to use BlendFunction types:
 1. BelendFunction.OVERLAY
 2. BelendFunction.SCREEN
 3. BelendFunction.SOFT_LIGHT
 4. BelendFunction.AVERAGE

 premultiply will multiply the noise with the input color before applying the blending, it usually results in a darker render but it blends better with the image

 ## Bloom Effect
 it will make our objects glow

 the defau;t configuration of bloom make objects glow only when their color channels go beyond the 0.9 threshold

 we must fix a limitation, tone mapping id applied by default and it'll clamp the colors between 0 and 1

 we can deactivate it on specific materials ising the tone mapping attribute

 the mipmap blur will use the same mipmapping used for textures, smaller resolutions of the render will be combined into a bloom texture that is then added to the initial render

 if you want a uniform emissive, you can switch to a <meshBasixMAterial> but you won't be able to use the emissive and emissiveIntensity and you'll have to set the color attribute with channel values that go above 1

 ## Depth of Feild Effect
 the 3 main attributes of DOP:
  1. fucusDistance: at which distance the image should be sharp 
  2. focalLenght: the distance to travel from the focusDistance before reaching the maximum blur 
  3. bokehScale: the blur redius

  the values are in normalized space (0-1) according to the camera near and far, it is not an absolute distance

  ## Screen Space Reflection (SSR) Effect
  it will add reflection to the scene ar a decent frame rate

  it will calculate what should be reflected on the surface according to its position, its otintation and its material properties, althogh not perfect, it's very realistic