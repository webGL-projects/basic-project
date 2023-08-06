# Physics with R3F 

## From Cannon to Rapier
Cannon is a great Physics library, but the original code hasn't been updated in many years, cannon-es is what works with R3F and it is very valiable solution 

https://github.com/pmndrs/cannon-es
https://github.com/pmndrs/use-cannon
https://www.npmjs.com/package/@react-three/cannon

## Rapier
it was created in 2019 and its written in Rust, with webAssembly used for it to work with JS

https://rapier.rs/
https://www.rust-lang.or
https://rapier.rs/javascript3d/index.html

WebAssembly: enables running languages like C/C++, C# and Rust on a webpage with almost native Performance, it is determinism, runnu=ing the same Conditions will result in the same animation even on multiple devices (by default)

https://rapier.rs/docs/user_guides/javascript/getting_started_js/
https://dimforge.com/
https://twitter.com/dimforge
https://rapier.rs/demos2d/index.html
https://rapier.rs/demos3d/index.html

Rapier isn't bound to Three.js and we can use it with any other library

## React Three Rapier
https://github.com/pmndrs/react-three-rapier
https://github.com/wiledal
https://twitter.com/etthugo
https://github.com/pmndrs/react-three-rapier#readme
https://docs.pmnd.rs/react-three-fiber/getting-started/examples

it is already implemented as React Three Rapier 

there is Rapier (without Three.js nor R3F) 

## <Physics>
it wraps arounfd the mesh, even light ( even though it does nothing)

we need to specify which objects are going to be affected by wrapping them in a <RigidBody>

<RigidBody> can only be added inside the <Physics> element

https://rapier.rs/javascript3d/classes/RigidBody.html

## Under the hood 
* we don't have to update the physics in each frame
* Three.js object are automatically associated with the crosspending RigidBody surronding them
* React Three Rapier creates a physics shape matching the Three.js objects
* We don't have to specify surface properties, object mass, gravity, etc. 

 ## Debugging 
 we need to add a debug mode, to see what really happens in the physics world

 it is usually for development only 

 those wireframes can have an impact on peerformance