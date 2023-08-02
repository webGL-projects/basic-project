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