//初始化一个渲染器

import * as THREE from "three";
import { WebGLRenderer } from "three";

/**
 * @description 初始化一个场景
 * @returns 场景对象
 */
export function initRanderer(): WebGLRenderer {
  let renderer: WebGLRenderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(new THREE.Color(0xeeeeee, 1.0, 1.0));
  renderer.shadowMapEnabled = true;
  return renderer;
}
