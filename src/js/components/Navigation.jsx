/*
Navigation
=============
This component handles the main side icon menu functionality
*/

import React from 'react/addons';
import AppStore from '../stores/AppStore';
import {navigate} from 'react-mini-router';
import DropboxActions from '../actions/DropboxActions';

export default React.createClass({
	mixins: [React.addons.PureRenderMixin],
	// INITIAL STATE ////////////////////////
	getInitialState: function() {
		return AppStore.getAll();
	},
	// LIFECYCLE //////////////////////////
	componentDidMount: function() {
		AppStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		AppStore.removeChangeListener(this._onChange);
	},
	// EVENT HANDLERS ////////////////////////
	_onChange: function() {
		this.setState(AppStore.getAll());
	},
	// INPUT EVENT HANDLERS ///////////////
	_navigate: function(destination, event) {
		event.preventDefault();
		// if user is clicking on an already opened section we need to toggle it closed
		let dest = this.props.path === destination ? '/' : destination;
		// navigate is a method in react-mini-router used for routing.
		// it needs a delay here because of a strange bug with react-mini-router
		// rendering twice unless navigate is in a delay
		setTimeout(function() { navigate(dest); }, 0);
		// if user is moving to the arm section of the app, we should try to authenticate dropbox
		if(destination === 'arm') {
			DropboxActions.authenticate();
		}
	},
	// RENDERING ////////////////////////////
	_getLinkComponents: function() {
		let links = [
			{dest: 'menu', icon: 'icon-menu', enabled: true},
			{dest: 'settings', icon: 'icon-gear', enabled: this.state.webcam},
			{dest: 'arm', icon: 'icon-shield red', enabled: this.state.webcam}
		];
		let linkComponents = [];
		for(var i=0, l=links.length; i<l; i++) {
			let link = links[i],
				className = this.props.path === link.dest ? 'table selected' : 'table';
			//if(link.enabled) {
				linkComponents.push(
					<a onClick={this._navigate.bind(this, link.dest)} href="#" className={className} key={link.dest}>
						<span className="table-cell-valign"><i className={'icon '+link.icon} /></span>
					</a>
				);
			//}
		}
		return linkComponents;
	},
	render: function() {
		let linkComponents = this._getLinkComponents();
		return (
			<header>
				<div className="table fill">
					<div className="table-cell-valign">
						{linkComponents}
					</div>
				</div>
			</header>
		);
	}
});