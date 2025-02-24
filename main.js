import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { color, deltaTime } from "three/src/nodes/TSL.js";

import WebGL from "three/addons/capabilities/WebGL.js";
import { degToRad } from "three/src/math/MathUtils.js";
import { exp } from "three/tsl";

import { phy, math } from "phy-engine";

export const scene = new THREE.Scene();
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
scene.add(light);

camera.position.z = 5;
camera.position.y = 10;

camera.rotation.set(degToRad(-50), 0, 0);

function animate(stamp = 0) {
  phy.doStep(stamp); // only need for non worker version
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

phy.init({
  type: "HAVOK",
  worker: false,
  compact: true,
  scene: scene,
  renderer: renderer,
  callback: physicsReady,
});

function physicsReady() {
  phy.set({ substep: 1, gravity: [0, -9.81, 0], fps: 60 });
  phy.add({
    type: "plane",
    size: [300, 1, 300],
    visible: true,
  });
  phy.add({
    type: "sphere",
    density: 2,
    size: [2, 2, 2],
    pos: [0, 10, 0],
    visible: true,
  });
}
