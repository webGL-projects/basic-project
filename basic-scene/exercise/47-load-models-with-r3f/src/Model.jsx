
import { useGLTF } from '@react-three/drei'

export default function Model(props) {

  const model = useGLTF('./hamburger-draco.glb')
  return (
    <>
      <primitive object={model.scene} {...props} />
    </>
  );
}

useGLTF.preload('/hamburger-draco.glb')
