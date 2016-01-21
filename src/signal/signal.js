import SignalGlobal from './signal-global';
import SignalPage1 from './signal-page1';

let instance = null;

class Signal {
  constructor() {
    if(instance) {
      return instance;
    }
    instance = this;

    let signals = [
      new SignalGlobal(),
      new SignalPage1()
    ];

    signals.map((signal) => {
      Object.assign(this, signal);
    });

  	signals.map((signal) => {
      Object.assign(this.state, signal.state);
      Object.assign(this.event, signal.event);
    });
  }
}

export default (new Signal());