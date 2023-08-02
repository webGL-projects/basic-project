import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { EffectComposer, Vignette, Glitch, Noise, Bloom } from '@react-three/postprocessing'
import { useControls } from 'leva'
import { BlendFunction, GlitchMode } from 'postprocessing'
// console.log(BlendFunction)
// console.log(GlitchMode)

export default function Experience()
{
        
    return <>

        {/* to solve the vignette issue */}
        <color args={ [ '#ffffff' ] } attach={'background'} /> 

        <EffectComposer >
            
            {/* <Vignette 
            offset={ 0.3 }
            darkness={ 0.9 }
            blendFunction={ BlendFunction.NORMAL } 
            />  */}

            {/* <Glitch 
            delay={ [ 0.5, 1] }
            duration={ [ 0,1, 0.3 ] }
            strength={ [ 0.2, 0.4 ] }
            mode={ GlitchMode.CONSTANT_MILD }
            />  */}
{/* 
            <Noise 
            premultiply
            blendFunction={ BlendFunction.SOFT_LIGHT}
            /> */}

            <Bloom 
            mipmapBlur
            intensity={ 0.5 }
            // luminanceThreshold={ 0 }
            />


        </EffectComposer>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />

        <mesh castShadow position-x={ - 2 }>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>

        <mesh castShadow position-x={ 2 } scale={ 1.5 }>
            <boxGeometry />
            {/* <meshStandardMaterial 
            // color={ [ 4, 1, 2 ]  } 
            color='#ffffff'
            emissive='orange'
            emissiveIntensity={ 2 }
            toneMapped = { false } 
            /> */}
            {/* <meshBasicMaterial color={ [ 1.5, 1, 4 ] } toneMapped={ false } /> */}
            <meshStandardMaterial color='mediumpurple' /> 
        </mesh>

        <mesh receiveShadow position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

    </>
}