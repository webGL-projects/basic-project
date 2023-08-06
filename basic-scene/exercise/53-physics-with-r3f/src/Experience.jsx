import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Physics, RigidBody, CuboidCollider, BallCollider } from "@react-three/rapier";
import { useRef } from "react";

export default function Experience() {

    const cube = useRef()

    const cubeJump = () => {
        cube.current.applyImpulse({ x: 0, y: 5, z: 0 })
        cube.current.applyTorqueImpulse({ x: Math.random() - 0.5 , y: Math.random() - 0.5, z: Math.random() - 0.5 })
    }

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <Physics debug>

        <RigidBody colliders='ball' position={[-1.5, 2, 0]}>
          <mesh castShadow >
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>

        <RigidBody position={[1.5, 2, 0]} ref={ cube  } >

          <mesh castShadow onClick= {cubeJump}>
            <boxGeometry /> 
            <meshStandardMaterial color='mediumpurple' /> 
          </mesh>


        </RigidBody>

        <RigidBody type='fixed'>
          <mesh receiveShadow position-y={-1.25}>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>

      </Physics>
    </>
  );
}
