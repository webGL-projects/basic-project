import { OrbitControls, useGLTF, Environment } from '@react-three/drei'

export default function Experience()
{

    const computer = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf')
    console.log(computer)

    return <>

        <color args={ ['#241a1a']} attach='background' /> 

        <Environment preset='city' /> 

        <OrbitControls makeDefault />

        <primitive object={ computer.scene } /> 
    </>
}