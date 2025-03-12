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

// Load a vibrant Earth texture using TextureLoader
const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg');

// Create a material using the Earth texture
const texturedMaterial = new THREE.MeshStandardMaterial({ map: earthTexture });

// --- Step 1 & 2: Create multiple textured cubes ---
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

// --- Step 3: Load a custom 3D model (cow) using OBJLoader ---
// The cow model is loaded from a GitHub repository containing common 3D test models.
const objLoader = new THREE.OBJLoader();
objLoader.load(
  'https://raw.githubusercontent.com/alecjacobson/common-3d-test-models/master/data/cow.obj',
  function (object) {
    // Traverse the loaded object to apply the textured material to each mesh
    object.traverse(function(child) {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshStandardMaterial({ map: earthTexture });
      }
    });
    // Adjust the scale and position of the cow model as needed
    object.scale.set(0.5, 0.5, 0.5);
    object.position.set(0, -1, 0);
    scene.add(object);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    console.error('An error happened', error);
  }
);

// --- Animation Loop ---
function animate() {
  requestAnimationFrame(animate);
  
  // Rotate each cube for a dynamic effect
  cubes.forEach(cube => {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  });
  
  renderer.render(scene, camera);
}
animate();

// Adjust camera and renderer on window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
