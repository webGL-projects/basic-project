import { OrbitControls, useGLTF, useTexture, Center, Sparkles } from "@react-three/drei";
import { Perf } from "r3f-perf"

export default function Experience() {
  const { nodes } = useGLTF("./model/portal.glb");

  const bakedTextures = useTexture("./model/baked.jpg");
  bakedTextures.flipY = false;
  console.log(bakedTextures);

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
            <meshBasicMaterial color='#ffffff' /> 
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
