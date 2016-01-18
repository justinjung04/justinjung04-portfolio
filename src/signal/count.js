import Signals from 'signals';

export default class Count {
	constructor() {
		this.state = {
			count: 0
		};

		this.event = {
			count: new Signals()
		};

		this.incrementCount = (signal) => {
			signal.state.count++;
			signal.event.count.dispatch(signal.state.count);
		};

		this.decrementCount = (signal) => {
			signal.state.count--;
			signal.event.count.dispatch(signal.state.count);
		};
	}
}