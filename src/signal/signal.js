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
import Count from './count';
import Word from './word';

let signalInstance = null;

export default class Signal {
	constructor() {
		if(signalInstance) {
			return signalInstance;
		}
		signalInstance = this;

		let allSignals = [new Count(), new Word()];

		allSignals.map(signal => {
			Object.assign(this, signal);
		});

		allSignals.map(signal => {
			Object.assign(this.state, signal.state);
			Object.assign(this.event, signal.event);
		});
	}
}