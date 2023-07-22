# Scroll Based Animation 

It is used in classic websites, it can be in the background to add beauty, but we need it to intergrate properly with the HTML content

## HTML Scroll 
YOU NEED TO REMOVE ANY overflow: hidden in your css

there this issue called elastic scroll (when you scroll too far you get elastic animation, when the page goes beyond the limit) we need to solve it by:

 1. set the background-color of the wpage to the same color as the clearColor

 2. use clearColor transparent and only set the background-color on the page 
 we need to set the alpha property to true 
 add a background color 

 ## Mesh Toon Material
 is a light based material

 https://threejs.org/docs/index.html?q=toon#api/en/materials/MeshToonMaterial

 we need to add griedint texture because it has only two color one in light and one in shadow
 the gradient is a very small images composed of 3 pixels, instead of choosing one of those 3 pixels according to the light, WebGL will try to merge them to solve it we need to use a mapFilter

 in Three.js the feild of view is vertical, if you put one object on the top, one on the bottom and then resize the window, objects will stay at the top and at the bottom, this will help us with positioning 

 ## Permanent Rotation
 it is added to the objects!

 we will add them to sectionMeshes array 

 ## Camera
 we need to retrive the scroll value! and it must be updated whenever the user scrolls!!

 we use the scrollY to update the camera position in the tick function, but the camera updates so fast so sensitive and going in the wrong direction 

 the scrollY is +ve when scrolling down but we need the camera to go down the y axis

 the scrollY contains tthe amount of pixels that have been scrolled, if we scroll 100 pixels, the camera will go down of 100 units in the scene 

 each section has the same size as the viewport, This means that when we scroll the istance of one viewport height, the camera should reach the next object

to do that we need to devide the scrollY by the height of the viewport which is sizes.heigth 

now the camera is going down by 1 unit, but the objectDistance is 4 units so we need to mltiply it by objectDistance

## Position Object Horizontally 

## Parallax
it is the action of seeing one object through different observation points 
This is done naturally by our eyes and it's how we feel the depth of things
so we will apply a parallax by making the camera move horizantly and vertically according to mouse movements

to acheive that we need to retrive the cursor position, by creating a cursor object with x and y properties, we can use those values to move the camera but we need to modify them 

we tnned to normalize the values because the users will have a different

it is better to have the values go from -0.5 to 0.5 tather than 0 to 1

## Easing 
the parallax animation fells a bit too mechanic and it's not realistic 
we are going to add some easing also called 'smoothing' and we are going to use a well-known formula

on each frame instead of moving the camera streight to the target, we are going to move it (let's say) a 10th closed to the distination
Then on the next frame , another 10th closer etc. 

if you test this experience in high frequancy screen, the tick function will be called more often and the camera will move faster toward the target , this not a big issue, but it's not accurate and it's preferable to havethe same result across devices as much as possible

to solve it we need to use the time spent between each frame by caculatin the dalta, dalta will be very small (0..16s for 60FPS screen) 


## Partcles
we use it to make the experience more immersive

BufferGeometry is used be cause we want to place the partcles ourselves

## Triggered Rotations
we need to know when to trigger it,

First we need to know when we reach a section, there are plenty of ways for doing that and we cou;d even use a library, but in our case we can usr the scrollY value

once a new section is identified we will animate to meshes, using GSAP

