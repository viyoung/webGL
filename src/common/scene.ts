//初始化一个场景

import * as THREE from "three";
import { Scene } from "three";

/**
 * @description 初始化一个场景基本方法
 */
export function initScene(): Scene {
  //初始化一个场景
  let scene: Scene = new THREE.Scene();
  //添加雾化效果
  scene.fog = new THREE.Fog(0xffffff, 0.015, 100);
  //设置全局场景中物体材质
  // scene.overrideMaterial = new THREE.MeshLambertMaterial({
  //   color: 0xffffff,
  // });
  return scene;
}
