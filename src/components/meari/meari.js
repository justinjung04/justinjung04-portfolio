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
		this.refs.music.volume = this.state.volume;
		if(process.env.NODE_ENV == 'production') {
			window.ga('set', 'page', '/meari');
			window.ga('send', 'pageview');	
		}
	}

	setTrack(track, voice) {
		let src = 'assets/songs/' + track + '/' + track;
		if(voice != 'all') {
			src += '_' + voice;
		}
		src += '.mp3';
		this.refs.music.src = src;
		this.refs.music.play();
		this.setState({ track, voice, src, isPlaying: true });
		if(process.env.NODE_ENV == 'production') {
			window.ga('send', 'event', voice, 'listen', track);
		}
	}

	toggleMusic() {
		let isPlaying;
		if(this.state.isPlaying) {
			this.refs.music.pause();
			isPlaying = false;
		} else {
			this.refs.music.play();
			isPlaying = true;	
		}
		this.setState({ isPlaying });
	}

	toggleVolume() {
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

	trackDownload() {
		if(process.env.NODE_ENV == 'production') {
			window.ga('send', 'event', this.state.voice, 'download', this.state.track);
		}
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
									<svg className='seeker' ref='seeker'>
										<rect className='empty' x='0' y='45%' />
										<rect className='filled' x='0' y='45%' />
									</svg>
								</div>
								<div className='volume-wrapper'>
									<i className={`fa ${this.state.isMute? 'fa-volume-off' : 'fa-volume-up'}`} onClick={this.toggleVolume.bind(this)}></i>
									<svg className='volume' ref='volume'>
										<rect className='empty' x='0' y='45%' />
										<rect className='filled' x='0' y='45%' width={`${(this.state.isMute? '0' : this.state.volume * 100)}%`} />
									</svg>
								</div>
							</div>
							<div className='bottom'>
								<div className='btn play' onClick={this.toggleMusic.bind(this)}>{(this.state.isPlaying)? 'PAUSE' : 'PLAY'}</div>
								
								<a className='btn download' href={this.state.src} download={this.state.src.split('/')[3]} onClick={this.trackDownload.bind(this)}>DOWNLOAD</a>
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