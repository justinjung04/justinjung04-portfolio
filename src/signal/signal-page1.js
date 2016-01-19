import Signals from 'signals';

export default class SignalPage1 {
	constructor() {
		this.state = {
			page1Word: 'cool'
		};

		this.event = {
			page1Word: new Signals()
		};

		this.togglePage1Word = function() {
			this.state.page1Word = (this.state.page1Word == 'cool' ) ? 'awesome' : 'cool';
			this.event.page1Word.dispatch(this.state.page1Word);
		};
	}
}