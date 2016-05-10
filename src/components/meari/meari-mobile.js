import './meari-mobile.scss';

import React from 'react';
import Meari from './meari';

export default class MeariMobile extends Meari {
	componentDidMount() {
		super.componentDidMount();

		this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
		this.analyser = null;
		this.source = null;

		let bufferLength = 150;
		let bufferOffset = 50;
		this.bufferArray = new Uint8Array(bufferLength);

		this.canvas = this.refs.visualizer;
		this.stage = new createjs.Stage(this.canvas);
		for(let i=0; i<bufferLength - bufferOffset; i++) {
			const shape = new createjs.Shape();
			shape.graphics.beginFill('#aec6cf').drawRect(this.canvas.width / (bufferLength - bufferOffset) * i, 0, this.canvas.width / (bufferLength - bufferOffset) / 3, 1);
			
			shape.alpha = 0;
			shape.regX = 0.25;
			shape.regY = 0.5;
			
			shape.snapToPixel = true;
			shape.cache(this.canvas.width / (bufferLength - bufferOffset) * i, 0, this.canvas.width / (bufferLength - bufferOffset) / 3, 1);
			this.stage.addChild(shape);
		}

		this.tick = (event) => {
			this.analyser.getByteFrequencyData(this.bufferArray);
			for(let i=0; i<bufferLength - bufferOffset; i++) {
				const shape = this.stage.getChildAt(i);
				shape.scaleY = this.bufferArray[i + bufferOffset] * 0.9;
				shape.y = this.canvas.height / 2;
				shape.alpha = (shape.scaleY / this.canvas.height) + 0.1;
			}
			this.stage.update(event);
		}
		
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
			<svg className='seeker' ref='seeker' onTouchStart={this.seekerStart.bind(this)} onTouchMove={this.seekerMove.bind(this)} onTouchEnd={this.seekerEnd.bind(this)}>
				<rect className='empty' x='0' y='45%' width='100%' height='10%' />
				<rect className='filled' x='0' y='45%' width={this.state.seekerWidth} height='10%' />
			</svg>
		);
	}

	getVolumeSVG() {
		return (
			<svg className='volume' ref='volume' onTouchStart={this.volumeStart.bind(this)} onTouchMove={this.volumeMove.bind(this)} onTouchEnd={this.volumeEnd.bind(this)}>
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