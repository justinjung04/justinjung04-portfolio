import './home-nosupport.scss';

import React, { Component } from 'react';

export default class Home extends Component {
	componentDidMount() {
		window.ga('set', 'page', '/');
		window.ga('send', 'pageview');
	}
	
	render() {
		return (
			<div className='content home'>
				<div className='warning'>
					This browser is not supported.
					<br />
					Please try with Chrome, Safari or Firefox.
				</div>
			</div>
		);
	}
}