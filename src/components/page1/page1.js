import './page1.scss';

import React, { Component } from 'react';
import Signal from '../../signal/signal';

export default class Page1 extends Component {
	constructor() {
		super();
		this.signal = new Signal();
		this.state = this.signal.getState();

		this.setCount = (count) => {
			this.setState({
				count
			});
		};
	}

	componentDidMount() {
		this.signal.event.count.add(this.setCount);
	}

	componentWillUnmount() {
		this.signal.event.count.remove(this.setCount);
	}
	
	incrementCount() {
		this.signal.incrementCount();
	}

	decrementCount() {
		this.signal.decrementCount();
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
			</div>
		);
	}
}