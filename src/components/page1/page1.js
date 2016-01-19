import './page1.scss';

import React, { Component } from 'react';
import signal from '../../signal/signal';

export default class Page1 extends Component {
	constructor() {
		super();
		this.state = signal.state;
		this.setCount = (count) => {
			this.setState({
				count
			});
		};
		this.setWord = (word) => {
			this.setState({
				word
			});
		}
	}

	componentDidMount() {
		signal.event.count.add(this.setCount);
		signal.event.word.add(this.setWord);
	}

	componentWillUnmount() {
		signal.event.count.remove(this.setCount);
		signal.event.word.remove(this.setWord);
	}

	render() {
		return (
			<div className='content page1'>
				<h1>Page 1</h1>
				<p>This is page 1</p>
				<h1>Page 1 Counter</h1>
				<p>{this.state.count}</p>
				<button onClick={() => signal.incrementCount(signal)}>+</button>
				<button onClick={() => signal.decrementCount(signal)}>-</button>
				<h1>Justin is... <i>{this.state.word}</i></h1>
				<button onClick={() => signal.toggleWord(signal)}>toggle</button>
			</div>
		);
	}
}