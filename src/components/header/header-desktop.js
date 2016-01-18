import './header-desktop.scss';

import React from 'react';
import Header from './header';
import Signal from '../../signal/signal';

export default class HeaderDesktop extends Header {
	constructor() {
		super();

		this.signal = new Signal();
		this.state = this.signal.state;

		this.setCount = (count) => {
			this.setState({
				count
			});
		};
	}

	componentDidMount() {
		this.signal.event.count.add(this.setCount);
	}

	componentWillUnmount() {
		this.signal.event.count.remove(this.setCount);
	}

	render() {
		return (
			<div className='header desktop'>
				<div className='title'>
					desktop {this.state.count}
				</div>
				<div className='links'>
					<div className={'link' + (this.props.url == '/' ? ' active' : '')} onClick={this.onClick.bind(this, '/')}>
						home
					</div>
					<div className={'link' + (this.props.url == '/page1' ? ' active' : '')} onClick={this.onClick.bind(this, '/page1')}>
						page 1
					</div>
				</div>
			</div>
		);
	}
}