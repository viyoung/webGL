//初始化相机

import * as THREE from "three";
import { PerspectiveCamera, Camera } from "three";
/**
 * @description 初始化一个透视相机
 */
export function initPerspectiveCamera(): PerspectiveCamera {
  let camera: PerspectiveCamera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    5000
  );
  camera.position.x = -30;
  camera.position.y = 40;
  camera.position.z = 30;
  return camera;
}
