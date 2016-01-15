import './header-desktop.scss';

import React from 'react';
import Header from './header';

export default class HeaderDesktop extends Header {
	constructor() {
		super();
	}

	render() {
		return (
			<div className='header desktop'>
				<div className='title'>
					desktop
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