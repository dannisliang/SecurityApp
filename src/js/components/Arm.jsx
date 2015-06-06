import React from 'react';
import Motion from './Motion.jsx';
import MotionStore from '../stores/MotionStore';
import MotionActionCreator from '../actions/MotionActionCreator';

export default React.createClass({
	// EVENT HANDLERS ////////////////////////
	_onChange: function() {
		this.setState(MotionStore.getAll());
	},
	// INITIAL STATE ////////////////////////
	getInitialState: function() {
		return MotionStore.getAll();
	},
	// LIFECYCLE ////////////////////////////
	componentDidMount: function() {
		MotionStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		MotionStore.removeChangeListener(this._onChange);
	},
	// USER INPUT EVENTS ////////////////////////
	handleGetVideoSrc: function() {
		MotionActionCreator.addVideoSrc();
	},

	render: function() {
		// TODO: separate video & motion into 2 components, this way motion doesn't get mounted until video component is all set up
		/*
			var Motion = <div id="motion-placeholder"></div>
			if(this.state.isPlaying) {
				Motion = <Motion />;
			}
			{Motion}
		*/
		return (
			<div id="arm-container">
				<Motion width={640} height={480} handleGetVideoSrc={this.handleGetVideoSrc} />
			</div>
		);
	}
});
