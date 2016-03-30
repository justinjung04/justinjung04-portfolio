import './home.scss';

import React, { Component } from 'react';
import signal from '../../signal/signal';

export default class Home extends Component {
	constructor() {
		super();
		this.state = signal.state;
		this.setCount = (count) => this.setState({ count });
	}

	componentDidMount() {
		signal.event.count.add(this.setCount);
	}

	componentWillUnmount() {
		signal.event.count.remove(this.setCount);
	}

	incrementCount() {
		signal.incrementCount();
	}

	decrementCount() {
		signal.decrementCount();
	}
	
	render() {
		return (
			<div className='content home'>
				<h1>Home page</h1>
				<p>This is a home page</p>
				<img className='logo' src={'assets/logo_tb.png'} />
				<h1>Home Counter</h1>
				<p>{this.state.count}</p>
				<button onClick={this.incrementCount}>+</button>
				<button onClick={this.decrementCount}>-</button>
			</div>
		);
	}
}