import './header-mobile.scss';

import React from 'react';
import Header from './header';

export default class HeaderMobile extends Header {
	constructor() {
		super();
	}

	componentDidMount() {
		super.componentDidMount();
	}

	componentWillUnmount() {
		super.componentWillUnmount();
	}

	onClick(url) {
		super.onClick(url);
	}

	render() {
		return (
			<div className='header mobile'>
				<div className='title'>
					mobile
				</div>
				<div className='links'>
					<div className={'link' + (this.state.url == '/' ? ' active' : '')} onClick={this.onClick.bind(this, '/')}>
						home
					</div>
					<div className={'link' + (this.state.url == '/page1' ? ' active' : '')} onClick={this.onClick.bind(this, '/page1')}>
						page 1
					</div>
				</div>
			</div>
		);
	}
}