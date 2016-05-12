import MobileDetect from 'mobile-detect';

const md = new MobileDetect(window.navigator.userAgent);
const device = ((md.mobile() && md.phone() != null) ? 'phone' : 'desktop');
let bundle;

if(/(chrome|safari|firefox)/i.test(window.navigator.userAgent)) {
	if(device == 'desktop') {
		bundle = 'bundle.desktop.js';
	} else {
		bundle = 'bundle.mobile.js';
	}
} else {
	bundle = 'bundle.nosupport.js';
}

const script = document.createElement('script');
script.setAttribute('src', bundle);

document.body.appendChild(script);