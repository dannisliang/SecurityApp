/*
ContentRouter
=============
This component handles rendering main content pages to the screen via react-router
*/

// IMPORTS ///////////////////////////////
import React from 'react';
import {RouterMixin} from 'react-mini-router';

// CLASS /////////////////////////////////
export default React.createClass({
	mixins: [RouterMixin],
	routes: {
		'/'      : 'none',
		'/:mode' : 'settings'
	},
	render   : function() { return this.renderCurrentRoute(); },
	none     : function() { return <div></div>; },
	settings : function() { return <div>SETTINGS</div>; }
});