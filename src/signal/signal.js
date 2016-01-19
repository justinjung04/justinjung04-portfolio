import SignalGlobal from './signal-global';
import SignalPage1 from './signal-page1';

let instance = null;

class Signal {
  constructor() {
    if(instance) {
      return instance; //singleton class
    }
    instance = this;

    //list of all signals
    let allSignals = [
      new SignalGlobal(),
      new SignalPage1()
    ];

    allSignals.map((signal) => {
      Object.assign(this, signal); //aggregate all functions
    });

  	allSignals.map((signal) => {
      Object.assign(this.state, signal.state); //aggregate states
      Object.assign(this.event, signal.event); //aggregate events
    });
  }
}

export default (new Signal());