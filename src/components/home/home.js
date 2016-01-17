import './home.scss';

import React, { Component } from 'react';
import Signal from '../../signal/signal';

export default class Home extends Component {
	constructor() {
		super();
		this.signal = new Signal();
		this.state = this.signal.getState();		
	}

	componentDidMount() {
		// let setCount = (count) => {
		// 	this.setState({
		// 		count
		// 	});
		// };

		this.signal.event.count.add(this.setCount.bind(this), this);

		console.log(this.signal.event.count.has(this.setCount.bind(this), this));
	}

	componentWillUnmount() {
		
	}

	setCount(count) {
		this.setState({
			count
		});
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
				<h1>Counter</h1>
				<p>{this.state.count}</p>
				<button onClick={this.incrementCount.bind(this)}>+</button>
				<button onClick={this.decrementCount.bind(this)}>-</button>
			</div>
		);
	}
}