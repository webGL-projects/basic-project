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