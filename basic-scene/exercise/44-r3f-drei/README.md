# Drei 
scenes are going to get even simplier

Because react has the ability to make things reusable, R3F took advantage of that and developers created many components called helpers

 some examples are:
 1. Camera Controls
 2. Complex Geometries
 3. Post-Processing
 4. HTML Implementation
 5. Loaders
 6. Environment Settings
 7. Complex Calculations

some of them will be implemented as components <theHelper> and some as hooks (useHelper) most of them are regrouped in drei (Three in German)

https://github.com/pmndrs/drei
https://drei.pmnd.rs/?path=/docs/abstractions-screenspace--docs

drei are helpers used to mkae life easier 

drei is part of the @react-three scope

OrbitControls is set with enabledDamping which make the animation smoother and we don't have to ask it to update itself on each frame

TransformControls add a gimzo that allows the user to transform (position, rotation or sacle) the object, we need to wrap the mesh with it (The gimzo is in the center by default) (object inside an object) 

to fix the issue we can:
1. move the position attribute to the TransformControls
2. seperate them using a reference and an attribute: thos solution makes the mesh independent from <TransformControls> (we deactivate <TransformControls> without side effects)

OrbitControls conflict: to solve it we can add makeDefault to the <orbitControls>

Modes: it is set as translate by default, but we can change it to rotate or scale with the mode attribute 