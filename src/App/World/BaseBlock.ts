import * as THREE from 'three';
import Block from './Block';

export default class BaseBlock {
  scene: THREE.Group;
  baseBlock1: Block;
  baseBlock2: Block;

  constructor() {
    this.scene = new THREE.Group();
    this.baseBlock1 = new Block({ x: 0, z: 0, width: 3, height: 2, depth: 3 });
    this.scene.add(this.baseBlock1.scene);

    this.baseBlock2 = new Block({
      x: 0,
      y: 2,
      z: 0,
      width: 3,
      depth: 3,
      color: `hsl(${30 + 4}, 100%, 50%)`,
    });
    this.scene.add(this.baseBlock2.scene);
  }
}
