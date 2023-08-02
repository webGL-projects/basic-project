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