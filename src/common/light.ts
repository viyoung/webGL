//用于添加光源

import * as THREE from "three";
import { SpotLight } from "three";

/**
 * @description 添加光源
 */
export function initSpotLight(): SpotLight {
  //添加光源
  let spotLight: SpotLight = new THREE.SpotLight(0xffffff);
  spotLight.castShadow = true;
  spotLight.position.set(-40, 60, -10);
  return spotLight;
}
