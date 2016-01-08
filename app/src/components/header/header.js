import './header.scss';

import React, { Component } from 'react';
import ReactMixin from 'react-mixin';
import { Link, History } from 'react-router';

export default class Header extends Component {
	constructor() {
		super();
		this.state ={
			overlay: false
		};
	}

	componentDidMount() {
		
	}

	onClickDesktop(url) {
		if(this.props.url != url) {
			this.history.pushState(null, url);	
		}
	}

	onClickMobile(url) {
		this.toggleOverlay();
		this.onClickDesktop(url);
	}

	toggleOverlay() {
		this.setState({
			overlay: !this.state.overlay
		});
	}

	render() {
		let Header = (this.props.device == 'desktop' ? this.renderDesktop() : this.renderPhone());
		return (
			Header
		);
	}

	renderDesktop() {
		return (
			<div className={'header ' + this.props.device}>
				<img className='logo' src={require('../../images/logo_tb.png')} onClick={this.onClickDesktop.bind(this, '/')} />
				<div className='links'>
					<div className={'link' + (this.props.url == '/' ? ' active' : '')} onClick={this.onClickDesktop.bind(this, '/')}>
						home
					</div>
					<div className={'link' + (this.props.url == '/page1' ? ' active' : '')} onClick={this.onClickDesktop.bind(this, '/page1')}>
						page 1
					</div>
				</div>
			</div>
		);
	}

	renderPhone() {
		return(
			<div className={'header ' + this.props.device}>
				<div className={'overlay ' + (this.state.overlay ? 'visible' : 'hidden')}></div>
				<div className='menu-button' onClick={this.toggleOverlay.bind(this)}></div>
				<div className={'links ' + (this.state.overlay? 'visible' : 'hidden')}>
					<div className='link' onClick={this.onClickMobile.bind(this, '/')}>
						home
					</div>
					<div className='link' onClick={this.onClickMobile.bind(this, '/page1')}>
						page 1
					</div>
				</div>
			</div>
		);
	}
}

ReactMixin.onClass(Header, History);