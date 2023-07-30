
import { useGLTF, Clone } from '@react-three/drei'

export default function Model(props) {

  const model = useGLTF('./hamburger-draco.glb')
  return (
    <>
      <Clone object={model.scene} {...props} position-x={ - 4 }/>
      <Clone object={model.scene} {...props} position-x={ 0 }/>
      <Clone object={model.scene} {...props} position-x={ 4 }/>
    </>
  );
}

useGLTF.preload('/hamburger-draco.glb')
