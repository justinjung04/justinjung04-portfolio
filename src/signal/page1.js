import Signals from 'signals';

export default class Word {
	constructor() {
		this.state = {
			word: 'cool'
		};

		this.event = {
			word: new Signals()
		};

		this.toggleWord = (signal) => {
			signal.state.word = (signal.state.word == 'cool') ? 'awesome' : 'cool';
			signal.event.word.dispatch(signal.state.word);
		};
	}
}