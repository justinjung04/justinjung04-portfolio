import './meari-desktop.scss';

import React from 'react';
import Meari from './meari';

export default class MeariDesktop extends Meari {
	// componentDidMount() {
	// 	super.componentDidMount();

	// 	this.frequencyLength = 250;
	// 	this.frequencyOffset = 50;
	// 	this.frequencyData = new Uint8Array(this.frequencyLength);
	// 	this.width = 800;
	// 	this.height = 30;

	// 	this.visualizer = d3.select('.visualizer')
	// 						.append('svg')
	// 						.attr('width', '100%')
	// 						.attr('height', this.height);

	// 	this.visualizer.selectAll('rect')
	// 					.data(this.frequencyData.subarray(this.frequencyOffset))
	// 					.enter()
	// 					.append('rect')
	// 					.attr('x', (d, i) => { return (i * 100 / (this.frequencyLength - this.frequencyOffset)) + '%'; })
	// 					.attr('width', (100 / (this.frequencyLength - this.frequencyOffset) / 2) + '%')
	// 					.attr('fill', '#aec6cf');

	// 	this.visualizeAudio = (start) => {
	// 		if(start) {
	// 			this.renderFrameRequest = requestAnimationFrame(this.visualizeAudio);
	// 			this.analyzerNode.getByteFrequencyData(this.frequencyData);
	// 			this.visualizer.selectAll('rect')
	// 							.data(this.frequencyData.subarray(this.frequencyOffset))
	// 							.attr('y', (d) => { return (50 - (d / 3)) + '%'; })
	// 							.attr('height', (d) => { return (d / 1.5) + '%'; })
	// 							.attr('opacity', (d) => { return d / 150; });
	// 		} else {
	// 			cancelAnimationFrame(this.renderFrameRequest);
	// 		}
	// 	};

	// 	this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
	// 	this.analyzerNode = this.audioContext.createAnalyser();
	// 	this.audioSrc = this.audioContext.createMediaElementSource(this.refs.music);
	// 	this.audioSrc.connect(this.analyzerNode);
	// 	this.audioSrc.connect(this.audioContext.destination);
	// }

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

	// setPlay(start) {
	// 	super.setPlay(start);

		// this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
		// this.analyzerNode = this.audioContext.createAnalyser();
		// this.audioSrc = this.audioContext.createMediaElementSource(this.refs.music);
		// this.audioSrc.connect(this.analyzerNode);
		// this.audioSrc.connect(this.audioContext.destination);

		// this.visualizeAudio(start);
	// }
}