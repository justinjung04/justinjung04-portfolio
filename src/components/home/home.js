import './home.scss';

import React, { Component } from 'react';

export default class Home extends Component {
	constructor() {
		super();
	}
	
	render() {
		return (
			<div className={'content home ' + this.props.device}>
				<h1>Home page</h1>
				<p>This is a home page</p>
				<img className='logo' src={require('../../assets/logo_tb.png')} />
			</div>
		);
	}
}