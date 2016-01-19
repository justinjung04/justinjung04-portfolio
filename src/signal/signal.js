/*
Easy to get states (global data)
Easy to add eventhandler (subscribe)
Easy to dispatch events (trigger)

import signal from '../../signal/signal'; //import

constructor() {
	this.states = signal.state;	//get all states
	this.setCount = (count) => { this.setState({ count }); }; //callback function when a state of interest updates
}

componentDidMount() {
	signal.event.count.add(this.setCount); //subscribe to a state of interest
}

componentWillUnmount() {
	signal.event.count.remove(this.setCount); //unsubsribe to a state of interest
}

onClick() {
	signal.incrementCount(signal); //dispatch an action to update a state of interest
}
*/

import Signals from 'signals';
import SignalGlobal from './signal-global';
import SignalPage1 from './signal-page1';

let instance = null;

class Signal {
	constructor() {
		if(instance) {
			return instance;
		}
		instance = this;

		let allSignals = [
			new SignalGlobal(),
			new SignalPage1()
		];

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