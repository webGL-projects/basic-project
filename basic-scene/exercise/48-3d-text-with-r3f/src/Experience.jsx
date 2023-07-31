import { OrbitControls, Text3D, Center, useMatcapTexture } from "@react-three/drei";
import { Perf } from "r3f-perf";

export default function Experience() {

    const [ matcapTexture ] = useMatcapTexture('7B5254_E9DCC7_B19986_C8AC91', 256)

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <Center>
        <Text3D 
        font="./fonts/helvetiker_regular.typeface.json"
        size={ 0.75 }
        height={ 0.2 }
        curveSegments={ 12 }
        bevelEnabled
        bavelThickness={ 0.02 }
        bavelSize={ 0.02 }
        bavelOffset={ 0 }
        bavelSegments={ 5 }
        >
          Hello R3F
          <meshMatcapMaterial matcap={matcapTexture} />
          
        </Text3D>
      </Center>

      { [...Array(100) ].map( (value, index) => 
            <mesh
            key={ index }
            position={ [
                ( Math.random() - 0.5 ) * 10,
                ( Math.random() - 0.5 ) * 10,
                ( Math.random() - 0.5 ) * 10                
            ] } 
            scale={ 0.2 + Math.random() * 0.2}
            rotation={ [
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                0
            ] }
            >
            <torusGeometry /> 
            <meshMatcapMaterial matcap={ matcapTexture } args={ [ 1, 0.6, 16, 32 ] } /> 
          </mesh>
      ) }


    </>
  );
}
