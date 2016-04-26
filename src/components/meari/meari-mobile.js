import './meari-mobile.scss';

import React from 'react';
import Meari from './meari';

export default class MeariMobile extends Meari {
	getSeekerSVG() {
		return (
			<svg className='seeker' ref='seeker' onTouchStart={this.seekerStart.bind(this)} onTouchMove={this.seekerMove.bind(this)} onTouchEnd={this.seekerEnd.bind(this)}>
				<rect className='empty' x='0' y='45%' />
				<rect className='filled' x='0' y='45%' style={{width: this.state.seekerWidth}} />
			</svg>
		);
	}

	getVolumeSVG() {
		return (
			<svg className='volume' ref='volume' onTouchStart={this.volumeStart.bind(this)} onTouchMove={this.volumeMove.bind(this)} onTouchEnd={this.volumeEnd.bind(this)}>
				<rect className='empty' x='0' y='45%' />
				<rect className='filled' x='0' y='45%' width={`${(this.state.isMute? '0' : this.state.volume * 100)}%`} />
			</svg>
		);
	}
}