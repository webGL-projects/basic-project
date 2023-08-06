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

 ## Colliders
 https://rapier.rs/docs/user_guides/bevy_plugin/colliders/#overview

 Colliders are the shapes that make up our RigidBodies

 in the case of the sphere, the collider seems to be a box, the actual word used by reier for this shape is 'Cuboid'

 https://rapier.rs/docs/user_guides/bevy_plugin/colliders/#overview

 Automatic colliders it automatically fit the object, the colliders don't need to be physically linked togeather to work as one complex body, adding weight away from the body causes the object to fall 

 Ball Collider
 https://rapier.rs/javascript3d/classes/Ball.html

 sometimesit is ok to have a collider that doesn't match the model, you can choose the collider in the <RigidBody> with the colliders attribute, the default one is cuboid but we can set it to ball

 Hull Collider (Convex hull): it is like adding an elastic membrance arounfd the object
 

 Trimesh Collider (triangle mesh): it is not useable with dynamic RigidBodies, because the colliders generated with a trimesh are empty on the inside and it makes collision detection more complicated and prone to bugs, a fast object might go through the trimesh or end up stuck on its surface

 https://rapier.rs/javascript3d/classes/TriMesh.html

 Custom Collider: we need to stop the automatic collider, we can use the react Rapier documentation as a refernce

 https://rapier.rs/javascript3d/classes/Ball.html
 https://rapier.rs/javascript3d/classes/Cuboid.html
 https://rapier.rs/javascript3d/classes/RoundCuboid.html
 https://rapier.rs/javascript3d/classes/Capsule.html
 https://rapier.rs/javascript3d/classes/Cone.html
 https://rapier.rs/javascript3d/classes/Cylinder.html
 https://rapier.rs/javascript3d/classes/ConvexPolyhedron.html
 https://rapier.rs/javascript3d/classes/TriMesh.html
 https://rapier.rs/javascript3d/classes/Heightfield.html

 the way <RigidBody> amd <mesh> work regarding position and rotation is very similar, scale is not supported

## Access the body and apply forces
sometimes we want to call a specific instruction on the bodies

refernce and impluse:
* addForce is used to apply a force that lasts for quite a long time (like the wind)
* applyImpulse is used to apply a short force for a very short period of time (like a projectile), it needs vector3 as a parameter ( the direction of the impulse) its length will be used as the strength 

for rotation we use torque
* addTorque (equivalent of addForce)
* appluTorqueImpluse (equivelant of appluImpulse) 

## Object Setting
we can control many things like:
 1. Gravity: it is set to -9.08 by default 
 2. Resititution (default 0): it controls the bounciness, the floor doesn't have resititution of 1 it's like dropping a bouncing ball on a flat and solid surface aginst dropping the same bouncing ball on a carpet, by default Rapier will take an average of the two restitution it is possible to change that rule, but it has to be done within the collider itself an dnot the RigidBody, we need to access the automatically generated collider or create the collider manually, we would also need to import CoefficientCombineRule from Rapier and choose one of the rules provided in that object
 3. friction (0.7): how much the surfaces rup off each other, by defaqult Rapeir will take advantage of the 2 frictions involved like for the restitution
 4. Mass: the mass of the RigidBody is automatically calculated as the sum of the masses of the colliders that make up the RigidBody, the mass of the colliders is automatically calculated according to their shape and volume, the mass won't change how fast an object falls, but it effects the forces involved, we need create the colliders
 5. Position and Rotation: for dynamic and fixed objects you should not change those values at run time, their purpose is only to set the original position and rotation befaore letting Rapier update the objects to change them we can:
  a. if we need to move it once e can do it with the appropriate methods , but you'll have to reset velociets that are currently applied on it and also make sure to not move it inside another RigidBody
  b. if you need to move it in time (like a carousel or a moving obstacle) you can use the kinematic types
   * kinematicPosition we provide the next position and it'll update the onject velocity accordingly 
   * kinematicVelocity we provide the velocity directly
the kinematic object has two important functions:
 * setNextKinematicTranslation to move the object 
 * setNextKinematicRotation to rotate the object is expecting a Quaterion and not a Euler, Quaterion are harder to express and we can't just write one directly we are going:
  1. Create a Three.js Euler
  2. Create a Three.js Quaternion
  3. Send that Quaterion to setNextKinematicRotation 

## Events
 we can listen to events by adding attributes on the <RigidBody> like:
  1. onCollisionEnter: when the RigidBody hit something
  2. onCollisionExit: when the RigidBody seperates from the object it just hit
  3. onSleep: when the RigidBody starts sleeping
  4. onWake: when the RigidBody stops sleeping

sounds: we need to istantiate the audio, we are going to use useState in order to istantiate the audio onlyy once in case the componenet is beign re-rendered
 