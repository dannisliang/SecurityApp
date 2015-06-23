/*
ContentRouter
=============
This component handles rendering main content pages to the screen via react-router
*/

// IMPORTS ///////////////////////////////
import React from 'react';
import {RouterMixin} from 'react-mini-router';
import Setup from './Setup.jsx';
import MotionActions from '../actions/MotionActions';

// CLASS /////////////////////////////////
export default React.createClass({
	mixins: [RouterMixin],
	routes: {
		'/'         : 'setup',
		'/:mode'    : 'setup'
	},
	render: function() {
		return this.renderCurrentRoute();
	},
	setup: function(mode) {
		if(typeof mode === 'object') { mode = false; }   // when no mode is passed it defaults to object in react-mini-router for some reason
		return (
			<Setup mode={mode} />
		);
	}
});