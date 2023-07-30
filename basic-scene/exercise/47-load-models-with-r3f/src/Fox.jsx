import { useGLTF, useAnimations } from '@react-three/drei'
import { useEffect } from 'react'
import { useControls } from 'leva'

export default function Fox(props) {
    const fox = useGLTF('./Fox/glTF/Fox.gltf')
    const animations = useAnimations(fox.animations, fox.scene)

    const {animationName} = useControls({
        animationName: { options: animations.names }
    })

    useEffect(() => {
        const action = animations.actions[animationName]
        action
        .reset()
        .fadeIn(0.5)
        .play()
        
        console.log(animationName)

        // window.setTimeout(() => {
        //     animations.actions.Walk.play()
        //     animations.actions.Walk.crossFadeFrom(animations.actions.Run, 1)
        // }, 2000)

        return () => {
            action.fadeOut(0.5)
        }

    }, [animationName])

    return (
    <primitive 
    object={fox.scene} 
    {...props}
    scale={ 0.02 }
    position={ [ -2.5, 0, 2.5 ] }
    rotation-y= { 0.3 }
    />
    )

}