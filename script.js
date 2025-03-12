// Create the scene
const scene = new THREE.Scene();

// Set up a perspective camera: fov, aspect, near, far
const camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth / window.innerHeight, 
  0.1, 
  1000
);
camera.position.z = 5;

// Create the WebGL renderer and append its canvas to the document
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add a directional light to the scene
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// Load a more colorful texture using TextureLoader
const textureLoader = new THREE.TextureLoader();
// Using a vibrant Earth texture from the Three.js examples
const earthTexture = textureLoader.load('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg');

// Create a standard material using the loaded Earth texture
const texturedMaterial = new THREE.MeshStandardMaterial({ map: earthTexture });

// Create multiple textured cubes using the Earth texture on all faces
const cubes = [];
const geometry = new THREE.BoxGeometry();

// Create 5 cubes at random positions
for (let i = 0; i < 5; i++) {
  const cube = new THREE.Mesh(geometry, texturedMaterial);
  cube.position.x = (Math.random() - 0.5) * 10;
  cube.position.y = (Math.random() - 0.5) * 10;
  cube.position.z = (Math.random() - 0.5) * 10;
  cubes.push(cube);
  scene.add(cube);
}

// Animation loop to update cube rotations and render the scene
function animate() {
  requestAnimationFrame(animate);
  
  cubes.forEach(cube => {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  });
  
  renderer.render(scene, camera);
}
animate();

// Adjust camera and renderer when the window is resized
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

/* 
// --- Alternative: Mapping 6 Different Textures onto a Cube ---
// Uncomment the following section and comment out the single-texture approach above
// to apply a different texture on each face of the cube.

// const faceTextures = [
//   textureLoader.load('path/to/texture1.jpg'),
//   textureLoader.load('path/to/texture2.jpg'),
//   textureLoader.load('path/to/texture3.jpg'),
//   textureLoader.load('path/to/texture4.jpg'),
//   textureLoader.load('path/to/texture5.jpg'),
//   textureLoader.load('path/to/texture6.jpg')
// ];
//
// // Create an array of materials corresponding to each face
// const materials = faceTextures.map(texture => new THREE.MeshStandardMaterial({ map: texture }));
//
// // When constructing the mesh, pass the array of materials
// const cubeWithDifferentFaces = new THREE.Mesh(geometry, materials);
// scene.add(cubeWithDifferentFaces);
*/
