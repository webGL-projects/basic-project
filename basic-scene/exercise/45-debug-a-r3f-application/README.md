# Debug a R3F Application 

## Strict Mode 
we haven't used it yet for the sake of simplification , but it's a must use

Strict Mode will warn you about potential problems in the app
1. unused import
2. infinite render loop 
3. forgotten useEffect dependencies 
4. deprecated practicies

After importting strictMode and wrapping the application with it it will show potential errors in the terminal and in the console

StrictMOde will be ignored once the application is built

## Browser Extension
React Developer Tools is the most famouse one, it helps us to check and modify our components live

 it is available for both 
 1. Chrome: 
 https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en

 2. FireFox: 
 https://addons.mozilla.org/en-US/firefox/addon/react-devtools/

 in the components tab in the console, we can play with the props and states of the components

 ## Debug UI with Leva
 we can use lil-gui, TweakPane, control-panel or guify to create a debug UI

 https://github.com/georgealways/lil-gui
 https://github.com/cocopon/tweakpane
 https://github.com/freeman-lab/control-panel
 https://github.com/colejd/guify

 Leva is provided by react, but it's still under development so it may change in the future

 https://github.com/pmndrs/leva
 https://codesandbox.io/examples/package/leva
 https://github.com/pmndrs/leva/issues/358#issuecomment-1178922851

tweaking a value will result in the component re-rendering and it's OK 

we can destruct the values and add them ass attributs to a specific mesh

we can have a reange instead of writing the values, we can send an object with specific properties to the positin of the useControls

Vector tweaks: instead of adding a second range tweak, we are going to use Vector 2 tweak 

in 2D we get a Joystick to control the object, in 3D we don't

in the joystick the y axis is inverted, we solve it using joystick: "invertY"

the joysrick has a limited range, but sticking the cursor ot the edges will allow the value ro go beyond the initial range

we can change color by sending a string that looks like a color, but we can use various color formats
* 'rgb(255, 0 ,0)'
* 'orange'
* 'hsl(100deg, 100%, 50%)'
* 'hsla(100deg, 100%, 50%, 0.5)'
* {r: 200, g: 106, b: 125, a: 0.4}

the alpha channel won't work when expressing colors like this because three.js handles alpha with the opacity and transparent properties

we can add Booleans, like adding a visible property to the useControl and destructure it

interval it allows us to set an interval which is like  range but with two cursors (not used)

Buuton we can create a button that will call a function once clicked, a button must be imported from leva

Select we can create a select input by setting an array on the options property

Folders  we can group tweaks in a folder to orginize everything, to create another folder we need to call the useControls with a different name, you can create a folder inside a folder

configuration
https://github.com/pmndrs/leva/blob/main/docs/configuration.md

we can't add it to the Experience component, because everything inside the canvas is intended for R3F, we can add lots of attributes like collapsed



