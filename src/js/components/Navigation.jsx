/*
Navigation
=============
This component handles the main side icon menu functionality
*/

import React from 'react';
import Addons from 'react/addons';
import {navigate} from 'react-mini-router';
var PureRenderMixin = Addons.addons.PureRenderMixin;

export default React.createClass({
	mixins: [PureRenderMixin],
	// INPUT EVENT HANDLERS ///////////////
	_navigate: function(destination, event) {
		event.preventDefault();
		// if user is clicking on an already opened section we need to toggle it closed
		let dest = this.props.path === destination ? '/' : destination;
		// navigate is a method in react-mini-router used for routing.
		// it needs a delay here because of a strange bug with react-mini-router
		// rendering twice unless navigate is in a delay
		setTimeout(function() { navigate(dest); }, 0);
	},
	// RENDERING ////////////////////////////
	_getLinkComponents: function() {
		let links = [
			{dest: 'menu', icon: 'M'},
			{dest: 'settings', icon: 'S'},
			{dest: 'arm', icon: 'A'}
		];
		let linkComponents = [];
		for(var i=0, l=links.length; i<l; i++) {
			let link = links[i],
				className = this.props.path === link.dest ? 'table selected' : 'table';
			linkComponents.push(
				<a onClick={this._navigate.bind(this, link.dest)} href="#" className={className}>
					<span className="table-cell-valign">{link.icon}</span>
				</a>
			);
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