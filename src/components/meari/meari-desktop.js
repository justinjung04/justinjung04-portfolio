import './meari-desktop.scss';

import React from 'react';
import Meari from './meari';
import d3 from 'd3';

export default class MeariDesktop extends Meari {
	componentDidMount() {
		super.componentDidMount();

		this.audioContext = new (window.AudioContext || window.webkitAudioContext)();		
		this.analyser = this.audioContext.createAnalyser();

		const dataLength = 250;
		const dataOffset = 50;
		const dataArray = new Uint8Array(dataLength);

		this.visualizer = d3.select('.visualizer')
							.append('svg')
							.attr('width', '100%')
							.attr('height', 30);

		this.visualizer.selectAll('rect')
						.data(dataArray.subarray(dataOffset))
						.enter()
						.append('rect')
						.attr('x', (d, i) => { return (i * 100 / (dataLength - dataOffset)) + '%'; })
						.attr('width', (100 / (dataLength - dataOffset) / 2) + '%')
						.attr('fill', '#aec6cf');

		this.visualizeAudio = (start) => {
			if(start) {
				this.renderFrameRequest = requestAnimationFrame(this.visualizeAudio);
				this.analyser.getByteFrequencyData(dataArray);
				this.visualizer.selectAll('rect')
								.data(dataArray.subarray(dataOffset))
								.attr('y', (d) => { return (50 - (d / 3)) + '%'; })
								.attr('height', (d) => { return (d / 1.5) + '%'; })
								.attr('opacity', (d) => { return d / 150; });
			} else {
				cancelAnimationFrame(this.renderFrameRequest);
			}
		};
	}

	getSeekerSVG() {
		return (
			<svg className='seeker' ref='seeker' onMouseDown={this.seekerStart.bind(this)} onMouseMove={this.seekerMove.bind(this)} onMouseUp={this.seekerEnd.bind(this)} onMouseLeave={this.seekerLeft.bind(this)}>
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

	setPlay(start) {
		if(start) {
			this.seekerProgress = setInterval(() => {
				if(this.audio.duration > 0) {
					const seekerWidth = (this.audio.currentTime / this.audio.duration * 100) + '%';
					this.setState({ seekerWidth });	
				}
			}, 200);
		} else {
			clearInterval(this.seekerProgress);
		}
	}

	setTrack(track, voice) {
		super.setTrack(track, voice);
		if(this.source) {
			this.audio.pause();
			this.source.disconnect();
			this.refs.audioContainer.removeChild(this.refs.audioContainer.childNodes[0]);
		}

		this.audio = document.createElement('audio');
		const source = document.createElement('source');

		source.setAttribute('src', this.src);
		source.setAttribute('type', 'audio/mp3');
		this.audio.appendChild(source);
		this.refs.audioContainer.appendChild(this.audio);

		this.source = this.audioContext.createMediaElementSource(this.audio);
		this.source.connect(this.analyser);
		this.source.connect(this.audioContext.destination);

		this.audio.volume = 1;
		this.audio.play();
		this.setPlay(true);
		this.visualizeAudio(true);
	}

	togglePlay() {
		let isPlaying;
		if(this.state.isPlaying) {
			this.audio.pause();
			isPlaying = false;
			this.visualizeAudio(true);
		} else {
			this.audio.play();
			isPlaying = true;
			this.visualizeAudio(false);
		}
		this.setState({ isPlaying });
	}

	seekerStart(e) {
		this.isSeekerActive = true;
		this.audio.pause();
		this.setSeeker(e);
	}

	seekerMove(e) {
		if(this.isSeekerActive) {
			this.setSeeker(e);
		}
	}

	seekerEnd() {
		if(this.state.isPlaying) {
			this.audio.play();	
		}
		this.isSeekerActive = false;
	}

	setSeeker(e) {
		let clientX = (e.touches) ? e.touches[0].clientX : e.clientX;
		const position = clientX - this.refs.seeker.getBoundingClientRect().left;
		const width = this.refs.seeker.getBoundingClientRect().width;
		const percentage = Math.max(Math.min(position / width, 1), 0);
		const seekerWidth = (percentage * 100) + '%';
		this.audio.currentTime = this.audio.duration * percentage;
		this.setState({ seekerWidth });
	}

	setVolume(e) {
		let clientX = (e.touches) ? e.touches[0].clientX : e.clientX;
		const position = clientX - this.refs.volume.getBoundingClientRect().left;
		const width = this.refs.volume.getBoundingClientRect().width;
		const volume = Math.max(Math.min(position / width, 1), 0);
		const isMute = (volume == 0) ? true : false;
		this.audio.volume = volume;
		this.setState({ isMute, volume });
	}

	muteVolume() {
		let isMute;
		if(this.state.isMute) {
			this.audio.volume = this.state.volume;
			isMute = false;
		} else {
			this.audio.volume = 0;
			isMute = true;
		}
		this.setState({ isMute });
	}
}