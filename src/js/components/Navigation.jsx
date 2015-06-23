/*
Navigation
=============
This component handles the main menu / header functionality
*/

import React from 'react';
import {navigate} from 'react-mini-router';

export default React.createClass({
	// INITIAL STATE ////////////////////////
	getInitialState: function() {

	}
	// INPUT EVENTS /////////////////////////
	_navigateSettings: function(event) {
		event.preventDefault();
		navigate('settings');
	},
	// RENDERING ////////////////////////////
	render: function() {
		return (
			<header>
				<div className="table fill">
					<div className="table-cell-valign">
						<a href="#" className="table">
							<span className="table-cell-valign">M</span>
						</a>
						<a onClick={this._navigateSettings} href="#" className="table">
							<span className="table-cell-valign">S</span>
						</a>
						<a href="#" className="table">
							<span className="table-cell-valign">A</span>
						</a>
					</div>
				</div>
			</header>
		);
	}
});