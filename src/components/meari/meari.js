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
		this.isSeekerActive = false;
	}

	componentDidMount() {
		this.refs.music.volume = this.state.volume;
		this.refs.music.onplay = this.setPlay.bind(this, true);
		this.refs.music.onpause = this.setPlay.bind(this, false);
		this.refs.music.onended = this.setPlay.bind(this, false);
		if(process.env.NODE_ENV == 'production') {
			window.ga('set', 'page', '/meari');
			window.ga('send', 'pageview');	
		}
	}

	setPlay(start) {
		let isPlaying;
		if(start) {
			this.seekerProgress = setInterval(() => {
				const seekerWidth = (this.refs.music.currentTime / this.refs.music.duration * 100) + '%';
				this.setState({ seekerWidth });
			}, 200);
			isPlaying = true;
		} else {
			clearInterval(this.seekerProgress);
			isPlaying = false;
		}
		this.setState({ isPlaying });
	}

	setTrack(track, voice) {
		let src = 'assets/songs/' + track + '/' + track;
		if(voice != 'all') {
			src += '_' + voice;
		}
		src += '.mp3';
		this.refs.music.src = src;
		this.refs.music.play();
		this.setState({ track, voice, src });
		if(process.env.NODE_ENV == 'production') {
			window.ga('send', 'event', voice, 'listen', track);
		}
	}

	toggleMusic(e) {
		e.preventDefault();
		e.stopPropagation();
		if(this.state.isPlaying) {
			this.refs.music.pause();
		} else {
			this.refs.music.play();
		}
	}

	downloadTrack() {
		if(process.env.NODE_ENV == 'production') {
			window.ga('send', 'event', this.state.voice, 'download', this.state.track);
		}
	}

	seekerStart(e) {
		this.isSeekerActive = true;
		this.setSeeker(e);
	}

	seekerMove(e) {
		if(this.isSeekerActive) {
			this.setSeeker(e);
		}
	}

	seekerEnd() {
		this.isSeekerActive = false;
	}

	setSeeker(e) {
		let clientX = (e.touches) ? e.touches[0].clientX : e.clientX;
		const position = clientX - this.refs.seeker.getBoundingClientRect().left - 5;
		const width = this.refs.seeker.getBoundingClientRect().width - 10;
		const percentage = Math.max(Math.min(position / width, 1), 0);
		const seekerWidth = (percentage * 100) + '%';
		this.refs.music.currentTime = this.refs.music.duration * percentage;
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
		let clientX = (e.touches) ? e.touches[0].clientX : e.clientX;
		const position = clientX - this.refs.volume.getBoundingClientRect().left - 5;
		const width = this.refs.volume.getBoundingClientRect().width - 10;
		const volume = Math.max(Math.min(position / width, 1), 0);
		const isMute = (volume == 0) ? true : false;
		this.refs.music.volume = volume;
		this.setState({ isMute, volume });
	}

	muteVolume(e) {
		let isMute;
		if(this.state.isMute) {
			this.refs.music.volume = this.state.volume;
			isMute = false;
		} else {
			this.refs.music.volume = 0;
			isMute = true;
		}
		this.setState({ isMute });
	}
	
	render() {
		return (
			<div className='content meari'>
				<audio ref='music'>
					<source src='' type='audio/mp3' />
				</audio>
				<div className='player'>
					{(this.state.src == '')
						? <div className='control'>PLEASE SELECT A SONG</div>
						: <div className='control'>
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
								<div className='btn play' onClick={this.toggleMusic.bind(this)}>{(this.state.isPlaying)? 'PAUSE' : 'PLAY'}</div>
								<a className='btn download' href={this.state.src} download={this.state.src.split('/')[3]} onClick={this.downloadTrack.bind(this)}>DOWNLOAD</a>
							</div>
						  </div>
					}
					<ul className='list'>
		                {songs.map((song, songKey) => {
		                	const onClickAll = this.setTrack.bind(this, song.track, 'all');
				            return (
				                <li key={songKey} className={(this.state.track == song.track) ? 'active-song' : ''}>
				                	<i className='col fa fa-play'></i>
				                	<span className='col number' onClick={onClickAll}>{song.track}</span>
				                	<span className='col title' onClick={onClickAll}>{song.title}</span>
				                	<span className={`col ${(this.state.voice == 'all') ? 'active-voice' : ''}`} onClick={onClickAll}>All</span>
				                	{this.voices.map((voice, voiceKey) => {
				                		return (
				                			<span key={voiceKey} className={`col ${(this.state.voice == voice) ? 'active-voice' : ''} ${(song.voices.indexOf(voice) < 0) ? 'disabled' : ''}`} onClick={(song.voices.indexOf(voice) > -1 ? this.setTrack.bind(this, song.track, voice) : '')}>{voice}</span>
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