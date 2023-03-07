import * as THREE from 'three';

import Materials from './Materials';
import Controls from './Controls';
import Torus from './Torus';
import Plane from './Plane';
import Fox from './Fox';
import Transition from './Transition';
import Time from '../Utils/Time';
import Sizes from '../Utils/Sizes';
import { GUI } from 'lil-gui';
import Light from '../Light';
import Camera from '../Camera';
import Resources from '../Resources';
import BaseBlock from './BaseBlock';
import Block from './Block';

export default class World {
  time: Time;
  sizes: Sizes;
  debug: GUI;
  light: Light;
  camera: Camera;
  resources: Resources;
  renderer: THREE.Renderer;
  scene: THREE.Object3D<THREE.Event>;
  debugFolder?: GUI;
  transition!: Transition;
  controls!: Controls;
  material!: Materials;
  stack!: Block[];
  torus!: Torus;
  plane!: Plane;
  fox!: Fox;

  constructor(_option: {
    time: Time;
    sizes: Sizes;
    debug: GUI;
    light: Light;
    camera: Camera;
    renderer: THREE.WebGLRenderer;
    resources: Resources;
  }) {
    this.time = _option.time;
    this.sizes = _option.sizes;
    this.debug = _option.debug;
    this.light = _option.light;
    this.camera = _option.camera;
    this.renderer = _option.renderer;
    this.resources = _option.resources;

    if (this.debug) {
      this.debugFolder = this.debug.addFolder('world');
      this.debugFolder.open();
    }

    this.scene = new THREE.Group();
    // this.scene.matrixAutoUpdate = false;

    this.setStartingScreen();
  }

  setStartingScreen() {
    this.resources.on('progess', (percent: number) => console.log(`progress ${percent}/100`));
    this.resources.on('ready', () => this.start());

    const { loaded, toLoad } = this.resources.loader;
    if (loaded === toLoad) this.start();
  }

  async start() {
    this.setControls();
    this.setMaterial();
    // this.setTorus();
    // this.setPlane();
    // this.setFox();
    this.setStack();
    this.setTransition();

    await this.transition.firstTransition();
  }

  setControls() {
    this.controls = new Controls({
      time: this.time,
      sizes: this.sizes,
    });
  }

  setMaterial() {
    this.material = new Materials({
      resources: this.resources,
    });
  }

  setTorus() {
    this.torus = new Torus({
      material: this.material,
      debug: this.debugFolder,
    });
    this.scene.add(this.torus.scene);
  }

  setPlane() {
    this.plane = new Plane({
      material: this.material,
      time: this.time,
      debug: this.debugFolder,
    });
    this.scene.add(this.plane.scene);
  }

  setFox() {
    this.fox = new Fox({
      resources: this.resources,
      time: this.time,
      debug: this.debugFolder,
    });
    this.scene.add(this.fox.scene);
  }

  setStack() {
    const base = new BaseBlock();
    this.stack = [];
    this.stack.push(base.baseBlock1);
    this.stack.push(base.baseBlock2);
    this.scene.add(base.scene);
  }

  setTransition() {
    this.transition = new Transition({
      light: this.light,
      world: this,
    });
  }
}
