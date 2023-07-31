## 3D Text in R3F 
There is a text3D helper 

https://github.com/pmndrs/drei

 to use it we need to provide a typeface font 

 we can create our own Typeface with facetypy website

 http://gero3.github.io/facetype.js/

By default a meshBasicMaterial is applied by default

Centering: there is a center helper provided from drei 

all the attributes used to create the TextGeometry can be used  

https://threejs.org/docs/#examples/en/geometries/TextGeometry

Matcaps: drei has a useMadCapTexture helper that will load matCap automatically from the repo 

https://github.com/emmelleppi/matcaps
https://github.com/nidorx/matcaps/blob/master/PAGE-17.md#7b5254_e9dcc7_b19986_c8ac91

it is not recomended to use this technique in production because we are dependent on the server that provides the textures

Text3D triggers a re-render on out component, its OK. it returns an array the first value is what we care about, so we destruct the const

the useMatCapHelper accept 2 attributes, the ID of the Mat Cap and the sceond width (64-1024)

## Donuts
https://threejs.org/docs/#api/en/geometries/TorusGeometry


[...Array(100)] ==> will create an empty array with 100 inecies to map over it

## Optimization 
we should only have 2 geometries

we can use this dobous solution:
1. create one <torusGeometry> outside of the donut
2. Store it by using useState
3. Put it back in the <mesh> of the donuts from the state 

in the 'Sahders of the performance monitoring, there is only one Shader because Three.js automatically re-uses Shaders when possible

or the better solution is to create the material before the Experience 

when using this solution the textures looks bright because R3F automatically changed the encoding of the matcaoTexture when we used it in the <meshMatcapMaterial> and we need to do it matnaullt

