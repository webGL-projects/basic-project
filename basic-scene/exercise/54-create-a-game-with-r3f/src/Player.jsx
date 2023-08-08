import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls  } from "@react-three/drei";
import { useRef } from 'react'; 

export default function Player() {

    const body = useRef()
    const [ subscribeKeys, getKeys ] = useKeyboardControls()

    useFrame(() => {
        const { forward, backward, leftward, rightward} = getKeys()
        const impluse = { x: 0, y: 0, z: 0 }
        const torque = { x: 0, y: 0, z: 0}

        body.current.applyImpulse(impluse)
        body.current.applyTorqueImpulse(torque)
    })
  return (
    <>
      <RigidBody ref={ body } position={[ 0, 1, 0 ]} restitution={0.2} friction={1} colliders='ball' canSleep={false}>
        <mesh castShadow>
          <icosahedronGeometry args={[0.3, 1]} />
          <meshStandardMaterial flatShading color="mediumpurple" />
        </mesh>
      </RigidBody>
    </>
  );
}
