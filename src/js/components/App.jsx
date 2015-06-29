/*
App
=============
This component handles the main skeleton app structure (header, content, footer) as well as pushstate routing
*/
import React, {PropTypes} from 'react/addons';
import {RouterMixin, navigate} from 'react-mini-router';
import Debug from './Debug.jsx';
import Navigation from './Navigation.jsx';
import VideoAndMotion from './VideoAndMotion.jsx';
import Arm from './Arm.jsx';
import Settings from './Settings.jsx';
import AppActions from '../actions/AppActions';
import AppStore from '../stores/AppStore';

export default React.createClass({
	mixins: [React.addons.PureRenderMixin, RouterMixin],
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
		'/'      : '_content',
		'/:path' : '_content'
	},
// RENDERING //////////////////////////
	/*
		Handles overall rendering of all content. renderCurrentRoute is a method in react-mini-router
		that renders components from the _content method.
	*/
	render: function() {
		let debugComponent = this.state.debug ? <Debug /> : null;   // hidden debug component (accessible by pressing "D" key)
		return (
			<div className="fill">
				{debugComponent}
				{this.renderCurrentRoute()}
			</div>
		)
	},
	/*
		Returns content components based on the current path
	*/
	_getContent: function(path) {
		switch(path) {
			case 'settings':
				return <Settings />;
				break;
			case 'arm':
				return <Arm />;
				break;
			default:
				return null;
				break;
		}
	},
	/*
		Handles checking prerequsites for certain paths. For example,
		arm, settings, etc paths require webcam video feed to be working.
	*/
	_checkPrerequsites: function(path) {
		let allowed = true;
		switch(path) {
			case 'settings':
			case 'arm':
				allowed = this.state.webcam;
				break;
		}
		return allowed;
	},
	/*
		Handles core rendering of all content. Note that I'm not using react-mini-router how it's
		normally used with a rendering method for each route because I want to be able to use
		react's css transition group to transition between path content
	*/
	_content: function(path) {
		if(typeof path === 'object') { path = false; }      // when no mode is passed it defaults to object in react-mini-router for some reason, so just convert it to false instead
		if(!this._checkPrerequsites(path)) {                // check if the current route is allowed (for example, arm and settings sections require webcam video to be working)
			setTimeout(function(){ navigate('/'); }, 0);    // redirect back to home if route is invalid
		}
		return (
			<div className={'fill'+(path ? ' section-'+path : '')}>
				<Navigation path={path} />
					<div id="content-container" className={'fl'+(path ? ' active' : '')}>
						<div id="content-container-inner" className="fl">
							{this._getContent(path)}
						</div>
					</div>
				<VideoAndMotion />
			</div>
		);
	}
});