# Galaxy Generator
we will give the user the ability to create their own glalaxy using the debug ui

when using debug UI the previous galaxies are not destroyed

to solve it we need to move the geometry, material and points variables outside the generateGalaxy

before assigning those variables, we can test if they already exist and use the dispose() method to destroy the geometry and the material properly then remove the points from the scene with remove()

we need to position the vertices in a straight line starting from the center and going as far as the radius 

## Color

https://threejs.org/docs/index.html#api/en/math/Color

we can mix colors by cloning the colorInside and use the lerp() method to mix with the colorOutside