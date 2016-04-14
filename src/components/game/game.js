import './game.scss';

import React, { Component } from 'react';
import Player from '../player/player';

export default class Game extends Component {
	constructor() {
		super();
		this.state = {
			leadingPlayer: 0,
			biddings: [],
			message: 'Players bidding...',
			status: 'open'
		};
	}

	addBidding(bidding) {
		let biddings = this.state.biddings;
		if(this.state.leadingPlayer == 0) {
			biddings.push(bidding);
		} else {
			biddings.unshift(bidding);
		}
		this.setState({ biddings });
	}

	compareBiddings() {
		let message, leadingPlayer;
		// console.log(this.state.biddings);
		if(this.state.biddings[0] > this.state.biddings[1]) {
			this.refs.player1.incrementScore();
			leadingPlayer = 0;
			message = 'Justin won!';
		} else if(this.state.biddings[0] < this.state.biddings[1]) {
			this.refs.player2.incrementScore();
			leadingPlayer = 1;
			message = 'Daniel won!';
		} else if(this.state.biddings[0] == this.state.biddings[1]) {
			leadingPlayer = this.state.leadingPlayer;
			message = 'Draw!';
		} else {
			alert('error!');
			return;
		}

		this.setState({
			leadingPlayer,
			message,
			biddings: [],
			status: 'closed'
		});
	}

	nextBidding() {
		this.refs.player1.nextBidding();
		this.refs.player2.nextBidding();
		this.setState({
			message: 'Players bidding...',
			status: 'open'
		});
	}
	
	render() {
		return (
			<div className='content game'>
				<Player ref='player1' name='justin' addBidding={this.addBidding.bind(this)} active={((this.state.leadingPlayer == 0) || (this.state.biddings.length > 0))} />
				<Player ref='player2' name='daniel' addBidding={this.addBidding.bind(this)} active={((this.state.leadingPlayer == 1) || (this.state.biddings.length > 0))} />
				{(this.state.biddings.length == 2)
					? <button onClick={this.compareBiddings.bind(this)}>
						Get winner
					  </button>
					: false
				}
				{(this.state.status == 'closed')
					? <button onClick={this.nextBidding.bind(this)}>
						Next round
					  </button>
					: false
				}
				<div>
					{this.state.message}
				</div>
			</div>
		);
	}
}