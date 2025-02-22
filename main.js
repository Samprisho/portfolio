import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { color, deltaTime } from "three/src/nodes/TSL.js";

import * as OIMO from "oimo";

import WebGL from "three/addons/capabilities/WebGL.js";
import { degToRad } from "three/src/math/MathUtils.js";

var world = new OIMO.World({
  timestep: 1 / 60,
  iterations: 8,
  broadphase: 2, // 1 brute force, 2 sweep and prune, 3 volume tree
  worldscale: 1, // scale full world
  random: true, // randomize sample
  info: false, // calculate statistic or not
  gravity: [0, -9.8, 0],
});

var body = world.add({
  type: "sphere", // type of shape : sphere, box, cylinder
  size: [1, 1, 1], // size of shape
  pos: [0, 5, 0], // start position in degree
  rot: [0, 0, 90], // start rotation in degree
  move: true, // dynamic or statique
  density: 1,
  friction: 0.2,
  restitution: 0.2,
  belongsTo: 1, // The bits of the collision groups to which the shape belongs.
  collidesWith: 0xffffffff, // The bits of the collision groups with which the shape collides.
});

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  90,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight();
const geometry = new THREE.BoxGeometry(1, 1, 1, 1);
const material = new THREE.MeshToonMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
scene.add(light);

const ballGeo = new THREE.SphereGeometry();
const ballMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const ball = new THREE.Mesh(ballGeo, ballMat);
scene.add(ball);

camera.position.z = 5;
camera.position.y = 10;

camera.rotation.set(degToRad(-50), 0, 0);

cube.scale.set(20, 1, 20);

ball.position.y = 2;

function animate() {
  world.step();
  ball.position.copy(body.getPosition());
  ball.quaternion.copy(body.getQuaternion());
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
