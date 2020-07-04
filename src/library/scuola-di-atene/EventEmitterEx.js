/* eslint-disable no-underscore-dangle, no-param-reassign */
import { EventEmitter } from 'events';

export default class EventEmitterEx extends EventEmitter {
  constructor(...args) {
    super(...args);
    this.globalListeners = [];
  }

  addGlobalListener(func) {
    this.globalListeners.push(func);
  }

  removeGlobalListener(func) {
    const index = this.globalListeners.findIndex(func);
    if (index !== -1) {
      this.globalListeners.splice(index, 1);
    }
  }

  emit(...args) {
    this.globalListeners.forEach(l => l(...args));
    super.emit(...args);
  }
}
