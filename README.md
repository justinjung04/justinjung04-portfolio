# Webpack Biolerplate

This is a boilerplate that utilizes Webpack with React. The purpose is to have a light base template that has only necessary modules. The modules included in this boilerplate are:

* Dev Server with webpack-dev-server (https://github.com/webpack/webpack-dev-server)
* Routing with react-router (https://github.com/rackt/react-router)
* Animation with velocity-react (https://github.com/twitter-fabric/velocity-react)
* Device Detection with mobile-detect (https://github.com/hgoebl/mobile-detect.js)

Depending on project, extra modules may be added using `npm install <module> --save-dev`. If you add any extra module, it is highly recommended to document it in this README so that others can re-use them easily in the future.

### Install and Run

* Clone repository

```sh
$ git clone git@git.assembla.com:tb-internal.webpack-boilerplate.git
```

* Install modules and run server

```sh
$ npm install
$ npm run serve
```

### Build

* Go to *app/dist/index.html* and delete the lines `<script src='http://localhost:8080/webpack-dev-server.js'></script>`

* Run the following code:

```sh
$ npm run build
```

___

# Modules

This section contains modules that have been used in previous projects. Tricky examples for each module are documented.


# webpack-dev-server

https://github.com/webpack/webpack-dev-server

### Installation

```sh
$ npm install webpack-dev-server --save-dev
```

### Running the server that can be accessed with IP address

The recommendation from github is the following: `webpack-dev-server --content-base app/dist/`. HOWEVER, the script doesn't allow the website to be access from other devices in the network using IP address (i.e. if you want to view the website on your mobile device, you can't). A workaround is the following: `webpack-dev-server --host --content-base 0.0.0.0 app/dist/`. This code allows the local machine to access through "localhost:8080" and other devices to access through "<IPaddress>:8080".

### Watching source files for change and auto-refreshing browser

I have used 'inline mode' that was explained in webpack documentation. It is to add `<script src='http://localhost:8080/webpack-dev-server.js'></script>` to html. Before release, the line must be removed from the html.


# react-router

https://github.com/rackt/react-router

### Installation

```sh
$ npm install react-router --save-dev
```

### URL & History

The boilerplate uses a class called createHashHistory as a default. It generates url with /#[sub-directory][hash-value], and is implemented in *app.js* by the following:

```javascript
import { createHashHistory }  from 'history';
...
<Router history={createHashHistory()}>
```

There is another class called createHistory. It generates url with /[sub-directory], and is implemented in *app.js* by the following:

```javascript
import { createHistory }  from 'history';
...
<Router history={createHistory()}>
```

HOWEVER, there are some drawbacks. When a user wants to access the sub-directory directly, it will throw an error (i.e. navigation starting at `localhost:8080` would work, but refreshing at `localhost:8080/page1` wouldn't work) . This is because there is no rewrite on webpack-dev-server, and thus makes it very annoying when developing. If you want to use createHistory, it is recommended to add it before release along with url rewrite.

###### *Side-note URL rewrite*

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

### Installation

```sh
$ npm install velocity-react --save-dev
```

### VelocityComponent

Component to add animations to an element and its children. Must Wrap only single element.

```javascript
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
<VelocityTransitionGroup enter={this.enterAnimation} leave={this.leaveAnimation}>
    // here, you must pass a unique key for each child as a property. window.location is a good example of a unique key
    // you can also pass extra properties to children
    {React.cloneElement(this.props.children, {key: window.location, extraProp: 'extraProp'})}
</VelocityTransitionGroup>
```

For a live example with complete code, please refer to *app/src/app.js*.


# mobile-detect

https://github.com/hgoebl/mobile-detect.js

### Installation

```sh
$ npm install mobile-detect --save-dev
```