import { OrbitControls, useGLTF } from "@react-three/drei";
import { Perf } from "r3f-perf";
import {
  Physics,
  RigidBody,
  CuboidCollider,
  BallCollider,
  CylinderCollider,
  InstancedRigidBodies,
} from "@react-three/rapier";
import { useRef, useState, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Experience() {
  const cube = useRef();

  const cubeJump = () => {
    const mass = cube.current.mass();
    console.log(mass);
    cube.current.applyImpulse({ x: 0, y: 5 * mass, z: 0 });
    cube.current.applyTorqueImpulse({
      x: Math.random() - 0.5,
      y: Math.random() - 0.5,
      z: Math.random() - 0.5,
    });
  };

  const twister = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const angle = time * 0.5;

    const eulerRotation = new THREE.Euler(0, time * 3, 0);
    const quaternionRotation = new THREE.Quaternion();
    quaternionRotation.setFromEuler(eulerRotation);
    twister.current.setNextKinematicRotation(quaternionRotation);

    const x = Math.cos(angle) * 2;
    const z = Math.sin(angle) * 2;
    twister.current.setNextKinematicTranslation({ x: x, y: -0.8, z: z });
  });

  const [hitSound] = useState(() => new Audio("./hit.mp3"));

  const collisionEnter = () => {
    console.log("Collision!");
    // hitSound.currentTime = 0
    // hitSound.volume = Math.random()
    // hitSound.play();
  };

  const hamburger = useGLTF("./hamburger.glb");

  const cubeCount = 300;
//   const cubes = useRef();

//   useEffect(() => {
//     for (let i = 0; i < cubeCount; i++) {
//       const matrix = new THREE.Matrix4();
//       matrix.compose(
//         new THREE.Vector3(i * 2, 0, 0),
//         new THREE.Quaternion(),
//         new THREE.Vector3(1, 1, 1)
//       );
//       cubes.current.setMatrixAt(i, matrix);
//     }
//   }, []);

const instances = useMemo(() => {
    const instances = []
    for(let i=0; i< cubeCount; i++) {
        instances.push({
            key: 'instance_' + i,
            position: [
                (Math.random() - 0.5) * 8, 
                6 + i * 0.2, 
                (Math.random() - 0.5) * 8
                ],
            rotation: [Math.random(), Math.random(), Math.random()]
        })
    }

    return instances
}, [])

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <Physics 
    //   debug 
      gravity={[0, -9.08, 0]}>

        <RigidBody colliders="ball" position={[-1.5, 2, 0]}>
          <mesh castShadow>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>

        <RigidBody
          position={[1.5, 2, 0]}
          ref={cube}
          gravityScale={1}
          restitution={0}
          friction={0.7}
          colliders={false}
          onCollisionEnter={collisionEnter}
          //   onCollisionExit={() => console.log('Exit!')}
          //   onSleep={() => console.log('Sleep!')}
          //   onWake={() => console.log('Wake!')}
        >
          <CuboidCollider mass={2} args={[0.5, 0.5, 0.5]} />
          <mesh castShadow onClick={cubeJump}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
        </RigidBody>

        <RigidBody type="fixed">
          <mesh receiveShadow position-y={-1.25}>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>

        <RigidBody
          position={[0, -0.8, 0]}
          friction={0}
          type="kinematicPosition"
          ref={twister}
        >
          <mesh castShadow scale={[0.4, 0.4, 3]}>
            <boxGeometry />
            <meshStandardMaterial color="red" />
          </mesh>
        </RigidBody>

        <RigidBody position={[0, 4, 0]} colliders={false}>
          <primitive object={hamburger.scene} scale={0.25} />
          <CylinderCollider args={[0.5, 1.25]} />
        </RigidBody>

        <RigidBody type="fixed">
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, 5.25]} />
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, -5.25]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[5.25, 1, 0]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[-5.25, 1, 0]} />
        </RigidBody>

        <InstancedRigidBodies instances={instances}>
          <instancedMesh args={[null, null, cubeCount]}  castShadow>
            <boxGeometry />
            <meshStandardMaterial color="tomato" />
          </instancedMesh>
        </InstancedRigidBodies>
      </Physics>
    </>
  );
}
