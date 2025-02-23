import * as THREE from "three";
import {phy} from "phy-engine";
import { rand } from "three/tsl";
import { randFloat } from "three/src/math/MathUtils.js";

window.addEventListener("load", () => {
  document.getElementById("sphere").addEventListener("click", drop_sphere);
  document.getElementById("box").addEventListener("click", drop_box);
  console.log("Ready")
});

function drop_sphere() {
  console.log("Dropped sphere");
  phy.add({
    type: "sphere",
    density: 2,
    size: [2, 2, 2],
    pos: [randFloat(-1, 1), 10, randFloat(-1, 1)],
    visible: true,
  });
}

function drop_box() {
  console.log("Dropped box");
    phy.add({
      type: "box",
      density: 2,
      size: [2, 2, 2],
      pos: [randFloat(-1, 1), 10, randFloat(-1, 1)],
      visible: true,
    });
}
