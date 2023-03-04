import { EventEmitter } from 'events';

export default class Events {
  static instance: EventEmitter = new EventEmitter();

  static getInstance() {
    return Events.instance;
  }
}
