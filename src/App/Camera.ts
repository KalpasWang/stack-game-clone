import * as THREE from 'three';
import { GUI } from 'lil-gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Sizes from './Utils/Sizes';
import Time from './Utils/Time';

export default class Camera {
  time: Time;
  sizes: Sizes;
  width!: number;
  height!: number;
  debug: GUI;
  renderer: THREE.Renderer;
  scene: THREE.Object3D<THREE.Event>;
  instance!: THREE.OrthographicCamera;
  orbitControls!: OrbitControls;

  constructor(_option: { time: Time; sizes: Sizes; debug: GUI; renderer: THREE.Renderer }) {
    this.time = _option.time;
    this.sizes = _option.sizes;
    this.debug = _option.debug;
    this.renderer = _option.renderer;

    this.scene = new THREE.Object3D();
    this.scene.matrixAutoUpdate = false;

    this.setInstance();
    this.setOrbitControls();
  }

  setInstance() {
    // const { width, height } = this.sizes.viewport;
    // this.instance = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
    this.width = 10;
    this.height = this.width / this.sizes.aspectRatio;
    this.instance = new THREE.OrthographicCamera(
      this.width / -2,
      this.width / 2,
      this.height / 2,
      this.height / -2,
      0.1,
      100,
    );
    this.instance.position.set(4, 4, 4);
    this.instance.lookAt(0, 0, 0);
    this.scene.add(this.instance);

    this.sizes.on('resize', () => {
      // const { width, height } = this.sizes.viewport;
      // this.instance.aspect = width / height;
      this.instance.updateProjectionMatrix();
    });
  }

  setOrbitControls() {
    this.orbitControls = new OrbitControls(this.instance, this.renderer.domElement);
    this.orbitControls.enableDamping = true;

    this.time.on('tick', () => this.orbitControls.update());
  }
}
