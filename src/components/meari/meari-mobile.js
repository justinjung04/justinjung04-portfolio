import './meari-mobile.scss';

import React from 'react';
import Meari from './meari';

export default class MeariMobile extends Meari {
	componentDidMount() {
		super.componentDidMount();

		this.audio = document.createElement('audio');
		const source = document.createElement('source');

		source.setAttribute('type', 'audio/mp3');
		this.audio.appendChild(source);
		this.refs.audioContainer.appendChild(this.audio);
		this.count = 1;

		this.play = () => {
			console.log(this.count);
			this.audioFrame = requestAnimationFrame(this.play);
			if(this.count % 10 == 0) {
				if(this.audio.duration > 0) {
					const seekerWidth = (this.audio.currentTime / this.audio.duration * 100) + '%';
					this.setState({ seekerWidth, isPlaying: true });
				}
			}
			this.count++;	
		}

		this.pause = () => {
			cancelAnimationFrame(this.audioFrame);
			if(!this.isSeekerActive) {
				this.setState({ isPlaying: false });
			}
			this.count = 1;
		}

		this.audio.onplay = this.play;
		this.audio.onpause = this.pause;
		this.audio.onended = this.pause;
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

	setTrack(track, voice) {
		super.setTrack(track, voice);
		this.audio.pause();
		this.audio.src = this.src;
		this.audio.play();
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