import Signals from 'signals';

export default class SignalGlobal {
	constructor() {
		this.state = {
			device: '',
			url: '',
			count: 0
		};

		this.event = {
			device: new Signals(),
			url: new Signals(),
			count: new Signals()
		};

		this.setDevice = (signal, device) => {
			signal.state.device = device;
			signal.event.device.dispatch(signal.state.device);
		};

		this.setUrl = (signal, url) => {
			signal.state.url = url;
			signal.event.url.dispatch(signal.state.url);
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