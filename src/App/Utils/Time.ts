import Stats from 'three/examples/jsm/libs/stats.module';
import EventEmitter from './EventEmitter';

export default class Time extends EventEmitter {
  start: number;
  current: number;
  elapsed: number;
  delta: number;
  stats!: Stats;
  ticker!: number;

  constructor() {
    super();

    this.start = Date.now();
    this.current = this.start;
    this.elapsed = 0;
    this.delta = 16;

    this.setStats();

    this.tick = this.tick.bind(this);
    this.tick();
  }

  setStats() {
    this.stats = Stats();
    this.stats.showPanel(0);
    if (window.location.hash === '#debug') {
      document.body.appendChild(this.stats.dom);
    }
  }

  tick() {
    this.ticker = window.requestAnimationFrame(this.tick);

    this.stats.begin();
    const current = Date.now();

    this.delta = current - this.current;
    this.elapsed = this.current - this.start;
    this.current = current;

    if (this.delta > 60) {
      this.delta = 60;
    }

    this.trigger('tick');
    this.stats.end();
  }

  stop() {
    window.cancelAnimationFrame(this.ticker);
  }
}
