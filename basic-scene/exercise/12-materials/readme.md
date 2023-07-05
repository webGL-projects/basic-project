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
