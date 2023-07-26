import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { ACESFilmicToneMapping, CineonToneMapping, Mesh } from "three";
import Experience from "./Experience.jsx";
import * as THREE from 'react'
import "./style.css";

const root = ReactDOM.createRoot(document.querySelector("#root"));

const cameraSettings = {
  fov: 45,
  // zoom: 100,
  near: 0.1,
  far: 200,
  position: [3, 2, 6],
};

root.render(
  <Canvas
    // orthographic
    // dpr={ [ 1, 2 ] } // [1, 2] is actually the default value set by R3F 
    camera={cameraSettings}
    gl={{ 
        antialias: true,
    toneMapping: THREE.ACESFilmicToneMapping,
    outputColorSpace: THREE.SRGBColorSpace    }}
    // flat
  >
    <Experience />
  </Canvas>
);
