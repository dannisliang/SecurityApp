/*
App
=============
This component handles the main skeleton app structure (header, content, footer)
*/
import React, {PropTypes} from 'react';
import {RouterMixin} from 'react-mini-router';
import Addons from 'react/addons';
import Navigation from './Navigation.jsx';
import VideoAndMotion from './VideoAndMotion.jsx';
import Arm from './Arm.jsx';

import MotionSettings from './MotionSettings.jsx';
var PureRenderMixin = Addons.addons.PureRenderMixin;

export default React.createClass({
	mixins: [PureRenderMixin, RouterMixin],
	// ROUTES /////////////////////////////
	routes: {
		'/'      : 'content',
		'/:mode' : 'content'
	},
	// RENDERING //////////////////////////
	render: function() {
		return this.renderCurrentRoute();
	},
	content: function(path) {
		if(typeof path === 'object') { path = false; }   // when no mode is passed it defaults to object in react-mini-router for some reason, so just convert it to false instead
		let className = 'fill' + (path ? ' section-'+path : '');
		let contentClassName = 'fl' + (path ? ' active' : '');
		switch(path) {
			case 'settings':
				this.currentContentComponent = <MotionSettings />;
				break;
			case 'arm':
				this.currentContentComponent = <Arm />;
				break;
			default:
				break;
		}
		return (
			<div className={className}>
				<Navigation path={path} />
				<div id="content-container" className={contentClassName}>
					<div id="content-container-inner" className="fl">
						{this.currentContentComponent}
					</div>
				</div>
				<VideoAndMotion />
			</div>
		);
	}
});