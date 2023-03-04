import * as THREE from 'three';

export interface BlockOptions {
  x: number;
  y?: number;
  z: number;
  width: number;
  height?: number;
  depth: number;
  color?: number | string;
  direction?: BlockDirection;
  isFalling?: boolean;
}

export type BlockDirection = 'x' | 'z' | 'none';

export default class Block {
  x: number;
  y: number;
  z: number;
  width: number;
  height: number;
  depth: number;
  color: THREE.Color;
  direction: BlockDirection;
  scene: THREE.Mesh;
  static height = 0.3;

  constructor(_options: BlockOptions) {
    this.x = _options.x;
    this.y = _options.y || 0;
    this.z = _options.z;
    this.width = _options.width;
    this.height = _options.height || Block.height;
    this.depth = _options.depth;
    this.color = new THREE.Color(_options.color || 0x880000);
    this.direction = _options.direction || 'none';
    const geometry = new THREE.BoxGeometry(this.width, this.height, this.depth);
    const material = new THREE.MeshLambertMaterial({ color: this.color });
    this.scene = new THREE.Mesh(geometry, material);
    this.scene.position.set(this.x, this.y, this.z);
  }
}
