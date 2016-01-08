import './home.scss';

import React, { Component } from 'react';

export default class Home extends Component {
	constructor() {
		super();
	}

	componentDidMount() {

	}
	
	render() {
		return (
			<div className={'content home ' + this.props.device}>
				<h1>Home page</h1>
				This is a home page
			</div>
		)
	}
}