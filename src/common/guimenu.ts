const State: any = require("stats-js");
const Gui: any = require("dat.gui");

/**
 * @description 初始化
 */
export function initStats(): any {
  let stats = new State();
  return stats;
}

export function initGui(): any {
  let gui = new Gui.GUI();
  return gui;
}
