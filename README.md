# Webpack Boilerplate

This is a boilerplate that utilizes Webpack with React. The purpose is to have a light base template that has only necessary modules. The modules included in this boilerplate are:

* Dev server with express (http://expressjs.com)
* Hot module replacement with react-transform-hmr (https://github.com/gaearon/react-transform-hmr)
* Routing with react-router (https://github.com/rackt/react-router)
* Animation with velocity-react (https://github.com/twitter-fabric/velocity-react)
* Device detection with mobile-detect (https://github.com/hgoebl/mobile-detect.js)
* Central & unidirectional data flow with js-signals (https://github.com/millermedeiros/js-signals)
* Code linting with eslint (http://eslint.org)

##### Depending on project, extra modules may be added using `npm install [module] --save-dev`. If you add any extra module, it is highly recommended to document it in this README so that others can re-use them easily in the future.

### How to use

* Clone repository

```sh
$ git clone git@git.assembla.com:tb-internal.webpack-boilerplate.git
```

* Install modules and run dev server

```sh
$ npm install
$ npm start
```

* Build

```sh
$ npm run build
```

### Optimization

In order to optimize javascript for adaptive websites, it was necessary to dynamically load javascript depending on the detected device. It is done by dynamically adding a script tag. `device.js` imports `mobile-detect` to determine the device from front-end, and creates a script tag with a javascript source that is relevant. Refer to `device.js` for details.

### Inheritance

For components that will have different views for different devices, we can utilize class inheritance to keep the common logic in parent class and to make appropriate views in child classes. States and methods from the parent are inherited to children, and they can be easily extended and overridden. Refer to `header.js`, `header-desktop.js` and `header-mobile.js` for details.

### Central & unidirectional data flow

Motivated by Flux and Redux, this pattern is focused to achieve three main goals:
* Easy to get data
* Easy to update data
* Easy to listen to data update

The steps involved behind are:
* Save all possible states, events and actions in a single global object called `signal`
* Every component gets the global states and save it to its own states `this.state = signal.state`. However, we will only respond to states that are relavant to the component by selectively subscribing to states of interest
* To update a state of interest, a method from the signal object is called `signal.incrementCount()`
* Inside the signal object, a state from the global object is modified, and triggers an event to broadcast the updated value `this.event.count.dispatch(this.state.count)`
* A component subscribed to the state receives the broadcast and updates its own state `this.setState({ count })`
* The state gets updated, the component gets re-rendered

Example code:

```javascript
import React, { Component } from 'react';
import signal from '../../signal/signal'; //import

export default class Example extends Component {
    constructor() {
        this.states = signal.state; //get all states
        this.setCount = (count) => { this.setState({ count }); }; //callback function when a state of interest updates
    }

    componentDidMount() {
        signal.event.count.add(this.setCount); //subscribe to a state of interest
    }

    componentWillUnmount() {
        signal.event.count.remove(this.setCount); //unsubsribe to a state of interest
    }

    onClick() {
        signal.incrementCount(); //dispatch an action to update a state of interest
    }
    ...
}
```

Although we have a single object that contains everything, you can separate your signals into different groups and keep them in separate files such as `signal-global.js`, `signal-page1.js`. The global object `signal.js` will simply aggregate all the signal files and create a single point of entry. 

```javascript
import Signals from 'signals';

export default class SignalPage1 {
    constructor() {
        this.state = {
            page1Word: 'cool' //state
        };

        this.event = {
            page1Word: new Signals() //signal to broadcast/receive. note name is maching with state for ease of use
        };

        //method to update the global state. broadcasts the updated state at the end
        this.togglePage1Word = function() {
            this.state.page1Word = (this.state.page1Word == 'cool' ) ? 'awesome' : 'cool';
            this.event.page1Word.dispatch(this.state.page1Word);
        };
    }
}
```

```javascript
import SignalGlobal from './signal-global';
import SignalPage1 from './signal-page1';

let instance = null;

class Signal {
    constructor() {
        if(instance) {
            return instance; //singleton class
        }
        instance = this;

        //list of all signals
        let allSignals = [
            new SignalGlobal(),
            new SignalPage1()
        ];

        allSignals.map((signal) => {
            Object.assign(this, signal); //aggregate all functions
        });

        allSignals.map((signal) => {
            Object.assign(this.state, signal.state); //aggregate states
            Object.assign(this.event, signal.event); //aggregate events
        });
    }
}

export default (new Signal());
```

# Modules

This section contains modules that have been used in previous projects. Tricky examples for each module are documented.

# react-router

https://github.com/rackt/react-router

### URL & History

The boilerplate uses a class called createHashHistory as a default. It generates url with /#[sub-directory][hash-value], and is implemented in `app.js` by the following:

```javascript
import { createHashHistory } from 'history';
...
<Router history={createHashHistory()}>
```

There is another class called createHistory. It generates url with /[sub-directory], and is implemented in `app.js` by the following:

```javascript
import { createHistory } from 'history';
...
<Router history={createHistory()}>
```

HOWEVER, there are some drawbacks. When a user wants to access the sub-directory directly, it will throw an error (i.e. navigation starting at `localhost:8080` would work, but refreshing at `localhost:8080/page1` wouldn't work) . This is because there is no rewrite on webpack-dev-server, and thus makes it very annoying when developing. If you want to use createHistory, it is recommended to add it before release along with url rewrite.

###### *Side-note: URL rewrite*

If the hosting server is Apache, you can add a file *.htaccess* and copy the following code:

```
RewriteEngine On  
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d
RewriteRule ^ - [L]
RewriteRule ^ /index.html [L]
```

*If you know how to do url rewrite on node.js server, please add it here!*

### Navigating pages programatically

Navigating pages programatically requires History mixin.

```javascript
import ReactMixin from 'react-mixin';
import { History } from 'react-router';

export default class MyClass {
    navigateToPage1() {
        this.history.pushState(null, '/page1');
    }
    navigateBackOnce() {
        this.history.goBack();
    }
    navigateBackTwice() {
        this.history.go(-2);
    }
}
ReactMixin.onClass(MyClass, History);
```

# velocity-react

https://github.com/twitter-fabric/velocity-react

### VelocityComponent

Component to add animations to an element and its children. Must wrap a single element only.

```javascript
import { VelocityComponent } from 'velocity-react';

this.fadeAwayAnimation = {
    duration: 500,
    delay: 500,
    easing: 'ease',
    animation: {
        opacity: [0, 1], // [{to}, {from}]
    }
};
...
<VelocityComponent {...this.fadeAwayAnimation}>
    <div className='element'>
        <div className='child-element'></div>
        <div className='child-element'></div>
    </div>
</VelocityComponent>
```

### VelocityTransitionGroup

Add enter and leave animations to an element when mounting and unmounting respectively. Useful for creating page transitions.

```javascript
import { VelocityTransitionGroup } from 'velocity-react';

this.enterAnimation = {
    duration: 500,
    delay: 500,
    easing: 'ease',
    animation: {
        opacity: [1, 0],  // [{to}, {from}]
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
...
<VelocityTransitionGroup enter={this.enterAnimation} leave={this.leaveAnimation}>
    // here, you must pass a unique key for each child as a property. window.location is a good example of a unique key
    // you can also pass extra properties to children
    {React.cloneElement(this.props.children, {key: window.location, extraProp: 'extraProp'})}
</VelocityTransitionGroup>
```

For a live example with complete code, please refer to `app/src/app.js`.