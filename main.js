import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';


//Initialize the scene
const scene = new THREE.Scene();


//Add objects to the scene
const cubeGeometry = new THREE.BoxGeometry(1,1,1);
const cubeMaterial = new THREE.MeshBasicMaterial({color:"red"});
const cubeMaterial2 = new THREE.MeshBasicMaterial({color:"blue"});
const cubeMaterial3 = new THREE.MeshBasicMaterial({color:"yellow"});

// created 3 cubes with same Geomatry and different Material

const cubeMesh = new THREE.Mesh(cubeGeometry,cubeMaterial);
const cubeMesh2 = new THREE.Mesh(cubeGeometry,cubeMaterial2);
const cubeMesh3 = new THREE.Mesh(cubeGeometry,cubeMaterial3);

// now we are positoning the mesh

cubeMesh.position.x=0;
cubeMesh2.position.x=2;
cubeMesh3.position.x=-2;

// created group for the scene

const groupMesh = new THREE.Group();
groupMesh.add(cubeMesh);
groupMesh.add(cubeMesh2);
groupMesh.add(cubeMesh3);

// scene.add(cubeMesh) because now we are adding group of mesh 

scene.add(groupMesh);

// cubeMesh.position.y=1;
// cubeMesh.position.x=1;
// cubeMesh.scale.set(1.5,0.5,0.2)

const axesHelper=new THREE.AxesHelper(2);
scene.add(axesHelper);
//initialize the camera

 const camera = new THREE.PerspectiveCamera(
  35,
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

const controls = new OrbitControls(camera,canvas)
controls.enableDamping=true
controls.autoRotate=false

const renderloop=() =>{
  controls.update()
  renderer.render(scene,camera)
  window.requestAnimationFrame(renderloop)
}
renderloop()



 