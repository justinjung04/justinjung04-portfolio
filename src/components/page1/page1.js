import './page1.scss';

import React, { Component } from 'react';
import Signal from '../../signal/signal';

export default class Page1 extends Component {
	constructor() {
		super();

		this.signal = new Signal();
		this.state = this.signal.state;

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
		this.signal.event.count.add(this.setCount);
		this.signal.event.word.add(this.setWord);
	}

	componentWillUnmount() {
		this.signal.event.count.remove(this.setCount);
		this.signal.event.word.remove(this.setWord);
	}
	
	incrementCount() {
		this.signal.incrementCount(this.signal);
	}

	decrementCount() {
		this.signal.decrementCount(this.signal);
	}

	toggleWord() {
		this.signal.toggleWord(this.signal);
	}

	render() {
		return (
			<div className={'content page1 ' + this.props.device}>
				<h1>Page 1</h1>
				<p>This is page 1</p>
				<h1>Page 1 Counter</h1>
				<p>{this.state.count}</p>
				<button onClick={this.incrementCount.bind(this)}>+</button>
				<button onClick={this.decrementCount.bind(this)}>-</button>
				<h1>Justin is... <i>{this.state.word}</i></h1>
				<button onClick={this.toggleWord.bind(this)}>toggle</button>
			</div>
		);
	}
}