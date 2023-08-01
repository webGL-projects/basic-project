import { OrbitControls, useGLTF, useTexture, Center, Sparkles, shaderMaterial } from "@react-three/drei";
import { Perf } from "r3f-perf"
import portalVertexShader from "./shaders/portal/vertex.glsl"
import portalFragmentShader from "./shaders/portal/fragment.glsl"
import * as THREE from 'three'
import { extend, useFrame } from '@react-three/fiber'
import { useRef } from "react";

const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color('#ffffff'),
    uColorEnd: new THREE.Color('#000000')
  },
  portalVertexShader,
  portalFragmentShader
)

extend( { PortalMaterial } )

export default function Experience() {
  const { nodes } = useGLTF("./model/portal.glb");

  const bakedTextures = useTexture("./model/baked.jpg");
  bakedTextures.flipY = false;

  const portalMaterial = useRef()

  useFrame(( state, delta ) => {
    portalMaterial.current.uTime += delta
  })

  return (
    <>
      <color args={["#030202"]} attach="background" />

      <Perf position='top-left' /> 

      <OrbitControls makeDefault />

      <Center>
        <mesh geometry={nodes.baked.geometry}>
          <meshBasicMaterial map={bakedTextures} />
        </mesh>

        {/* PoleLights */}
        <mesh
          geometry={nodes.poleLightA.geometry} 
          position={nodes.poleLightA.position}
        >
        <meshBasicMaterial color='#ffffe5' />
        </mesh>

        <mesh
          geometry={nodes.poleLightB.geometry}
          position={nodes.poleLightB.position}
          >
          <meshBasicMaterial color='#ffffe5' />
          </mesh>

          <mesh
          geometry={ nodes.portalLight.geometry }
          position={ nodes.portalLight.position }
          rotation={ nodes.portalLight.rotation }
          >
            {/* <shaderMaterial 
            vertexShader={ portalVertexShader }
            fragmentShader={ portalFragmentShader }
            uniforms={ {
              uTime: { value: 0},
              uColorStart: { value: new THREE.Color('#ffffff')},
              uColorEnd: { value: new THREE.Color('#000000')}
            } }
            />  */}
            <portalMaterial ref={ portalMaterial }/> 
          </mesh>

          <Sparkles 
          size={ 6 }
          scale={ [ 4, 2, 4 ] }
          position-y={ 1 }
          speed={ 0.2 }
          count={ 40 }
          /> 
      </Center>
    </>
  );
}
