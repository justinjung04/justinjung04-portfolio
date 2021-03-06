import './app.scss';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Home from './components/home/home';
import Meari from './components/meari/meari-desktop';

class App extends Component {	
	render() {
		return (
			<div className='section desktop'>
				{React.cloneElement(this.props.children, {key: this.props.location.pathname})}
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