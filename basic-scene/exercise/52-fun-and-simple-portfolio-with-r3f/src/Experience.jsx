import { OrbitControls, useGLTF, Environment, Float, PresentationControls } from "@react-three/drei";

export default function Experience() {
  const computer = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf"
  );
  console.log(computer);

  return (
    <>
      <color args={["#241a1a"]} attach="background" />

      <Environment preset="city" />

      {/* <OrbitControls makeDefault /> */}

      <PresentationControls
      global
      rotation={ [ 0.13, 0.1, 0 ] }
      polar={ [ -0.4, 0.2 ] } // Limit
      azimuth={ [ -1, 0.75 ] } // Limit
      config={ { mass: 2, tension: 400 } } // Spring
      snap={ { mass: 4, tension: 400 } } // Spring
      >
      <Float rotationIntensity={ 0.4  }>
        <primitive object={computer.scene} position-y={-1.2} />
      </Float>
        </PresentationControls> 

    </>
  );
}
