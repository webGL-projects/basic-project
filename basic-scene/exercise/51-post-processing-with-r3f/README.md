# Post Processing with R3F 
in previous lessons, we used post-processing by adding passes each pass had its own code and was completing one or multiple renders then the next pass would do the same, these passes all occurred indepndentently and some of them were doing the same renders(depth renders, normal renders, etc.) which resulted in oerfiormance issues 

the solution postprocessing, the various passes will be merged into the least number of passes possible, we ralk about 'effects' 

https://github.com/pmndrs/postprocessing
https://pmndrs.github.io/postprocessing/public/docs/
https://pmndrs.github.io/postprocessing/public/demo/#antialiasing
https://github.com/pmndrs/postprocessing/wiki/Custom-Effects

the effects will be merged togeather into one multiple passes (if needed) automatically while keeping the other in which we added them and we can even choose the blending of each effect

https://github.com/pmndrs/react-postprocessing
https://docs.pmnd.rs/react-postprocessing/introduction
https://docs.pmnd.rs/react-postprocessing/effects/bloom
https://docs.pmnd.rs/react-postprocessing/effects/custom-effects

