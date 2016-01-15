import './page1.scss';

import React, { Component } from 'react';

export default class Page1 extends Component {
	constructor() {
		super();
	}

	render() {
		return (
			<div className={'content page1 ' + this.props.device}>
				<h1>Page 1</h1>
				<p>This is page 1</p>
			</div>
		);
	}
}