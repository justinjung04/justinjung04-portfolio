/*
Easy to get states (global data)
Easy to add eventhandler (subscribe)
Easy to dispatch events (trigger)

Assign state to each component by, 

this.signal = new Signal();
this.states = this.signal.state;

And subscribe by,

this.signal.event.count.add((count) => {
	this.setState({
		count
	})	
});

And dispatch by,

this.signal.functionName();
*/

import Signals from 'signals';
import Global from './global';
import Page1 from './page1';

let instance = null;

class Signal {
	constructor() {
		if(instance) {
			return instance;
		}
		instance = this;

		let allSignals = [new Global(), new Page1()];

		allSignals.map(signal => {
			Object.assign(this, signal);
		});

		allSignals.map(signal => {
			Object.assign(this.state, signal.state);
			Object.assign(this.event, signal.event);
		});
	}
}

export default (new Signal());