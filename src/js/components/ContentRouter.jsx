/*
ContentRouter
=============
This component handles rendering main content pages to the screen via react-router
*/

// IMPORTS ///////////////////////////////
import React from 'react';
import {RouterMixin} from 'react-mini-router';
import App from './App.jsx';
import Home from './Home.jsx';
import Arm from './Arm.jsx';
import Images from './Images.jsx';

// CLASS /////////////////////////////////
export default React.createClass({
	mixins: [RouterMixin],
	routes: {
		'/' : 'home',
		'/arm': 'arm'
	},
	render: function() {
        return this.renderCurrentRoute();
    },
	home: function() {
		return <Home />
	},
	arm: function() {
		return <Arm />
	}
});