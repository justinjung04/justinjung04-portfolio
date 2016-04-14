import './home.scss';

import React, { Component } from 'react';

export default class Home extends Component {
	constructor() {
		super();
	}

	componentDidMount() {
		window.ga('set', 'page', '/');
		window.ga('send', 'pageview');
	}
	
	render() {
		return (
			<div className='content home'>
				JUSTIN JUNG | WEB DEVELOPER
				<br />
				COMING SOON.
				{/*<h1>Home page</h1>
				<p>This is a home page</p>
				<img className='logo' src={'assets/logo_tb.png'} />
				<h1>Home Counter</h1>
				<p>{this.state.count}</p>
				<button onClick={this.incrementCount}>+</button>
				<button onClick={this.decrementCount}>-</button>*/}
			</div>
		);
	}
}