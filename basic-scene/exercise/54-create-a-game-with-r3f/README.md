# Create a game!!
when creating a game a debugUI and performance monitiring is a must

## Level
The game relaies heavly on physics and we are going to use Rapier

## optimization 
it is very important when creating a game

## Player
we want to create a player, which can be interacted with the keyboard

In the latest version of @react-three/rapier and rapier, a RigidBody falls asleep after a few seconds of inaction.

This would result in the sphere not moving even though the player presses the arrow keys.

To fix it, set the canSleep attribute to false on the <RigidBody>

we want to use the arrows and thw WASD keys and the marble to jump when pressing the space bar

to acheive that we use the keyboardControls helper

in the KEybooardControls in the map array we need to provide each key that we want to observe as an object with a name and the list of keys that should trigger the changes as another array

we are using keyW for example not w, because only the w refers to the character not the position of the key

for QWERTY keyboard w and keyw would result in the same result

to apply forces when the key is pressed we need to use useFrame 

the useFrame hook returns an array of two things:
 * A function to subscribe to key changes (useful to know when the jump key has been pressed)
 * A function to get the current states of the keys (useful to know if the WASD keys are beign pressed)

  before applying 