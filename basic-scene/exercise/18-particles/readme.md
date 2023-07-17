# Particles 
Particles can be used tio create stars, smoke, rain, dust, fire, etc. 

 you can have thousands of them with a reasonable frame reate each particle is composed of a plane(two triangles) always facing the camera.

 creating particles is like creating a mesh 
  a. a geometry https://threejs.org/docs/#api/en/core/BufferGeometry
  b. a material https://threejs.org/docs/#api/en/materials/PointsMaterial
  c. a points instance (instead of a mesh) https://threejs.org/docs/#api/en/objects/Points

each vertex of the geometry will become a particle 

when instatiating a PointsMaterial we change the size property to control all particles size and the sizeAttenuation to specify if the distant particles should be smaller than close particles