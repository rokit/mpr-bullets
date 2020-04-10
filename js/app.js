import BulletSpawner from './bulletSpawner.js';

let canvas = document.getElementById("renderCanvas"); // Get the canvas element 
let engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
let scene;
let topCam;
let spawner;
let deltaTime;
let divFps = document.getElementById("fps");

async function createScene() {
  scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color4(0.2, 0.2, 0.2, 1);
  topCam = new BABYLON.TargetCamera("topdown", new BABYLON.Vector3(0, 0, -8000), scene, true);
  topCam.rotation = new BABYLON.Vector3(Math.PI / 2, 0, Math.PI);
  topCam.setTarget(BABYLON.Vector3.Zero());
  topCam.fov = 0.3235988;
  scene.activeCamera = topCam;

  spawner = new BulletSpawner(scene);

  let light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
  let light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);
};

async function run() {
  engine.runRenderLoop(() => {
    deltaTime = engine.getDeltaTime() / 1000;
    spawner.tick(deltaTime);
    scene.render();
    divFps.innerHTML = engine.getFps().toFixed() + " fps";
  });
}

export default async function init() {
  await createScene();
  run();
}

// Watch for browser/canvas resize events
window.addEventListener("resize", () => {
  engine.resize();
});
