import './meari-mobile.scss';

import React, { Component } from 'react';
import hymns from '../../constants/hymns';

export default class Meari extends Component {
	constructor() {
		super();
		this.state = {
			currentTrack: 0,
			currentVoice: '',
			currentSrc: '',
			fileName: ''
		};
	}

	componentDidMount() {
		window.ga('set', 'page', '/meari');
		window.ga('send', 'pageview');
	}

	setTrack(track, voice) {
		let src = 'assets/hymns/' + track + '/' + track;

		switch(voice) {
			case 'soprano':
				src += '_soprano';
				window.ga('send', 'event', 'Soprano', 'listen');
				break;
			case 'alto':
				src += '_alto';
				window.ga('send', 'event', 'Alto', 'listen');
				break;
			case 'tenor':
				src += '_tenor';
				window.ga('send', 'event', 'Tenor', 'listen');
				break;
			case 'bass':
				src += '_bass';
				window.ga('send', 'event', 'Bass', 'listen');
				break;
			default:
				window.ga('send', 'event', 'All', 'listen');
		}

		src += '.mp3';
		this.refs.music.src = src;
		this.refs.music.play();

		this.setState({
			currentTrack: track,
			currentVoice: voice,
			currentSrc: src,
			fileName: src.split('/')[3]
		});
	}

	onClickDownload() {
		switch(this.state.currentVoice) {
			case 'soprano':
				window.ga('send', 'event', 'Soprano', 'download');
				break;
			case 'alto':
				window.ga('send', 'event', 'Alto', 'download');
				break;
			case 'tenor':
				window.ga('send', 'event', 'Tenor', 'download');
				break;
			case 'bass':
				window.ga('send', 'event', 'Bass', 'download');
				break;
			default:
				window.ga('send', 'event', 'All', 'download');
		}
	}

	tracks() {
		const list = hymns.map((item, key) => {
            return (
                <li key={key} className={(this.state.currentTrack == item.track) ? 'active-track' : ''}>
                	<i className='fa fa-play'></i>
                	<span className='number'>{item.track}</span>
                	<span className='title clickable' onClick={this.setTrack.bind(this, item.track, 'all')}>{item.title}</span>
                	<span className={`padding clickable ${(this.state.currentVoice == 'all') ? 'active-voice' : ''}`} onClick={this.setTrack.bind(this, item.track, 'all')}>All</span>
                	{(item.voices.indexOf('soprano') > -1)
                		? <span className={`padding clickable ${(this.state.currentVoice == 'soprano') ? 'active-voice' : ''}`} onClick={this.setTrack.bind(this, item.track, 'soprano')}>
                			Soprano
                		  </span>
                		: <span className='padding clickable disabled'>Soprano</span>
                	}
                	{(item.voices.indexOf('alto') > -1)
                		? <span className={`padding clickable ${(this.state.currentVoice == 'alto') ? 'active-voice' : ''}`} onClick={this.setTrack.bind(this, item.track, 'alto')}>Alto</span>
                		: <span className='padding clickable disabled'>Alto</span>
                	}
                	{(item.voices.indexOf('tenor') > -1)
                		? <span className={`padding clickable ${(this.state.currentVoice == 'tenor') ? 'active-voice' : ''}`} onClick={this.setTrack.bind(this, item.track, 'tenor')}>Tenor</span>
                		: <span className='padding clickable disabled'>Tenor</span>
                	}
                	{(item.voices.indexOf('bass') > -1)
                		? <span className={`padding clickable ${(this.state.currentVoice == 'bass') ? 'active-voice' : ''}`} onClick={this.setTrack.bind(this, item.track, 'bass')}>Bass</span>
                		: <span className='padding clickable disabled'>Bass</span>
                	}
                </li>
            );
        });

        return (
            <ul>
                {list}
            </ul>
        );
	}
	
	render() {
		return (
			<div className='content meari'>
				{(this.state.currentSrc == '')
					? <div className='btn disabled'>
						PLEASE SELECT A SONG
					  </div>
					: <a className='btn' href={this.state.currentSrc} download={this.state.fileName} onClick={this.onClickDownload.bind(this)}>
						<span className='fa fa-download'></span>
						DOWNLOAD
					  </a>
				}
				<audio ref='music' controls>
					<source src='' type='audio/mp3' />
				</audio>
				<div className='track-list'>
					{this.tracks()}
					<div className='fade-out'></div>
				</div>
			</div>
		);
	}
}