import React, { Component } from 'react';
import hymns from '../../constants/hymns';

export default class Meari extends Component {
	constructor() {
		super();
		this.state = {
			track: 0,
			voice: '',
			src: ''
		};
		this.voices = ['soprano', 'alto', 'tenor', 'bass'];
	}

	componentDidMount() {
		if(process.env.NODE_ENV == 'production') {
			window.ga('set', 'page', '/meari');
			window.ga('send', 'pageview');	
		}
	}

	setTrack(track, voice) {
		let src = 'assets/hymns/' + track + '/' + track;
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

	onClickDownload() {
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
					<div className='control'>
						<div className='btn play'>PLAY</div>
						{(this.state.src == '')
							? <div className='btn download disabled'>PLEASE SELECT A SONG</div>
							: <a className='btn download' href={this.state.src} download={this.state.src.split('/')[3]} onClick={this.onClickDownload.bind(this)}>DOWNLOAD</a>
						}
					</div>
					<ul className='list'>
		                {hymns.map((item, key) => {
		                	const listClass = (this.state.track == item.track) ? 'active-song' : '';
		                	const onClickAll = this.setTrack.bind(this, item.track, 'all');
		                	const voiceAllClass = `col ${(this.state.voice == 'all') ? 'active-voice' : ''}`;
				            return (
				                <li key={key} className={listClass}>
				                	<i className='col fa fa-play'></i>
				                	<span className='col number' onClick={onClickAll}>{item.track}</span>
				                	<span className='col title' onClick={onClickAll}>{item.title}</span>
				                	<span className={voiceAllClass} onClick={onClickAll}>All</span>
				                	{this.voices.map((voice, key) => {
				                		let voiceClass, onClickVoice;
				                		if(item.voices.indexOf(voice) > -1) {
				                			voiceClass = `col ${(this.state.voice == voice) ? 'active-voice' : ''}`;;
				                			onClickVoice = this.setTrack.bind(this, item.track, voice);
				                		} else {
				                			voiceClass = 'col disabled';
				                			onClickVoice = ''
				                		}
				                		return (
				                			<span key={key} className={voiceClass} onClick={onClickVoice}>{voice}</span>
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