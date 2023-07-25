import ReactDOM from "react-dom/client";
import { Canvas } from '@react-three/fiber'
import "./style.css";
import { Mesh } from "three";
import Experience from './Experience.jsx';

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
    <Canvas>
        <Experience />
    </Canvas>
);
