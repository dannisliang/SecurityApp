import React from 'react';
import Addons from 'react/addons';
var PureRenderMixin = Addons.addons.PureRenderMixin;

export default React.createClass({
	mixins: [PureRenderMixin],
	// LIFECYCLE //////////////////////////
	componentDidMount: function() {
		this.canvas = React.findDOMNode(this.refs.canvas);
	},
	componentWillReceiveProps: function(nextProps) {
		if(nextProps.motionZones) {
			this._handleMotionZones();
		}
	},
	componentWillUnmount: function() {
		delete this.canvas;
	},
	// METHODS /////////////////////////////
	_handleMotionZones: function() {
		let canvasContext = this.canvas.getContext('2d');
		this.canvas.width = this.props.videoWidth;
		this.canvas.height = this.props.videoHeight;
		canvasContext.clearRect(0, 0, 9999, 9999);
		for(var i=0, l=this.props.motionZones.length; i<l; i++) {
			let motionZone = this.props.motionZones[i],
				x          = motionZone.x * this.props.motionZoneDensity,
				y          = motionZone.y * this.props.motionZoneDensity,
				width      = this.props.motionZoneDensity,
				height     = this.props.motionZoneDensity;
			canvasContext.fillStyle = '#FFF';
			canvasContext.fillRect(x, y, width, height);
		}
	},
	// RENDERING ////////////////////////////
	render: function() {
		let pixelSize = (this.props.videoWidth / (this.props.videoWidth / this.props.motionZoneDensity)); // TODO: half this for retina displays (use window.devicePixelRatio)
		let style = {
			backgroundSize: pixelSize+'px '+pixelSize+'px',
			height: this.props.videoHeight,
			width: this.props.videoWidth
		};
		return (
			<div className="fill absolute">
				<div className="table fill">
					<div className="table-cell-valign">
						<div id="motion-zone-grid" style={style}>
							<canvas id="motion-zones-canvas" ref="canvas" className="fill"></canvas>
						</div>
					</div>
				</div>
			</div>
		);
	},
});