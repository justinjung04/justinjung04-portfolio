import './page1.scss';

import React, { Component } from 'react';

export default class Page1 extends Component {
	constructor() {
		super();
	}

	componentDidMount() {

	}

	render() {
		return (
			<div className={'content page1 ' + this.props.device}>
				<h1>Page 1</h1>
				This is page 1
			</div>
		)
	}
}