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

	render() {
		return (
			<div className='header mobile'>
				<div className='title'>
					mobile
				</div>
				<div className='links'>
					<div className={'link' + (this.state.url == '/' ? ' active' : '')} onClick={() => super.onClick('/')}>
						home
					</div>
					<div className={'link' + (this.state.url == '/page1' ? ' active' : '')} onClick={() => super.onClick('/page1')}>
						page 1
					</div>
				</div>
			</div>
		);
	}
}