import Signals from 'signals';

export default class SignalPage1 {
	constructor() {
		this.state = {
			page1Word: 'cool'
		};

		this.event = {
			page1Word: new Signals()
		};

		this.togglePage1Word = (signal) => {
			signal.state.page1Word = (signal.state.page1Word == 'cool') ? 'awesome' : 'cool';
			signal.event.page1Word.dispatch(signal.state.page1Word);
		};
	}
}