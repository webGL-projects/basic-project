import { OrbitControls, useGLTF, useTexture, Center } from "@react-three/drei";

export default function Experience() {
  const { nodes } = useGLTF("./model/portal.glb");

  const bakedTextures = useTexture("./model/baked.jpg");
  bakedTextures.flipY = false;
  console.log(bakedTextures);

  return (
    <>
      <color args={["#030202"]} attach="background" />

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
      </Center>
    </>
  );
}
