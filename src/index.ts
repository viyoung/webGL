import * as THREE from "three";
import { WebGLRenderer, PerspectiveCamera, Scene, Camera } from "three";
const State: any = require("stats-js");
const Gui: any = require("dat.gui");

let stats = new State();

//gui控件类
class Controls {
  rotationSpeed = 0;
  bouncingSpeed = 0;
  constructor() {
    this.rotationSpeed = 0.02;
    this.bouncingSpeed = 0.03;
  }
}
let controls = new Controls();
let gui = new Gui.GUI();
gui.add(controls, "rotationSpeed", 0, 0.5);
gui.add(controls, "bouncingSpeed", 0, 0.5);

//初始化一个渲染器

let renderer: WebGLRenderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(new THREE.Color(0xeeeeee, 1.0, 1.0));
renderer.shadowMapEnabled = true;

//初始化一个场景
let scene: Scene = new THREE.Scene();
//初始化一个相机camera

let carema: PerspectiveCamera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  5000
);
carema.position.x = -30;
carema.position.y = 40;
carema.position.z = 30;
carema.lookAt(scene.position);

//定义材质

let axes = new THREE.AxesHelper(20);

let planeGeometry = new THREE.PlaneGeometry(60, 20);
let planeMaterial = new THREE.MeshLambertMaterial({ color: 0xcccccc });
let plan = new THREE.Mesh(planeGeometry, planeMaterial);
plan.rotation.x = -0.5 * Math.PI;
plan.position.x = 15;
plan.position.y = 0;
plan.position.z = 0;
plan.receiveShadow = true;

let cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
let cubMaterial = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  wireframe: false,
});
let cube = new THREE.Mesh(cubeGeometry, cubMaterial);
cube.position.x = -4;
cube.position.y = 3;
cube.position.z = 0;
cube.castShadow = true;

let sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
let sphereMaterial = new THREE.MeshBasicMaterial({
  color: 0x7777ff,
  wireframe: false,
});
let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.x = 20;
sphere.position.y = 4;
sphere.position.z = 2;
sphere.castShadow = true;

//添加光源
let spotLight = new THREE.SpotLight(0xffffff);
spotLight.castShadow = true;
spotLight.position.set(-40, 60, -10);

//将材质、光源等添加到场景中
scene.add(axes);
scene.add(plan);
scene.add(cube);
scene.add(sphere);
scene.add(spotLight);

let step: number = 0;
/**
 * @description 刷新回调函数
 */
function renderScreen() {
  stats.update();
  cube.rotation.x += controls.rotationSpeed;
  cube.rotation.y += controls.rotationSpeed;
  cube.rotation.z += controls.rotationSpeed;
  step += 0.04;
  sphere.position.x = 20 + 10 * Math.cos(step);
  sphere.position.y = 2 + 10 * Math.abs(Math.sin(step));
  requestAnimationFrame(renderScreen);
  renderer.render(scene, carema);
}

/**
 * @description 初始化threejs的刷新率
 */
function initState() {
  stats.setMode(0); //计数fps
  stats.domElement.style.position = "absolute";
  stats.domElement.style.left = "0px";
  stats.domElement.style.top = "0px";
  document.getElementById("Stats-output").appendChild(stats.domElement);
  return false;
}

/**
 * @description 监听窗口变化执行重置
 */
function onResize() {
  carema.aspect = window.innerWidth / this.innerHeight;
  carema.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
/**
 * 启动webGL
 */
function init() {
  window.addEventListener("resize", onResize, false);
  initState();
  let container: Element = document.getElementById("webGLContainer");
  container.appendChild(renderer.domElement);
  renderScreen();
}

init();
