/*
Tooltips
====
This component contains ALL tooltips across the application
example usage:
<Tooltip overlay={}
*/
import React from 'react/addons';

export default React.createClass({
	_getTooltip: function(name) {
		switch(name) {
			case 'motionSensitivity':
				return (
					<div>
						<h3>Motion Sensitivity</h3> controls the sensitivity of all motion zones.
						The higher this setting the more likely the camera will be to trigger motion.
					</div>
				);
				break;
			case 'motionGridSize':
				return (
					<div>
						<h3>Motion Grid Size</h3> controls the size of all motion zone boxes.
						The smaller the zones the more accurate the system is, but can be CPU intensive.
					</div>
				);
				break;
			case 'frameCaptureSpeed':
				return (
					<div>
						<h3>Frame Capture Speed</h3> controls the rate at which frames of your webcam video are compared.
						The higher the ammount the faster.
					</div>
				);
				break;
			case 'activeZonesNeeded':
				return (
					<div>
						<h3>Active Zones Needed</h3> determines how many zones must be active for the system to trigger motion.
						The higher the ammount the more overall motion will be needed to trigger the system.
					</div>
				);
				break;
			case 'imageCaptureSize':
				return (
					<div>
						<h3>Image Capture Size</h3> this represents the size of the image that will be captured when the system
						is armed and senses motion. There is a slight delay between syncing files with dropbox, so the smaller the image is
						the less time a possible intruder will have to close the browser window before the file is fully uploaded to Dropbox.
					</div>
				);
				break;
		}
	},
	render: function() {
		return (
			<div>
				{this._getTooltip(this.props.name)}
			</div>
		)
	}
});