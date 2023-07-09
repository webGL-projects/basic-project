# Three.js Journey

## Setup
Download [Node.js](https://nodejs.org/en/download/).
Run this followed commands:

``` bash
# Install dependencies (only the first time)
npm install

# Run the local server at localhost:8080
npm run dev

# Build for production in the dist/ directory
npm run build
```

# Material 
Materials are used to put a color on each visible pixel of the geometries.

The algorithms that decide on the color of each pixel are written in programs called shaders.
Writing shaders is one of the most challenging parts of WebGL and Three.js, but don't worry; Three.js has many built-in materials with pre-made shaders.

MeshBasicMaterial: Which applies a uniform color or a texture on our geometry search for 'material' on the Three JS documentation we are going to test them all 

Color will apply a uniform color on the surface of the geometry once instantiated, the color property becomes a Color

https://threejs.org/docs/index.html#api/en/materials/LineBasicMaterial

https://threejs.org/docs/index.html#api/en/materials/MeshBasicMaterial

MeshNormalMAterial: displays a nice purple color that looks like the normal texture we saw in the texture lessons

Normals are information that contains the direction of the outside of the face

Normals can be used for the lighting, reflection, refraction, etc.

it shares common properties with MeshBasicMaterial like wireframe, transparent, opacity and side but there is also a flatShading property 

flatShading will flatten the faces, meaning that the normals won't be interpolated between the vertices

it is normally used to debug normals, but the color looks so great that you can use it!! for your projects like this project https://www.ilithya.rocks/ 

https://threejs.org/docs/#api/en/materials/MeshNormalMaterials

MeshMatCapMaterial: will display a color by using the normals as a refernce to pick the right color on a texture that looks like a sphere 

it give the illusion that the object is illuminated

https://threejs.org/docs/#api/en/materials/MeshMatcapMaterial

we can find mat cap materials in this repo
https://github.com/nidorx/matcaps

you can also create your own with a 3D Software or you can create 2D with photoshop

MeshDepthMaterial: it will simply color the geometry in white if it's close to the near and in black if it is close to the far value of the camera

https://threejs.org/docs/index.html#api/en/materials/MeshDepthMaterial

# Lights

Ambient Light: doesn't work on MeshDepthMaterial 

https://threejs.org/docs/index.html#api/en/lights/AmbientLight

Point Light: 

https://threejs.org/docs/#api/en/lights/PointLight

## Materials that react to light:

1. Mesh ambertMaterial: it has new properties related to lights but we will see those later with a more adquate material, it's performant but we can see strange patterns on the geometry 

https://threejs.org/docs/#api/en/materials/MeshLambertMaterial

2. Mesh Phong Material: ie is similar to the MeshLambrtMaterial, the the strange patters are less visible, and you can see the light reflection, and it is less performant than lambrt

we can control the light reflection with shininess and the color of this reflection with specular

https://threejs.org/docs/#api/en/materials/MeshPhongMaterial

3. Mesh Toon Material: it is similar to ambert but cartoonish

we can add more steps to the coloration, you can use the gradientMAp property and use the greiedentTexture

we see a gradient instead of a clear seperation because the gradient is small and the magFilter tries to fix it with the mipmapping 

to solve it we set the minFilter and magFilter to THREE.NearestFilter and deactivate the mipmapping with gradientTexture.generateMipmaps = false

https://threejs.org/docs/#api/en/materials/MeshToonMaterial


4. Mesh Standard Material: it use Physically Based Rendering principles (PBR) like Lambrt and Phong it supports lights but with a more realistic algrorithm and better parameters like roughness and metallness

aoMap: ambient Occlusion Map will add shadows where the texture is dark we must add a second set of UV named uv2

we add oaMap with the doorAmbientOcclusionTexture texture and control the intensity with aoMapIntensity 

instead of specifying uniform metalness and roughness for the whore geometry we can use metalness and roughness

the roughness and metalness affect each map respectevly so the reflections looks weird

normalMap will fake the normals orintation and add details on the surface regardless of the subdivision

https://threejs.org/docs/#api/en/materials/MeshStandardMaterial

5. Mesh Physic Material: it is the same as standard but with support of a clear coat effect

https://threejs.org/docs/index.html#api/en/materials/MeshPhysicalMaterial

6. Shader Material: used to create my own material

https://threejs.org/docs/index.html#api/en/materials/ShaderMaterial

7. Raw Shader Material: used to create my own material

https://threejs.org/docs/index.html#api/en/materials/RawShaderMaterial


## Points Material 
it can be used with praticles

## Environment Map 
it is an image of what's surronding the scene it can be used for reflection or refraction but also for general lighting environment maps are supported by multiple material but we will use MeshStandardMaterial

Three.js supports cube environment maps

to load the texture we use CubeTextureLoader 

https://threejs.org/docs/index.html#api/en/loaders/CubeTextureLoader

px: positive x
nx: negative x
py: positive y
ny: negative y
pz: positive z
nz: negative z

we use environmentMapTexture in the envMap property of the material

you can search for environment maps from the web

1. HDRHaven hunderds of awesome HDRIs ( High Dynamic Range Imaging ) not Cube map 

https://polyhaven.com/

you can use this website to transform the HDRI to Cube Map

https://matheowis.github.io/HDRI-to-CubeMap/


