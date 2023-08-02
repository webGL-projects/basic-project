# Mouse Events
it is more of a pointer event

## Listening to Click Events
Raycaster was needed which ast rays (sometimes on each frame and tested intersecting objects that we had to put it in arrays)

in R3F raycaster is not needed!!

all we need to do is add aonClick Attribute to an object in our scene (like a <mesh>) and provide it a function

## Event Information
we can access event-related information by adding an argument to the function 

event is an ibject that coontains many properties and methods

console.log('---')
console.log('distance', event.distance) // Distance between camera and hit point
console.log('point', event.point) // Hit point coordinates (in 3D)
console.log('uv', event.uv) // UV coordinates on the geometry (in 2D)
console.log('object', event.object) // The object that triggered the event
console.log('eventObject', event.eventObject) // The object that was listening to the event (useful where there is objects in objects)

console.log('---')
console.log('x', event.x) // 2D screen coordinates of the pointer
console.log('y', event.y) // 2D screen coordinates of the pointer

console.log('---')
console.log('shiftKey', event.shiftKey) // If the SHIFT key was pressed
console.log('ctrlKey', event.ctrlKey) // If the CTRL key was pressed
console.log('metaKey', event.metaKey) // If the COMMAND key was pressed

the click event is more complex that it looks, a click implies that the pointer went down onto the object and then up agian while remaining on the object if it started outside or ended outside the event doesn't count as a click

## Other Events
there are more than the onClick event handeler

1. onContextMenu: it is for
 * when the contex menu should appear
 * on a destop, with a RIGHT CLICK or CTRL + LEFT CLICK 
 * on a mobile by pressing down for some time

2. onDoubleClick: 
 * when we double click/tap on the same object
 * the delay between the first and second click/tap is defined by the OS

3. onPointerUp:
 * when we release the click (left or right) or touch

4. onPointerDown:
 * whaen we've just clicked or put out finger down

5. onPointerOver and onPointerEnter: 
 * when the cursor or finger just went above the object

6. onPointerOut and onPointerLeave:
 * when the cursor or finger just went out from the object

7. onPointerMove: 
 * on each frame if the cursor has moved since the last frame, while above the object

8. onPointerMissed:
* When there's no longer any activity in the scene after having received PointerEvents the user clicks outside of the object, we can add it to the canvas

so when to use them, let's take an RTS game as an example (Age of Empire or starCraft)
 * when the player clicks on a unit, you want to select it
 * when the user drags and drops you want to draw a rectangle and when it releases you want to select all units inside the rectangle
 * when the user clicks again but the shift key you want to add to the currently selected units or remove them if they were already selected
 * when the user clicks but there is no hit you want to deselect every unit

 ## Occluding
  by default the raycaster doesn't care about what's in front of the object beign tested 

  https://threejs.org/docs/?q=raycas#api/en/core/Raycaster

  there is a way to 'occlude' the cube, we are going to listen to the onClick event on the sphere too and tell it to stop propagating the event 

  when we click, Three.js and R3F will order all objects which intersect by distance to the camera (from the closest to the furthest) if one of the intersecting objects asks to stop the propgation, the next objects won't trigger the event 

  ## Cursor
  to help the use know if the object is clickable, we need to transform the cursor to a pointer 

  so we need to know when the mouse enters and leaves the cube 

  but there is a helper called useCursor, which do almost the same as we did here

  ## Events onComplex Objects
since <primitive> is a simple placeholder of the actual object, we can listen to events on it as if it were any other object

the eventlistner is called multiple times because the ray is going through multiple objects at once, even though we listen to the event on the parent, R3f will test the meshes inside 

## Performance 
listening to pointer events is quite taxing task for the CPU keep an eye on performance (especially on low-end devices) and opimise as you can 

there are general optimisation to do:
 1. avoid events that need to be tested on each frame like: 
  * onPointerOver
  * onPointerEnter
  * onPointerOut
  * onPointerLeave
  * onPointerMove

2. Minimise the number of objects that listen to events and avoid testing complex geometries, if you notice a freeze, even a short one when interacting, you'll need to have some more optimisation to do

3. meshNounds helper: it will create a theoretical sphere around the mesh (called bounding sphere) and the pointer event will be tested on that sphere insteead of testing the geometry of the mesh, it only works on a single meshes which is why we can't use it on the hamburger since it's composed of multiple meshes 

4. BVH: if you have complex geometries and still need the pointer events to be accrate, you can also use the BVH (Bounding Volume Hierarchy), it has the useBVH helper