import './home.scss';

import React, { Component } from 'react';
import Signal from '../../signal/signal';

export default class Home extends Component {
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
			<div className={'content home ' + this.props.device}>
				<h1>Home page</h1>
				<p>This is a home page</p>
				<img className='logo' src={require('../../assets/logo_tb.png')} />
				<h1>Home Counter</h1>
				<p>{this.state.count}</p>
				<button onClick={this.incrementCount.bind(this)}>+</button>
				<button onClick={this.decrementCount.bind(this)}>-</button>
			</div>
		);
	}
}