import { gsap } from 'gsap';
import Camera from '../Camera';
import Light from '../Light';

export default class Transition {
  light: Light;
  camera: Camera;
  timeline: gsap.core.Timeline;

  constructor(_option: { light: Light; camera: Camera }) {
    this.light = _option.light;
    this.camera = _option.camera;

    // use only one timeline to handle all animations related to GSAP
    this.timeline = gsap.timeline();
  }

  firstTransition() {
    const targetA = this.camera.instance.position;
    const targetB = this.light.directionalLight;
    const targetC = this.light.ambientLight;

    this.timeline.to(targetA, { z: 1, duration: 2 }, 'firstTransition');
    this.timeline.to(targetB, { intensity: 0.8, duration: 3 }, '<');
    this.timeline.to(targetC, { intensity: 0.8, duration: 3 }, '<');

    return this.timeline;
  }
}
