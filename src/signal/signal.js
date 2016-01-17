/*
Easy to get states (global data)
Easy to dispatch events (trigger)
Easy to add eventhandler (subscribe)

Layers of data, up to which layer should I be listening to? Not to a layer, but to a smallest unit.
If smallest unit, no need to have a single big tree.

In every component, 

this.states = signal.getStates();

And subscribe by,

signal.events.count.add((count) => {
	this.setState({
		count
	})	
});

And dispatch by,

signal.incrementCount();

[Redux way]
signal.thisFunction(actionObject)
actionObject = type, parameters
switch check for type, use Object.assign to modify states...

*/

import Signals from 'signals';

let signalInstance = null;

export default class Signal {
	constructor() {
		if(signalInstance) {
			return signalInstance;
		}
		signalInstance = this;

		// States
		this.state = {
			count: 0
		};

		// Events for state update, used for subscribing
		this.event = {
			count: new Signals()
		};
	}

	getState() {
		return this.state;
	}

	// Events for each state, used for subscribing
	incrementCount() {
		this.state.count += 1;
		this.event.count.dispatch(this.state.count);
	}

	decrementCount() {
		this.state.count -= 1;
		this.event.count.dispatch(this.state.count);
	}
}