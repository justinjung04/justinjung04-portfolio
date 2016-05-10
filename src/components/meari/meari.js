import React, { Component } from 'react';
import songs from '../../constants/songs';

export default class Meari extends Component {
	constructor() {
		super();
		this.state = {
			track: 0,
			voice: '',
			src: '',
			volume: 0.5,
			isPlaying: false,
			isMute: false,
			seekerWidth: 0
		};
		this.voices = ['soprano', 'alto', 'tenor', 'bass'];
	}

	componentDidMount() {
		if(process.env.NODE_ENV == 'production') {
			window.ga('set', 'page', '/meari');
			window.ga('send', 'pageview');	
		}
	}

	initVisualizer(bufferLength, bufferOffset) {
		this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
		this.analyser = null;
		this.source = null;
		this.bufferArray = new Uint8Array(bufferLength);

		let barWidth = 1;
		this.canvas = this.refs.visualizer;
		this.stage = new createjs.Stage(this.canvas);
		for(let i=0; i<bufferLength - bufferOffset; i++) {
			const shape = new createjs.Shape();
			shape.graphics.beginFill('#aec6cf').drawRect(this.canvas.width / (bufferLength - bufferOffset) * i, 0, barWidth, 1);
			shape.alpha = 0;
			shape.regY = 0.5;
			shape.snapToPixel = true;
			shape.cache(this.canvas.width / (bufferLength - bufferOffset) * i, 0, barWidth, 1);
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
	}

	setTrack(track, voice, time) {
		let src = 'assets/songs/' + track + '/' + track;
		if(voice != 'all') {
			src += '_' + voice;
		}
		src += '.mp3';
		this.setState({ track, voice, src, isPlaying: true });
		if(process.env.NODE_ENV == 'production') {
			window.ga('send', 'event', voice, 'listen', track);
		}
		if(!this.analyser) {
			this.analyser = this.audioContext.createAnalyser();
		}
		const request = new XMLHttpRequest();
		request.open('GET', src, true);
		request.responseType = 'arraybuffer';
		request.onload = () => {
			this.audioContext.decodeAudioData(request.response, (buffer) => {
				if(this.source) {
					this.source.disconnect();
				}
				this.source = this.audioContext.createBufferSource();
				this.source.buffer = buffer;
				this.source.connect(this.analyser);
				this.source.connect(this.audioContext.destination);
				this.source.start(time);
				createjs.Ticker.addEventListener('tick', this.tick);
			});
		}
		request.send();
	}

	downloadTrack() {
		if(process.env.NODE_ENV == 'production') {
			window.ga('send', 'event', this.state.voice, 'download', this.state.track);
		}
	}

	togglePlay() {
		if(this.state.isPlaying) {
			// this.audioContext.suspend();
			createjs.Ticker.removeEventListener('tick', this.tick);
			console.log('pause');
		} else {
			// this.audioContext.resume();
			console.log('play');
		}
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
		const clientX = (e.touches) ? e.touches[0].clientX : e.clientX;
		const position = clientX - this.refs.seeker.getBoundingClientRect().left;
		const width = this.refs.seeker.getBoundingClientRect().width;
		const percentage = Math.max(Math.min(position / width, 1), 0);
		const seekerWidth = (percentage * 100) + '%';
		this.audio.currentTime = this.audio.duration * percentage;
		this.setState({ seekerWidth });
	}

	volumeStart(e) {
		this.isVolumeActive = true;
		this.setVolume(e);
	}

	volumeMove(e) {
		if(this.isVolumeActive) {
			this.setVolume(e);
		}
	}

	volumeEnd() {
		this.isVolumeActive = false;
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
	
	render() {
		return (
			<div className='content meari'>
				<div ref='audioContainer'></div>
				<div className='player'>
					<div className='control'>
						{(this.state.src == '')
							? <div className='no-song'>PLEASE SELECT A SONG</div>
							: false
						}
						<canvas className='visualizer' ref='visualizer'></canvas>
						<div className='top'>
							<div className='seeker-wrapper'>
								{this.getSeekerSVG()}
							</div>
							<div className='volume-wrapper'>
								<i className={`fa ${this.state.isMute? 'fa-volume-off' : 'fa-volume-up'}`} onClick={this.muteVolume.bind(this)}></i>
								{this.getVolumeSVG()}
							</div>
						</div>
						<div className='bottom'>
							<div className='btn play' onClick={this.togglePlay.bind(this)}>{(this.state.isPlaying)? 'PAUSE' : 'PLAY'}</div>
							<a className='btn download' href={this.state.src} download={this.state.src.split('/')[3]} onClick={this.downloadTrack.bind(this)}>DOWNLOAD</a>
						</div>
					</div>
					<ul className='list'>
		                {songs.map((song, songKey) => {
		                	const onClickAll = this.setTrack.bind(this, song.track, 'all', 0);
				            return (
				                <li key={songKey} className={(this.state.track == song.track) ? 'active-song' : ''}>
				                	<i className='col fa fa-play'></i>
				                	<span className='col number' onClick={onClickAll}>{song.track}</span>
				                	<span className='col title' onClick={onClickAll}>{song.title}</span>
				                	<span className={`col ${(this.state.voice == 'all') ? 'active-voice' : ''}`} onClick={onClickAll}>All</span>
				                	{this.voices.map((voice, voiceKey) => {
				                		return (
				                			<span key={voiceKey} className={`col ${(this.state.voice == voice) ? 'active-voice' : ''} ${(song.voices.indexOf(voice) < 0) ? 'disabled' : ''}`} onClick={(song.voices.indexOf(voice) > -1 ? this.setTrack.bind(this, song.track, voice, 0) : '')}>{voice}</span>
				                		);
				                	})}
				                </li>
				            );
				        })}
		            </ul>
					<div className='fade'></div>
				</div>
			</div>
		);
	}
}