import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader }  from 'three/examples/jsm/loaders/DRACOLoader.js'

export default function Model(props) {
  const model = useLoader(
    GLTFLoader,
    "./hamburger.glb",
    (loader) => {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("./draco/");
      loader.setDRACOLoader(dracoLoader);
    }
  );
  return (
    <>
      <primitive object={model.scene} {...props} />
    </>
  );
}
