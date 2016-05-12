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
			isMute: false
		};
		this.voices = ['soprano', 'alto', 'tenor', 'bass'];
	}

	componentDidMount() {
		if(process.env.NODE_ENV == 'production') {
			window.ga('set', 'page', '/meari');
			window.ga('send', 'pageview');	
		}
	}

	componentWillUnmount() {
		if(this.audioContext.close) {
			this.audioContext.close();	
		}
		createjs.Ticker.removeEventListener('tick', this.tick);	
	}

	init(bufferLength, bufferOffset) {
		this.initVisualiser(bufferLength, bufferOffset);
		this.initSeeker();

		this.tick = () => {
			if(this.analyser && this.source) {
				if(this.isSeekerActive) {
					this.seeker.getChildAt(1).x = this.seekerTime / this.source.buffer.duration * this.seekerCanvas.width;
					this.seeker.update();
				} else if(this.source.onended != null) {
					this.analyser.getByteFrequencyData(this.bufferArray);
					for(let i = 0; i < bufferLength - bufferOffset; i++) {
						const shape = this.visualizer.getChildAt(i);
						shape.scaleY = this.bufferArray[i + bufferOffset] * 0.9;
						shape.y = this.visualizerCanvas.height / 2;
						shape.alpha = (shape.scaleY / this.visualizerCanvas.height) + 0.1;
					}
					this.visualizer.update();

					if(this.state.isPlaying) {
						this.seeker.getChildAt(1).x = Math.min(1, this.seekerTime / this.source.buffer.duration) * this.seekerCanvas.width;
						const updatedTime = (new Date().getTime()) / 1000;
						this.seekerTime += updatedTime - this.currentTime;
						this.currentTime = updatedTime;
						this.seeker.update();	
					}
				}
			}
		}

		this.bufferArray = new Uint8Array(bufferLength);
		createjs.Ticker.addEventListener('tick', this.tick);
	}

	initVisualiser(bufferLength, bufferOffset) {
		let barWidth = 1;
		this.visualizerCanvas = this.refs.visualizer;
		this.visualizer = new createjs.Stage(this.visualizerCanvas);
		for(let i = 0; i < bufferLength - bufferOffset; i++) {
			const shape = new createjs.Shape();
			shape.graphics.beginFill('#aec6cf').drawRect(this.visualizerCanvas.width / (bufferLength - bufferOffset) * i, 0, barWidth, 1);
			shape.alpha = 0;
			shape.regY = 0.5;
			shape.snapToPixel = true;
			shape.cache(this.visualizerCanvas.width / (bufferLength - bufferOffset) * i, 0, barWidth, 1);
			this.visualizer.addChild(shape);
		}
	}

	initSeeker() {
		this.seekerCanvas = this.refs.seeker;
		this.seeker = new createjs.Stage(this.seekerCanvas);
		const seekerEmpty = new createjs.Shape();
		seekerEmpty.graphics.beginFill('#aec6cf').drawRect(0, this.seekerCanvas.height / 2, this.seekerCanvas.width, this.seekerCanvas.height / 10);
		seekerEmpty.regY = this.seekerCanvas.height / 20;
		seekerEmpty.snapToPixel = true;
		const seekerFilled = new createjs.Shape();
		seekerFilled.graphics.beginFill('#526972').drawRect(-this.seekerCanvas.width, this.seekerCanvas.height / 2, this.seekerCanvas.width, this.seekerCanvas.height / 10);
		seekerFilled.regY = this.seekerCanvas.height / 20;
		seekerFilled.snapToPixel = true;
		this.seeker.addChild(seekerEmpty);
		this.seeker.addChild(seekerFilled);
		this.seeker.update();
	}

	play(isNew, track, voice) {
		if(this.state.src == '') {
			this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
			if(this.audioContext.sampleRate != 44100) {
				if(this.audioContext.close) {
					this.audioContext.close();	
				}
				this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
			}
		}

		if(!this.analyser) {
			this.analyser = this.audioContext.createAnalyser();
			this.analyser.connect(this.audioContext.destination);
		}

		if(!this.gain) {
			this.gain = this.audioContext.createGain();
			this.gain.connect(this.analyser);
		}

		if(this.source) {
			this.source.disconnect();
			this.source.onended = null;
		}

		let src;
		if(isNew) {
			if(process.env.NODE_ENV == 'production') {
				window.ga('send', 'event', voice, 'listen', track);
			}
			src = 'assets/songs/' + track + '/' + track;
			src += (voice != 'all') ? '_' + voice + '.mp3' : '.mp3';
			this.setState({ track, voice, src });
			this.seekerTime = 0;
		} else {
			src = this.state.src;
		}

		const request = new XMLHttpRequest();
		request.open('GET', src, true);
		request.responseType = 'arraybuffer';
		request.onload = () => {
			this.audioContext.decodeAudioData(request.response, (buffer) => {
				this.currentTime = new Date().getTime() / 1000;
				this.source = this.audioContext.createBufferSource();
				this.source.buffer = buffer;
				this.source.connect(this.gain);
				this.source.start(0, this.seekerTime);
				this.source.onended = () => {
					const seekerFilled = this.seeker.getChildAt(1);
					seekerFilled.x = this.seekerCanvas.width;
					this.seeker.update();
					this.seekerTime = 0;
					this.setState({ isPlaying: false });
				};
				this.setState({ isPlaying: true });
			});
		}
		request.send();
	}

	pause() {
		this.source.disconnect();
		this.source.onended = null;
		this.setState({ isPlaying: false });
	}

	downloadTrack() {
		if(process.env.NODE_ENV == 'production') {
			window.ga('send', 'event', this.state.voice, 'download', this.state.track);
		}
	}
	seekerStart(e) {
		this.isSeekerActive = true;
		this.setSeeker(e);
		this.source.disconnect();
	}

	seekerMove(e) {
		if(this.isSeekerActive) {
			this.setSeeker(e);
		}
	}

	seekerEnd() {
		if(this.isSeekerActive && (this.state.isPlaying || this.source.onended != null)) {
			this.play(false);
			if(this.source.onended != null) {
				this.setState({ isPlaying: true });
			}
		}
		this.isSeekerActive = false;
	}

	setSeeker(e) {
		const clientX = (e.touches) ? e.touches[0].clientX : e.clientX;
		const position = clientX - this.refs.seeker.getBoundingClientRect().left;
		const width = this.refs.seeker.getBoundingClientRect().width;
		const percentage = Math.max(Math.min(position / width, 1), 0);
		this.seekerTime = percentage * this.source.buffer.duration;
	}

	volumeStart(e) {
		this.isVolumeActive = true;
		// this.setVolume(e);
	}

	volumeMove(e) {
		if(this.isVolumeActive) {
			// this.setVolume(e);
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
							<div className='btn play' onClick={this.state.isPlaying ? this.pause.bind(this) : this.play.bind(this, false)}>{(this.state.isPlaying)? 'PAUSE' : 'PLAY'}</div>
							<a className='btn download' href={this.state.src} download={this.state.src.split('/')[3]} onClick={this.downloadTrack.bind(this)}>DOWNLOAD</a>
						</div>
					</div>
					<ul className='list'>
		                {songs.map((song, songKey) => {
		                	const onClickAll = this.play.bind(this, true, song.track, 'all');
				            return (
				                <li key={songKey} className={(this.state.track == song.track) ? 'active-song' : ''}>
				                	<i className='col fa fa-play'></i>
				                	<span className='col number' onClick={onClickAll}>{song.track}</span>
				                	<span className='col title' onClick={onClickAll}>{song.title}</span>
				                	<span className={`col ${(this.state.voice == 'all') ? 'active-voice' : ''}`} onClick={onClickAll}>All</span>
				                	{this.voices.map((voice, voiceKey) => {
				                		return (
				                			<span key={voiceKey} className={`col ${(this.state.voice == voice) ? 'active-voice' : ''} ${(song.voices.indexOf(voice) < 0) ? 'disabled' : ''}`} onClick={(song.voices.indexOf(voice) > -1 ? this.play.bind(this, true, song.track, voice) : '')}>{voice}</span>
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