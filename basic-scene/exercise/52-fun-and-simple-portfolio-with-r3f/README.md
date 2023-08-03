# Fun and Simple Portfolio
it is a place to display your projects.

https://twitter.com/0xca0a/status/1398633764931178498

Leva is a very good idea to find the best values 

## Laptop

you can find free models  to use in: 
https://market.pmnd.rs/
https://market.pmnd.rs/model/macbook

to implement the model we have multiple options:
 1. download it and put it in the /public/ folder
 2. use the CDN like 
 3. Download the various R3F version
 4. Download the native Three.js version

## Lights and Environment
we use the Environment helper

## Floationg Animation
we need to center the screen not the laptop 

we can use the Float Helper

we want to display HTML/CSS website on the laptop screen, so we want the laptop to move a slowly

## CAmera and Controls
instead of tweaking the properties of OrbitControls we are going to use a drei helper named PresentationControls

PresentationControls lets you maniplulate the model instaed of the camera, we can rotate that model, and when we release it, it goes back to its initial position, internally it uses Spring a PMNDRS library that makes the animation realistic and pleasent 

by default we can only rotate the object by dragging and dropping right on the model, we want to be able to drag and drop from anywhere, even the background

it also uses use-gesture a library to interact with elements using natural gestures, this library recommends adding the CSS property touch-action to none in order to fix the weird behavior on mobile when swiping

https://use-gesture.netlify.app/
https://use-gesture.netlify.app/docs/extras/#touch-action
 
Spring is used for the animation and we can play with the properties of that spring  

https://react-spring.dev/
https://react-spring.dev/docs/advanced/config#configs

## Shadows
we can use the cintactShadows helper

## iframe
used to add HTML website to the screen of the laptop

https://react-spring.dev/docs/advanced/config#configs

we will add a <iframe>  to the experience, it is like a window that leads to another website, it makes it possible to have websites visible on other websites (website-ception)

if we want the iframe to follow the model to be part of the webGL, Html helper must be used

the iframe needs to be transformed and sized properly 
