import './header.scss';

import { Component } from 'react';
import ReactMixin from 'react-mixin';
import { History } from 'react-router';

export default class Header extends Component {
	constructor() {
		super();
		this.state = {
			backgroundColor: '#000000'
		};
	}

	onClick(url, backgroundColor) {
		this.setBackgroundColor(backgroundColor);
		this.history.pushState(null, url);
	}

	setBackgroundColor(backgroundColor) {
		this.setState({
			backgroundColor
		});
	}
}

ReactMixin.onClass(Header, History);