import * as THREE from 'three';
import { GUI } from 'lil-gui';

export default class Light {
  debug: GUI;
  container: THREE.Object3D<THREE.Event>;
  ambientLight!: THREE.AmbientLight;
  directionalLight!: THREE.DirectionalLight;

  constructor(_option: { debug: GUI }) {
    this.debug = _option.debug;

    this.container = new THREE.Object3D();
    this.container.matrixAutoUpdate = false;

    this.setInstance();
  }

  setInstance() {
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0);
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 0);

    this.container.add(this.ambientLight);
    this.container.add(this.directionalLight);
  }
}
