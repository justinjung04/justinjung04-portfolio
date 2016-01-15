import './header-mobile.scss';

import React from 'react';
import Header from './header';

export default class HeaderMobile extends Header {
	constructor() {
		super();
		this.state = {
			color: '#000000'
		};
	}

	onClick(url, backgroundColor, color) {
		super.onClick(url, backgroundColor);
		this.setColor(color);
	}

	setColor(color) {
		this.setState({
			color //object shorthand for color: color
		});
	}

	render() {
		return (
			<div className='header mobile' style={{backgroundColor: this.state.backgroundColor, color: this.state.color}}>
				<div className='title'>
					mobile
				</div>
				<div className='links'>
					<div className={'link' + (this.props.url == '/' ? ' active' : '')} onClick={this.onClick.bind(this, '/', '#000000', '#ffffff')}>
						home
					</div>
					<div className={'link' + (this.props.url == '/page1' ? ' active' : '')} onClick={this.onClick.bind(this, '/page1', '#ffffff', '#000000')}>
						page 1
					</div>
				</div>
			</div>
		);
	}
}