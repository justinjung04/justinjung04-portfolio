import React, { Component } from 'react';
import songs from '../../constants/songs';
import WebAudio from 'tb-web-audio';

export default class Meari extends Component {
	constructor() {
		super();
		this.state = {
			track: 0,
			voice: '',
			src: '',
			isPlaying: false,
			isMute: false
		};
		this.voices = ['soprano', 'alto', 'tenor', 'bass'];
		this.request = new XMLHttpRequest();
		this.webAudio = new WebAudio();
		this.webAudio.setVolume(2);
	}

	componentDidMount() {
		if(process.env.NODE_ENV == 'production') {
			window.ga('set', 'page', '/meari');
			window.ga('send', 'pageview');	
		}
	}

	componentWillUnmount() {
		window.createjs.Ticker.removeEventListener('tick', this.tick);	
	}

	init(bufferLength, bufferOffset) {
		this.initVisualiser(bufferLength, bufferOffset);
		this.initSeeker();

		this.tick = () => {
			if(this.state.src != '') {
				if(!this.isSeekerActive) {
					this.seeker.getChildAt(1).x = this.webAudio.getCurrentTime() / this.webAudio.getDuration() * this.seekerCanvas.width;
					this.seeker.update();	
				}

				if(this.state.isMute) {
					this.barHeight = Math.max(0, this.barHeight - 0.1);
					for(let i = 0; i < bufferLength - bufferOffset; i++) {
						const shape = this.visualizer.getChildAt(i);
						shape.scaleY = this.webAudio.getFreqData()[i + bufferOffset] * this.barHeight;
						shape.alpha = (shape.scaleY / this.visualizerCanvas.height) + 0.1;
					}
				} else {
					this.barHeight = 0.9;
					for(let i = 0; i < bufferLength - bufferOffset; i++) {
						const shape = this.visualizer.getChildAt(i);
						shape.scaleY = this.webAudio.getFreqData()[i + bufferOffset] * this.barHeight;
						shape.alpha = (shape.scaleY / this.visualizerCanvas.height) + 0.1;
					}
				}
				this.visualizer.update();
			}
		};

		window.createjs.Ticker.addEventListener('tick', this.tick);
	}

	initVisualiser(bufferLength, bufferOffset) {
		this.visualizerCanvas = this.refs.visualizer;
		this.visualizer = new window.createjs.Stage(this.visualizerCanvas);
		for(let i = 0; i < bufferLength - bufferOffset; i++) {
			const shape = new window.createjs.Shape();
			shape.graphics.beginFill('#aec6cf').drawRect(this.visualizerCanvas.width / (bufferLength - bufferOffset) * i, 0, 1, 1);
			shape.regY = 0.5;
			shape.y = this.visualizerCanvas.height / 2;
			shape.snapToPixel = true;
			shape.cache(this.visualizerCanvas.width / (bufferLength - bufferOffset) * i, 0, 1, 1);
			this.visualizer.addChild(shape);
		}
	}

	initSeeker() {
		this.seekerCanvas = this.refs.seeker;
		this.seeker = new window.createjs.Stage(this.seekerCanvas);
		const seekerEmpty = new window.createjs.Shape();
		seekerEmpty.graphics.beginFill('#aec6cf').drawRect(0, this.seekerCanvas.height / 2, this.seekerCanvas.width, this.seekerCanvas.height / 10);
		seekerEmpty.regY = this.seekerCanvas.height / 20;
		const seekerFilled = new window.createjs.Shape();
		seekerFilled.graphics.beginFill('#526972').drawRect(-this.seekerCanvas.width, this.seekerCanvas.height / 2, this.seekerCanvas.width, this.seekerCanvas.height / 10);
		seekerFilled.regY = seekerEmpty.regY;
		this.seeker.addChild(seekerEmpty);
		this.seeker.addChild(seekerFilled);
		this.seeker.update();
	}

	load(track, voice) {
		if(track != this.state.track && voice != this.state.voice && process.env.NODE_ENV == 'production') {
			window.ga('send', 'event', voice, 'listen', track);
		}

		let src = 'assets/songs/' + track + '/' + track;
		src += (voice != 'all') ? '_' + voice + '.mp3' : '.mp3';
		
		this.webAudio.load(src, () => {
			this.setState({ track, voice, src, isPlaying: true });
		}, () => {
			this.setState({ isPlaying: false });
		}, true, false);
	}

	play() {
		if(this.webAudio.getCurrentTime() == this.webAudio.getDuration()) {
			this.webAudio.setCurrentTime(0);
		}
		this.webAudio.play();
		this.setState({ isPlaying: true });
	}

	pause() {
		this.webAudio.pause();
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
		this.webAudio.pause();
	}

	seekerMove(e) {
		if(this.isSeekerActive) {
			this.setSeeker(e);
		}
	}

	seekerEnd() {
		if(this.isSeekerActive) {
			const currentTime = this.webAudio.getCurrentTime();
			this.webAudio.setCurrentTime(this.percentage * this.webAudio.getDuration());
			if(this.state.isPlaying || currentTime == this.webAudio.getDuration()) {
				this.webAudio.play();
				this.setState({ isPlaying: true });
			}
		}
		this.isSeekerActive = false;
	}

	setSeeker(e) {
		const clientX = (e.touches) ? e.touches[0].clientX : e.clientX;
		const position = clientX - this.refs.seeker.getBoundingClientRect().left;
		const width = this.refs.seeker.getBoundingClientRect().width;
		this.percentage = Math.max(Math.min(position / width, 1), 0);
		this.seeker.getChildAt(1).x = this.percentage * this.seekerCanvas.width;
		this.seeker.update();
	}

	toggleVolume() {
		let isMute;
		if(this.state.isMute) {
			this.webAudio.unmute();
			isMute = false;
		} else {
			this.webAudio.mute();
			isMute = true;
		}
		this.setState({ isMute });
	}
	
	render() {
		return (
			<div className='content meari'>
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
							<div className='volume-wrapper' onClick={this.toggleVolume.bind(this)}>
								<i className={`fa ${this.state.isMute? 'fa-volume-off' : 'fa-volume-up'}`}></i>
							</div>
						</div>
						<div className='bottom'>
							<div className='btn play' onClick={this.state.isPlaying ? this.pause.bind(this) : this.play.bind(this)}>{(this.state.isPlaying)? 'PAUSE' : 'PLAY'}</div>
							<a className='btn download' href={this.state.src} download={this.state.src.split('/')[3]} onClick={this.downloadTrack.bind(this)}>DOWNLOAD</a>
						</div>
					</div>
					<ul className='list'>
		                {songs.map((song, songKey) => {
		                	const onClickAll = this.load.bind(this, song.track, 'all');
				            return (
				                <li key={songKey} className={(this.state.track == song.track) ? 'active-song' : ''}>
				                	<span className='col number' onClick={onClickAll}>{song.track}</span>
				                	<span className='col title' onClick={onClickAll}>{song.title}</span>
				                	<span className={`col ${(this.state.voice == 'all') ? 'active-voice' : ''}`} onClick={onClickAll}>All</span>
				                	{this.voices.map((voice, voiceKey) => {
				                		return (
				                			<span key={voiceKey} className={`col ${(this.state.voice == voice) ? 'active-voice' : ''} ${(song.voices.indexOf(voice) < 0) ? 'disabled' : ''}`} onClick={(song.voices.indexOf(voice) > -1 ? this.load.bind(this, song.track, voice) : '')}>{voice}</span>
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