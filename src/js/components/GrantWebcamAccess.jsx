import React from 'react';
import Addons from 'react/addons';
import MotionActions from '../actions/MotionActions';
import DropboxActions from '../actions/DropboxActions';
import DropboxStore from '../stores/DropboxStore';
var PureRenderMixin = Addons.addons.PureRenderMixin;

export default React.createClass({
	mixins: [PureRenderMixin],
	// INITIAL STATE ////////////////////////
	getInitialState: function() {
		return DropboxStore.getAll();
	},
	// LIFECYCLE ////////////////////////////
	componentDidMount: function() {
		DropboxStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		DropboxStore.removeChangeListener(this._onChange);
	},
	// EVENTS ////////////////////////////////
	_onChange: function() {
		this.setState(DropboxStore.getAll());
	},
	_handleGrantWebcamAccessClick: function() {
		MotionActions.addVideoSrc();
	},
	// RENDERING ////////////////////////
	render: function() {
		return (
			<div className="table fill absolute">
				<div className="table-cell-valign">
					<i className="icon icon-ninja-star"></i>
					<button onClick={this._handleGrantWebcamAccessClick} className="red">GRANT WEBCAM ACCESS</button>
				</div>
			</div>
		);
	},
});