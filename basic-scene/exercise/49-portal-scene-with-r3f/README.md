# Portal Scene
Shaders of the portal (vertex and fragment) are located in the shaders folder

we need to change the color of the background 

## The Model
to load the  model we use useGLTF

the model is composed of multiple parts:
1. the baked model to which we need to apply a MeshBasicMaterial with the baked texture
2. Two pole lights Meshes to which we need to apply a MeshBasicMAterial 
3. The portal to which we need to app ly a ShaderMAterial 

Because of that. we are not going to add the whole model at once to the scene, instead, we are going to add each element seprately in order to have more control over them and those elements are already avsilable in the nodes property 

Backed Model is the baked model node is named baked and we can now access it with nodes.baked

we are going to use <primitive> because we want to apply our own material to the Mesh, but we do need the geometry 

we need to load the texture we can use the useTexture helper from drei 

there is an issue with th etexture, we need to flip the y coordinates needs to be flipped  

Since the texture is immediatly returned when calling useTexture, we can directly flip it with the flipY property 

Centering we need to center the scene using the Center helper from drei 

Pole Lights 


## Color 
the colors look brighter because R3F sets a toneMapping, it is good but not in our case, because we baked the it from blender, and blender already applies tone mapping with its color managment system

to solve that we set flat on the <Canvas> it will set the toneMapping to THREE.NoToneMapping 