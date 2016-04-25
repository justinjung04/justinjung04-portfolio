import './meari-mobile.scss';

import React from 'react';
import Meari from './meari';

export default class MeariMobile extends Meari {
	getSeekerWrapper(innerComponent) {
		return (
			<div className='seeker-wrapper' onMouseDown={super.seekerStart.bind(this)} onMouseMove={super.seekerMove.bind(this)} onMouseUp={super.seekerEnd.bind(this)}>
				{innerComponent}
			</div>
		);
	}
}