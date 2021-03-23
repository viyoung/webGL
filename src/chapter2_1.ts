import * as THREE from "three";
import { WebGLRenderer, PerspectiveCamera, Scene } from "three";
import { initRanderer } from "./common/render";
import { initScene } from "./common/scene";
import { initPerspectiveCamera } from "./common/camera";
import { initSpotLight } from "./common/light";
import { initStats, initGui } from "./common/guimenu";

//初始化guimen菜单的状态
let stats = initStats();
//初始化gui
let gui = initGui();

//初始化一个渲染器
let renderer: WebGLRenderer = initRanderer();

//初始化一个场景
let scene: Scene = initScene();

//初始化一个相机camera
let camera: PerspectiveCamera = initPerspectiveCamera();
camera.lookAt(scene.position);

//添加光源
let spotLight = initSpotLight();

//定义材质(地板背景)
let planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
let planeMaterial = new THREE.MeshLambertMaterial({ color: 0xcccccc });
let plan = new THREE.Mesh(planeGeometry, planeMaterial);
plan.rotation.x = -0.5 * Math.PI;
plan.position.x = 15;
plan.position.y = 0;
plan.position.z = 0;
plan.receiveShadow = true;

//将材质、光源等添加到场景中
scene.add(plan);
scene.add(spotLight);

let step: number = 0;

//gui控件类(就是手动调整速率的)
class Controls {
  rotationSpeed = 0;
  bouncingSpeed = 0;
  numberOfObjects = 0;
  constructor() {
    this.rotationSpeed = 0.02;
    this.bouncingSpeed = 0.03;
  }
  addCube() {
    //使用控件添加正方体
    let cubsSize = Math.ceil(Math.random() * 3);
    let cubeGeometry = new THREE.BoxGeometry(cubsSize, cubsSize, cubsSize);
    let cubeMaterial = new THREE.MeshLambertMaterial({
      color: Math.random() * 0xffffff,
    });
    let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;
    cube.name = `cube-${scene.children.length}`;
    cube.position.x =
      -30 + Math.round(Math.random() * planeGeometry.parameters.width);
    cube.position.y = Math.round(Math.random() * 5);
    cube.position.z =
      -20 + Math.round(Math.random() * planeGeometry.parameters.height);
    scene.add(cube);
    this.numberOfObjects = scene.children.length - 2;
  }
  //使用控件删除正方体
  removeCube() {
    let allChildren = scene.children;
    let lastObject = allChildren[allChildren.length - 1];
    if (lastObject instanceof THREE.Mesh) {
      scene.remove(lastObject);
      this.numberOfObjects = scene.children.length - 2;
      console.log(lastObject.name);
    }
  }
  outputObjects() {
    console.log(scene.children);
  }
}
let controls = new Controls();
gui.add(controls, "rotationSpeed", 0, 0.5);
gui.add(controls, "bouncingSpeed", 0, 0.5);
gui.add(controls, "addCube");
gui.add(controls, "removeCube");
gui.add(controls, "outputObjects");
gui.add(controls, "numberOfObjects").listen();
/**
 * @description 刷新回调函数
 */
function renderScreen() {
  stats.update();
  requestAnimationFrame(renderScreen);
  renderer.render(scene, camera);
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
  camera.aspect = window.innerWidth / this.innerHeight;
  camera.updateProjectionMatrix();
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
