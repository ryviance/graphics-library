const scene = new THREE.Scene();

const cubeTextureLoader = new THREE.CubeTextureLoader();
cubeTextureLoader.setPath('https://threejs.org/examples/textures/cube/Bridge2/');
const skyboxTexture = cubeTextureLoader.load([
  'posx.jpg', 'negx.jpg', 'posy.jpg',
  'negy.jpg', 'posz.jpg', 'negz.jpg'
]);
scene.background = skyboxTexture;

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 15;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; controls.dampingFactor = 0.05;

const directionalLight = new THREE.DirectionalLight(0x0000ff, 1);
directionalLight.position.set(1,1,1);
scene.add(directionalLight);

const hemisphereLight = new THREE.HemisphereLight(0x00ff00, 0x99ff99, 1);
scene.add(hemisphereLight);

const pointLight = new THREE.PointLight(0xff0000, 1, 100);
pointLight.position.set(5,5,5);
scene.add(pointLight);

const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg');
const texturedMaterial = new THREE.MeshStandardMaterial({ map: earthTexture });

const objLoader = new THREE.OBJLoader();
objLoader.load(
  'https://raw.githubusercontent.com/alecjacobson/common-3d-test-models/master/data/cow.obj',
  object => {
    object.traverse(child => { if(child instanceof THREE.Mesh) child.material = new THREE.MeshStandardMaterial({ map: earthTexture }); });
    object.scale.set(0.5,0.5,0.5);
    object.position.set(-5,-1,0);
    scene.add(object);
  },
  xhr => console.log((xhr.loaded/xhr.total*100)+'% loaded (cow)'),
  error => console.error('Error loading cow model', error)
);

const shapes = [];
for(let i = 0; i < 20; i++){
  const type = Math.floor(Math.random()*3);
  const size = Math.random()*1.5+0.5;
  let geometry;
  if(type === 0) geometry = new THREE.BoxGeometry(size, size, size);
  else if(type === 1) geometry = new THREE.SphereGeometry(size, 16, 16);
  else geometry = new THREE.CylinderGeometry(size, size, size*1.5, 16);
  const mesh = new THREE.Mesh(geometry, texturedMaterial);
  mesh.position.x = (Math.random()-0.5)*30;
  mesh.position.y = (Math.random()-0.5)*30;
  mesh.position.z = (Math.random()-0.5)*30;
  mesh.rotation.x = Math.random()*Math.PI;
  mesh.rotation.y = Math.random()*Math.PI;
  scene.add(mesh);
  shapes.push(mesh);
}

function animate(){
  requestAnimationFrame(animate);
  controls.update();
  shapes.forEach(shape => { shape.rotation.x += 0.005; shape.rotation.y += 0.005; });
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
