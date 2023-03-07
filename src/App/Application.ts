import * as THREE from 'three';
import { GUI } from 'lil-gui';

import Time from './Utils/Time';
import Sizes from './Utils/Sizes';

import Resources from './Resources';
import Camera from './Camera';
import Light from './Light';
import World from './World';

export default class Application {
  $canvas: HTMLCanvasElement;
  $menu: HTMLElement;
  time: Time;
  sizes: Sizes;
  resources: Resources;
  config!: {
    debug?: boolean;
  };
  debug!: GUI;
  scene!: THREE.Scene;
  renderer!: THREE.WebGLRenderer;
  camera!: Camera;
  light!: Light;
  axes!: THREE.AxesHelper;
  world!: World;

  constructor(_options: { $canvas: HTMLCanvasElement; $menu: HTMLElement }) {
    this.$canvas = _options.$canvas;
    this.$menu = _options.$menu;

    this.time = new Time();
    this.sizes = new Sizes();
    this.resources = new Resources();

    this.setConfig();
    this.setDebug();
    this.setRenderer();
    this.setCamera();
    this.setLight();
    this.setAxis();
    this.setWorld();
    this.$menu.addEventListener('click', this.startGame.bind(this));
  }

  setConfig() {
    this.config = {};
    this.config.debug = window.location.hash === '#debug';
  }

  setDebug() {
    if (this.config.debug) {
      this.debug = new GUI({ width: 300 });
    }
  }

  setRenderer() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x999999);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.$canvas,
      antialias: true,
    });

    const { width, height } = this.sizes.viewport;
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.outputEncoding = THREE.sRGBEncoding;

    this.sizes.on('resize', () => {
      const { width, height } = this.sizes.viewport;
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(window.devicePixelRatio);
    });
  }

  setCamera() {
    this.camera = new Camera({
      time: this.time,
      sizes: this.sizes,
      debug: this.debug,
      renderer: this.renderer,
    });

    this.scene.add(this.camera.scene);

    this.time.on('tick', () => {
      this.renderer.render(this.scene, this.camera.instance);
    });
  }

  setLight() {
    this.light = new Light({
      debug: this.debug,
    });
    this.scene.add(this.light.scene);
  }

  setAxis() {
    this.axes = new THREE.AxesHelper(5);
    this.scene.add(this.axes);
  }

  setWorld() {
    this.world = new World({
      time: this.time,
      sizes: this.sizes,
      debug: this.debug,
      light: this.light,
      camera: this.camera,
      renderer: this.renderer,
      resources: this.resources,
    });
    this.world.scene.position.setY(-3);
    this.scene.add(this.world.scene);
  }

  startGame() {
    this.$menu.style.opacity = '0';
    this.$menu.addEventListener('transitionend', () => {
      this.$menu.style.visibility = 'hidden';
    });
  }
}
