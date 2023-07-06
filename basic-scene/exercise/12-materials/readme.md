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
