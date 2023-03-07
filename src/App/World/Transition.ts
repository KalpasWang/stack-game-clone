import { gsap } from 'gsap';
import Light from '../Light';
import World from './index';

export default class Transition {
  light: Light;
  world: World;
  timeline: gsap.core.Timeline;

  constructor(_option: { light: Light; world: World }) {
    this.light = _option.light;
    this.world = _option.world;

    // use only one timeline to handle all animations related to GSAP
    this.timeline = gsap.timeline();
  }

  firstTransition() {
    const targetA = this.world.scene.position;
    // const targetB = this.light.directionalLight;
    // const targetC = this.light.ambientLight;
    // this.world.scene.position.setY(-10);
    this.timeline.from(targetA, { y: -10, duration: 2 }, 'firstTransition');
    // this.timeline.to(targetB, { intensity: 0.8, duration: 3 }, '<');
    // this.timeline.to(targetC, { intensity: 0.8, duration: 3 }, '<');

    return this.timeline;
  }
}
