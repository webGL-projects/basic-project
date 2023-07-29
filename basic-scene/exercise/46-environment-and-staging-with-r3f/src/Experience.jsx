import { useFrame } from "@react-three/fiber";
import { OrbitControls, useHelper, BakeShadows, SoftShadows, AccumulativeShadows, RandomizedLight, ContactShadows } from "@react-three/drei";
import { useRef } from "react";
import { Perf } from "r3f-perf";
import * as THREE from 'three'
import { useControls } from "leva"

export default function Experience() {
  const cube = useRef();
  const directionalLight = useRef()
  useHelper(directionalLight, THREE.DirectionalLightHelper, 1)

  useFrame((state, delta) => {
    //   const time = state.clock.elapsedTime
    //   cube.current.position.x = 2 + Math.sin(time)
    cube.current.rotation.y += delta * 0.2;
  });

  const { color, opacity, blur } = useControls('contact shadows', {
    color: '#1d8f75',
    opacity: { value: 0.4, min: 0, max: 1 },
    blur: { value: 2.8, min: 0, max: 10 }
  })
  return (
    <>
      <color args={["ivory"]} attach="background" />

      <Perf position="top-left" />


      <OrbitControls makeDefault />

      <directionalLight 
      ref={ directionalLight } 
      position={[1, 2, 3]} 
      intensity={1.5} 
      castShadow
      shadow-mapSize={ [ 1024, 1024 ] }
      shadow-camera-near={ 1 }
      shadow-camera-far={ 10 }
      shadow-camera-top={ 5 }
      shadow-camera-right={ 5 }
      shadow-camera-bottom={ -5 }
      shadow-camera-left={ -5 }

      />
      <ambientLight intensity={0.5} />

      {/* <BakeShadows />  */}
      {/* <SoftShadows frustum={3.75} size={50} near={9.5} samples={17} rings={11}/>  */}

      {/* <AccumulativeShadows
        position={ [ 0, -0.99, 0 ] }
        scale={ 10 }
        color="#316d39"
        opacity={ 0.8 }
        frames={ Infinity }
        temporal
        blend={ 100 }
      >
         <RandomizedLight 
        position={[1, 2, 3]} 
        amount={8}
        radius={1}
        ambient={0.5}
        intensity={1}
        bias={0.001}
      />

      </AccumulativeShadows> */}

      <ContactShadows 
        position={ [ 0, -0.99, 0 ] }
        scale={ 10 }
        resolution={ 512 }
        far={ 5 }
        color = { color }
        opacity = { opacity }
        blur = { blur }
   /> 

      <mesh position-x={-2} castShadow  >
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh ref={cube} position-x={2} scale={1.5} castShadow>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh 
      position-y={-1}
      rotation-x={-Math.PI * 0.5} 
      scale={10} 
    //   receiveShadow

      >
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
