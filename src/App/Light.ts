import * as THREE from 'three';
import { GUI } from 'lil-gui';

export default class Light {
  debug: GUI;
  scene: THREE.Object3D<THREE.Event>;
  ambientLight!: THREE.AmbientLight;
  directionalLight!: THREE.DirectionalLight;

  constructor(_option: { debug: GUI }) {
    this.debug = _option.debug;

    this.scene = new THREE.Object3D();
    this.scene.matrixAutoUpdate = false;

    this.setInstance();
  }

  setInstance() {
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0);
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 0);

    this.scene.add(this.ambientLight);
    this.scene.add(this.directionalLight);
  }
}
