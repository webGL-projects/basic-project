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
# 3D Text 
this achieved using the TextBufferGeometry class, we need a particular font format called typeface 

how to get a typeface
1. we can convert a font with tools like Facetype.js 

http://gero3.github.io/facetype.js/

2. use the fonts provided by threejs

/node_modules/three/examples/fonts/ move it to static/fonts

## Geometry 
we are using TextBuffer Geometry 

wireframes are good to test the geometry 

creating text geometry is long and hard for the computer, avoid using it too many times and keep the geometry as low poly as possible by reducing the curveSegments and bevelSegments

## Center the txet
we use the axes Helper as a guideline, then we can use one of multiple solutions

1. Bounding: it is an information associated with the geometry that tells what space is taken by the geometry, it can be a box or a sphere 

it helps three.js calculate if an object is on the screen (srustum culling) we are going to use the bounding to recenter the geometry 

by default three.js use Sphere Bounding, we can calculate the box bounding with computrBoundingBox() 

the min value is not 0 because of bevelThickness and bevelSize

we don't move the mesh we move the whole geometry using translate

2. Center(): we can center using textGeometry center method

## MatCap
we are going to use the MeshMatcapMaterial

https://github.com/nidorx/matcaps

