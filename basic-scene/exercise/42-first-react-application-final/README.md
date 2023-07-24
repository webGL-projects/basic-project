# React 
The code will be transilled in order to maximise compatibility and react wants to know down to which browsers versions we want our application to work with

https://react-spring.dev/
https://react.dev/learn/tutorial-tic-tac-toe
https://legacy.reactjs.org/community/courses.html

## Vite
to create a project we can use create vite

https://www.npmjs.com/package/create-vite

## JSX
it is tag-based language and it's very similer to HTML

it is not indent-meaning 
 
the render must only contain one element

if you want multiple elements without having one main parent, we can use a fragment (it i container that won't be rendered as a DOM Element)

useState is what we call a “hook”. It’s a function that we call inside the component to do specific tasks related to that component.

for reactive data we use state hook

hooks are functions we call inside the component to do specific tasks related to the component 

https://legacy.reactjs.org/docs/events.html#mouse-events

useState is a sitter function

useEffect it is used to retrieve data, will called every time the component is rendered to solve that we add an empty array of dependencies as an argument for the useEffect 

useEffect( () => {
    dicowdn
}, []) 

useMemo needs a function as the first parameter and an array of dependencies as the second parameter when the comoponent re-render useMemo will be called again 
* if the values in the dependincies array haven't change usememo will return the previous value without calling the function 
* if one pf the values in the deoendenciecs array have changed useMemo will call the function again
 it is used for complex calculations and prevent that calculation from happening on each draw unless it is neccesary 

 useRef is used to access the DOM element

## Local Storage
we have access to an API that lets us save data locally as key and value

it only save strings, so some parsing is in order 

## nullish coalescing operator (??) 
The nullish coalescing (??) operator is a logical operator that returns its right-hand side operand when its left-hand side operand is null or undefined, and otherwise returns its left-hand side operand.

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing

## Props
 props allow components to receive information from their parent, as attributs in the children components 

 ## Cildren props
a special prop, automatically passed to every component, that can be used to render the content included between the opening and closing tags when invoking a component.

## Moving Data Up
we need to have a global variable to acheive that

zurtand is used late inthe chapter 

## Colors
to create a random color in css,we can use the hexadecimal or RGB values  it's even better to use HSL Format HSL is composed of three values


H: Hue an angle that ranges between 0deg and 360deg
 * At 0deg it's red and at 360deg it's red again,but it went through every possible color of the rainbow
 * we can go beyond 360deg and it'll keep looping through allthe colors 

S : saturation an amount of color that goes from 0% to 100% 
* when it's 0% there is no color and we get only gray 
* ehen it's 100% it's saturated and we get vivd colors  

L: Lightness it goes from 0% to 100% 
* when it's 0%, it's black
* when it's 100%, it's white 
* when it's 50%, we get the non-altered color
  

## Ftch from API 
we use JSONPlaceholder 