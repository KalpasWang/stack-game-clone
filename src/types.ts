import * as THREE from 'three';
import CANNON from 'cannon';

// export class Block {
//   mesh: THREE.Mesh;
//   body: CANNON.Body;
//   width: number;
//   depth: number;
//   direction: BlockDirection;

//   constructor(options: BlockOptions) {}
// }
export interface Block {
  threejs: THREE.Mesh;
  cannonjs: CANNON.Body;
  width: number;
  depth: number;
  direction: BlockDirection;
}

export interface BlockOptions {
  x: number;
  z: number;
  width: number;
  depth: number;
  direction: BlockDirection;
  isFalling?: boolean;
}

export type BlockDirection = 'x' | 'z' | 'none';
