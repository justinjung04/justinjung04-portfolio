import './meari-desktop.scss';

import React from 'react';
import Meari from './meari';

export default class MeariDesktop extends Meari {
	componentDidMount() {
		super.componentDidMount();
		this.initVisualizer(200, 50);
		
		// this.play = () => {
		// 	console.log(this.count);
		// 	this.audioFrame = requestAnimationFrame(this.play);
		// 	if(this.count % 10 == 0) {
		// 		if(this.audio.duration > 0) {
		// 			const seekerWidth = (this.audio.currentTime / this.audio.duration * 100) + '%';
		// 			this.setState({ seekerWidth, isPlaying: true });
		// 		}
		// 	}
		// 	this.count++;
		// }

		// this.pause = () => {
		// 	cancelAnimationFrame(this.audioFrame);
		// 	if(!this.isSeekerActive) {
		// 		this.setState({ isPlaying: false });
		// 	}
		// 	this.count = 1;
		// }
	}

	getSeekerSVG() {
		return (
			<svg className='seeker' ref='seeker' onMouseDown={this.seekerStart.bind(this)} onMouseMove={this.seekerMove.bind(this)} onMouseUp={this.seekerEnd.bind(this)} onMouseLeave={this.seekerEnd.bind(this)}>
				<rect className='empty' x='0' y='45%' width='100%' height='10%' />
				<rect className='filled' x='0' y='45%' width={this.state.seekerWidth} height='10%' />
			</svg>
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

	setVolume(e) {
		// let clientX = (e.touches) ? e.touches[0].clientX : e.clientX;
		// const position = clientX - this.refs.volume.getBoundingClientRect().left;
		// const width = this.refs.volume.getBoundingClientRect().width;
		// const volume = Math.max(Math.min(position / width, 1), 0);
		// const isMute = (volume == 0) ? true : false;
		// this.audio.volume = volume;
		// this.setState({ isMute, volume });
	}

	muteVolume() {
		// let isMute;
		// if(this.state.isMute) {
		// 	this.audio.volume = this.state.volume;
		// 	isMute = false;
		// } else {
		// 	this.audio.volume = 0;
		// 	isMute = true;
		// }
		// this.setState({ isMute });
	}
}