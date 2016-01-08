import './app.scss';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MobileDetect from 'mobile-detect';
import { Router, Route, IndexRoute } from 'react-router';
import { VelocityTransitionGroup } from 'velocity-react';
import { createHashHistory }  from 'history';

import Header from './components/header/header';
import Home from './components/home/home';
import Page1 from './components/page1/page1';

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
	    }
	  };

	  let md = new MobileDetect(window.navigator.userAgent);
	  this.device = ((md.mobile() && md.phone() != null) ? 'phone' : 'desktop');
	}

	componentDidMount() {
		
	}

	render() {
		return (
			<div className={'section ' + this.device}>
				<Header device={this.device} url={this.props.location.pathname} />
				<VelocityTransitionGroup enter={this.enterAnimation} leave={this.leaveAnimation}>
					{React.cloneElement(this.props.children, {key: this.props.location.pathname, url: this.props.location.pathname, device: this.device})}
				</VelocityTransitionGroup>
			</div>
		);
	}
};

ReactDOM.render((
	<Router history={createHashHistory()}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='page1' component={Page1} />
    </Route>
  </Router>
), document.getElementById('app'));