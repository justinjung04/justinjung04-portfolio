import './app.scss';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { VelocityTransitionGroup } from 'velocity-react';

import Home from './components/home/home';
import Meari from './components/meari/meari-mobile';
import Orientation from './components/orientation/orientation';

class App extends Component {
	constructor() {
		super();

		this.enterAnimation = {
			duration: 500,
			delay: 500,
			easing: 'ease',
			animation: {
				opacity: [1, 0],
				translateY: [0, '5%']
			}
		};

		this.leaveAnimation = {
			duration: 500,
			easing: 'ease',
			animation: {
				opacity: [0, 1],
				translateY: ['5%', 0]
			},
			begin: () => {

			}
		};
	}

	render() {
		return (
			<div className='section mobile'>
				<VelocityTransitionGroup enter={this.enterAnimation} leave={this.leaveAnimation}>
					{React.cloneElement(this.props.children, {key: this.props.location.pathname})}
				</VelocityTransitionGroup>
				<Orientation />
			</div>
		);
	}
};

ReactDOM.render((
	<Router history={browserHistory}>
		<Route path='/' component={App}>
			<IndexRoute component={Home} />
			<Route path='meari' component={Meari} />
		</Route>
	</Router>
), document.getElementById('app'));