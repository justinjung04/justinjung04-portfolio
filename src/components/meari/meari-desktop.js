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
}