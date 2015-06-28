import React from 'react';
import Addons from 'react/addons';
import ImageStore from '../stores/ImageStore';
import DropboxStore from '../stores/DropboxStore';
import DropboxActions from '../actions/DropboxActions';
import assign from 'object-assign';
import Core from '../Core';
var PureRenderMixin = Addons.addons.PureRenderMixin;

export default React.createClass({
	mixins: [PureRenderMixin],
	// INITIAL STATE ////////////////////////
	getInitialState: function() {
		return assign({}, DropboxStore.getAll(), ImageStore.getAll());
	},
	// LIFECYCLE ////////////////////////////
	componentDidMount: function() {
		ImageStore.addChangeListener(this._onImageChange);
	},
	componentWillUnmount: function() {
		ImageStore.removeChangeListener(this._onImageChange);
	},
	componentDidUpdate: function(prevProps, prevState) {
		if(this.state.breachCanvas) {
			this._renderBreachImage();
		}
	},
	// EVENT HANDLERS ////////////////////////
	_onImageChange: function() {
		this.setState(ImageStore.getAll());
	},
	_renderBreachImage: function() {
		var canvas = React.findDOMNode(this.refs.breachImage),
			context = canvas.getContext('2d');
		canvas.width = 640;
		canvas.height = 480;
		context.drawImage(this.state.breachCanvas, 0, 0, canvas.width, canvas.height);
		DropboxActions.saveCanvasAsImage(canvas);
	},
	render: function() {
		return (
			<div id="armed" className="fill absolute">
				<canvas ref="breachImage"></canvas>
			</div>
		);
	},
});