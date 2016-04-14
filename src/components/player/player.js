import './player.scss';

import React, { Component } from 'react';

export default class Player extends Component {
	constructor() {
		super();
		this.state = {
			initialPoints: 99,
			pointsLeft: 99,
			pointsBid: -1,
			score: 0,
			status: 'open'
		};
	}

	startBidding() {
		this.setState({
			status: 'bidding'
		});
	}

	submitBidding() {
		const bidding = this.refs.bidding.value;
		if(bidding.length == 0 || bidding > this.state.pointsLeft || bidding < 0) {
			return;
		}
		this.setState({
			pointsBid: bidding,
			pointsLeft: this.state.pointsLeft - bidding,
			status: 'closed'
		});
		this.props.addBidding(bidding);
	}

	cancelBidding() {
		this.setState({
			status: 'open'
		});
	}

	nextBidding() {
		this.setState({
			status: 'open'
		});
	}

	incrementScore() {
		this.setState({
			score: this.state.score + 1
		});
	}
	
	render() {
		let color, range;

		if(this.state.pointsBid > -1) {
			if(this.state.pointsBid < 10) {
				color = 'black';
			} else {
				color = 'white';
			}
		} else {
			color = 'transparent';
		}

		if(this.state.status == 'open') {
			color = 'transparent';
		}

		if(this.state.pointsLeft < 20) {
			range = '0 ~ 19';
		} else if(this.state.pointsLeft < 40) {
			range = '20 ~ 39';
		} else if(this.state.pointsLeft < 60) {
			range = '40 ~ 59';
		} else if(this.state.pointsLeft < 80) {
			range = '60 ~ 79';
		} else {
			range = '80 ~ 99';
		}

		return (
			<div className='player'>
				<div className='one name'>
					{this.props.name}
				</div>
				<div className={'one ' + color}></div>
				<div className='one'>
					Points left: {range}
				</div>
				<div className='one'>
					Score: {this.state.score}
				</div>
				<div className='one'>
					{(this.state.status == 'open' && this.props.active)
						? <button onClick={this.startBidding.bind(this)}>
							start
						  </button>
						: false
					}
				</div>
				<div className='three'>
					{(this.state.status == 'bidding')
						? <div>
							<div>
								Points left: {this.state.pointsLeft}
							</div>
							<input ref='bidding'/>
							<button onClick={this.submitBidding.bind(this)}>
								bid
							</button>
							<button onClick={this.cancelBidding.bind(this)}>
								cancel
							</button>
						  </div>
						: false
					}
				</div>
			</div>
		);
	}
}