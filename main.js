import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';


//Initialize the scene
const scene = new THREE.Scene();


//Add objects to the scene
const cubeGeometry = new THREE.BoxGeometry(1,1,1);

//this geometry made for sphere
const sphereGeometry = new THREE.SphereGeometry(.5,25,25)
const cubeMaterial = new THREE.MeshBasicMaterial({color:"green"});
const sphereMaterial = new THREE.MeshBasicMaterial({color:"blue"});
// const cubeMaterial2 = new THREE.MeshBasicMaterial({color:"yellow"}); //Commented because using lambertMaterial
// adding LambertMaterial
const cubeMaterial2 =new THREE.MeshLambertMaterial({color:"red"});

// Adding transparent to sphere
sphereMaterial.transparent=true;
sphereMaterial.opacity=0.5;

// created 3 cubes with same Geomatry and different Material

const cubeMesh = new THREE.Mesh(cubeGeometry,cubeMaterial);
const sphereMesh = new THREE.Mesh(sphereGeometry,sphereMaterial);
const cubeMesh2 = new THREE.Mesh(cubeGeometry,cubeMaterial2);

// now we are positoning the mesh

cubeMesh.position.x=0;
sphereMesh.position.x=2;
cubeMesh2.position.x=-2;

cubeMesh2.rotation.x=1;

// created group for the scene

const groupMesh = new THREE.Group();
groupMesh.add(cubeMesh);
groupMesh.add(sphereMesh);
groupMesh.add(cubeMesh2);



 //Adding fog to scene
//  const fog =new THREE.Fog(0xffffff,1,10);
//  scene.fog=fog;

scene.background= new THREE.Color(0x000000);


// scene.add(cubeMesh) because now we are adding group of mesh 

// scene.add(groupMesh);

scene.add(cubeMesh);
scene.add(sphereMesh);
scene.add(cubeMesh2)
// Adding Lighting for scene

const light=new THREE.AmbientLight(0xffffff,0.5);
scene.add(light);

const pointLight = new THREE.PointLight(0xffffff,1);
pointLight.position.set(-5,-1,1)
scene.add(pointLight);


// cubeMesh.position.y=1;
// cubeMesh.position.x=1;
// cubeMesh.scale.set(1.5,0.5,0.2)

// const axesHelper=new THREE.AxesHelper(2);
// scene.add(axesHelper);
//initialize the camera

 const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth/window.innerHeight,
  0.1,
  200
)

// const aspectRatio = window.innerWidth/ window.innerHeight

// const camera = new THREE.OrthographicCamera(
//   -1*aspectRatio,1*aspectRatio,1,-1,0.1,200
// )

camera.position.z=5

//initialize the renderer

const canvas = document.querySelector('canvas.threejs')
const renderer =new THREE.WebGLRenderer({
  canvas: canvas,
  antialias:true
})
renderer.setSize(window.innerWidth,window.innerHeight)
const maxPixelRatio =Math.min(window.devicePixelRatio,2);
renderer.setPixelRatio(maxPixelRatio)

// add resize addEventListener
window.addEventListener('resize',() =>{
  
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight)
})

//initilaize the control

const controls = new OrbitControls(camera,canvas);
controls.enableDamping=true;
controls.autoRotate=false;

// initilize the clock for rotation
const clock = new THREE.Clock();
let previousTime=0;

const renderloop=() =>{
// looping currunt time
const currentTime = clock.getElapsedTime();
// delta used to find Time gap between currunt time and previous time
const delta = currentTime - previousTime;
previousTime=currentTime;
//  rotate cubeMesh2
cubeMesh2.rotation.y += THREE.MathUtils.degToRad(1)*delta*10;

//scale cubeMesh
cubeMesh.scale.y = (Math.sin(currentTime)) * 0.3+1;

  controls.update();
  renderer.render(scene,camera);
  window.requestAnimationFrame(renderloop);
}
renderloop();



 