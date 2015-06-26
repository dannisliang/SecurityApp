/*
App
=============
This component handles the main skeleton app structure (header, content, footer) as well as pushstate routing
*/
import React, {PropTypes} from 'react';
import {RouterMixin} from 'react-mini-router';
import Addons from 'react/addons';
import Debug from './Debug.jsx';
import Navigation from './Navigation.jsx';
import VideoAndMotion from './VideoAndMotion.jsx';
import Arm from './Arm.jsx';
import Settings from './Settings.jsx';
import AppActions from '../actions/AppActions';
import AppStore from '../stores/AppStore';
var PureRenderMixin = Addons.addons.PureRenderMixin;
var ReactCSSTransitionGroup = Addons.addons.CSSTransitionGroup;

export default React.createClass({
	mixins: [PureRenderMixin, RouterMixin],
	// INITIAL STATE ////////////////////////
	getInitialState: function() {
		return AppStore.getAll();
	},
	// LIFECYCLE //////////////////////////
	componentDidMount: function() {
		AppStore.addChangeListener(this._onChange);
		document.addEventListener('keyup', this._handleKeyUp);  // used for triggering debug mode via "D" key
	},
	componentWillUnmount: function() {
		AppStore.removeChangeListener(this._onChange);
		document.removeEventListener('keyup');
	},
	// EVENT HANDLERS ////////////////////////
	_onChange: function() {
		this.setState(AppStore.getAll());
	},
	_handleKeyUp: function(event) {
		if(event.keyCode !== 68) { return; }   // used for triggering debug mode via "D" key
		AppActions.debug(!this.state.debug);
	},
	// ROUTES /////////////////////////////
	routes: {
		'/'            : '_content',
		'/:path'        : '_content'
	},
	// RENDERING //////////////////////////
	render: function() {
		let debugComponent = this.state.debug ? <Debug /> : null;
		return (
			<div className="fill">
				{debugComponent}
				{this.renderCurrentRoute()}
			</div>
		)
	},
	_getContent: function(path) {
		let content = null;
		switch(path) {
			case 'settings':
				content = <Settings key={'settings'} />;
				break;
			case 'arm':
				content = <Arm key={'arm'} />;
				break;
		}
		return content;
	},
	_content: function(path) {
		if(typeof path === 'object') { path = false; }   // when no mode is passed it defaults to object in react-mini-router for some reason, so just convert it to false instead
		return (
			<div className={'fill'+(path ? ' section-'+path : '')}>
				<Navigation path={path} />
					<div id="content-container" className={'fl'+(path ? ' active' : '')}>
						<div id="content-container-inner" className="fl">
							<ReactCSSTransitionGroup className="fill" component="div" transitionName="content">
								{this._getContent(path)}
							</ReactCSSTransitionGroup>
						</div>
					</div>
				<VideoAndMotion />
			</div>
		);
	}
});