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

		this.setDevice = function(device) {
			this.state.device = device;
			this.event.device.dispatch(this.state.device);
		};

		this.setUrl = function(url) {
			this.state.url = url;
			this.event.url.dispatch(this.state.url);
		};

		this.incrementCount = function() {
			this.state.count++;
			this.event.count.dispatch(this.state.count);
		};

		this.decrementCount = function() {
			this.state.count--;
			this.event.count.dispatch(this.state.count);
		};
	}
}