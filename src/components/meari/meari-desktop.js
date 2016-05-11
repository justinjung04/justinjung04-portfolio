import './meari-desktop.scss';

import React from 'react';
import Meari from './meari';

export default class MeariDesktop extends Meari {
	componentDidMount() {
		super.componentDidMount();
		this.init(200, 50);
	}

	getSeekerSVG() {
		return (
			<canvas className='seeker' ref='seeker' onMouseDown={this.seekerStart.bind(this)} onMouseMove={this.seekerMove.bind(this)} onMouseUp={this.seekerEnd.bind(this)} onMouseLeave={this.seekerEnd.bind(this)}></canvas>
		);
	}

	getVolumeSVG() {
		return (
			<svg className='volume' ref='volume' onMouseDown={this.volumeStart.bind(this)} onMouseMove={this.volumeMove.bind(this)} onMouseUp={this.volumeEnd.bind(this)} onMouseLeave={this.volumeEnd.bind(this)}>
				<rect className='empty' x='0' y='45%' width='100%' height='10%' />
				<rect className='filled' x='0' y='45%' width={`${(this.state.isMute? '0' : this.state.volume * 100)}%`} height='10%' />
			</svg>
		);
	}
}