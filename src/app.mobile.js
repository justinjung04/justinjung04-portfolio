import './app.scss';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Home from './components/home/home';
import Meari from './components/meari/meari-mobile';
import Orientation from './components/orientation/orientation';

class App extends Component {
	render() {
		return (
			<div className='section mobile'>
				{React.cloneElement(this.props.children, {key: this.props.location.pathname})}
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