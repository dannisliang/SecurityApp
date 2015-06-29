import React from 'react/addons';

export default React.createClass({
	mixins: [React.addons.PureRenderMixin],
	// RENDERING ////////////////////////////
	render: function() {
		let blueClassName = 'overlay-container fill absolute' + (this.props.motionDetected ? '' : ' active');
		let redClassName  = 'overlay-container fill absolute' + (this.props.motionDetected ? ' active' : '');
		return (
			<div className="fill absolute">
				<div id="overlay-container-blue" className={blueClassName}></div>
				<div id="overlay-container-red" className={redClassName}></div>
			</div>
		);
	},
});