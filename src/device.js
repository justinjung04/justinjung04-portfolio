import MobileDetect from 'mobile-detect';

var md = new MobileDetect(window.navigator.userAgent);
var device = ((md.mobile() && md.phone() != null) ? 'phone' : 'desktop');
var bundle;

if(/(chrome|safari|firefox|iphone)/i.test(window.navigator.userAgent)) {
	if(device == 'desktop') {
		bundle = 'bundle.desktop.js';
	} else {
		bundle = 'bundle.mobile.js';
	}
} else {
	bundle = 'bundle.nosupport.js';
}

var script = document.createElement('script');
script.setAttribute('src', bundle);

document.body.appendChild(script);