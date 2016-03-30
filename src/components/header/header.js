import './header.scss';

import { Component } from 'react';
import { browserHistory } from 'react-router';
import signal from '../../signal/signal';

export default class Header extends Component {
	constructor() {
		super();
		this.state = signal.state;
		this.setUrl = (url) => this.setState({ url });
	}

	componentDidMount() {
		signal.event.url.add(this.setUrl);
	}

	componentWillUnmount() {
		signal.event.url.remove(this.setUrl);
	}

	onClick(url) {
		browserHistory.push(url);
	}
}