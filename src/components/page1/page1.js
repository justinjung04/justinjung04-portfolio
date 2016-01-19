import './page1.scss';

import React, { Component } from 'react';
import signal from '../../signal/signal';

export default class Page1 extends Component {
	constructor() {
		super();
		this.state = signal.state;
		this.setCount = (count) => { this.setState({ count }); };
		this.setPage1Word = (page1Word) => { this.setState({ page1Word }); };
	}

	componentDidMount() {
		signal.event.count.add(this.setCount);
		signal.event.page1Word.add(this.setPage1Word);
	}

	componentWillUnmount() {
		signal.event.count.remove(this.setCount);
		signal.event.page1Word.remove(this.setPage1Word);
	}

	render() {
		return (
			<div className='content page1'>
				<h1>Page 1</h1>
				<p>This is page 1</p>
				<h1>Page 1 Counter</h1>
				<p>{this.state.count}</p>
				<button onClick={() => signal.incrementCount()}>+</button>
				<button onClick={() => signal.decrementCount()}>-</button>
				<h1>Justin is... <i>{this.state.page1Word}</i></h1>
				<button onClick={() => signal.togglePage1Word()}>toggle</button>
			</div>
		);
	}
}