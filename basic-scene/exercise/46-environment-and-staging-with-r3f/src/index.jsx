import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import * as THREE from 'three'

const root = ReactDOM.createRoot(document.querySelector('#root'))

// const created = ( { gl, scene } ) => {
//     console.log(gl)
//     // gl.setClearColor('#ff0000', 1)
//     scene.backgroung = new THREE.backgroung('#ff0000')
    
// }

root.render(
    <Canvas
    // shadows 
        camera={ {
            fov: 45,
            near: 0.1,
            far: 200,
            position: [ - 4, 3, 6 ]
        } }
        // onCreated={created}
    >
        <Experience />
    </Canvas>
)