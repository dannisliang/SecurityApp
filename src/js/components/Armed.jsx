import React from 'react/addons';
import ImageStore from '../stores/ImageStore';
import DropboxStore from '../stores/DropboxStore';
import DropboxActions from '../actions/DropboxActions';
import MotionStore from '../stores/MotionStore';
import SettingsStore from '../stores/SettingsStore';
import assign from 'object-assign';
import Core from '../Core';

export default React.createClass({
	mixins: [React.addons.PureRenderMixin],
	// INITIAL STATE ////////////////////////
	getInitialState: function() {
		return assign({},
			{image    : ImageStore.getAll()},
			{settings : SettingsStore.getAll()}
		);
	},
	// LIFECYCLE ////////////////////////////
	componentDidMount: function() {
		ImageStore.addChangeListener(this._onImageChange);
	},
	componentWillUnmount: function() {
		ImageStore.removeChangeListener(this._onImageChange);
	},
	componentDidUpdate: function(prevProps, prevState) {
		if(this.state.image.breachCanvas) {
			this._renderBreachImage();
		}
	},
	// EVENT HANDLERS ////////////////////////
	_onImageChange: function() {
		this.setState({image: ImageStore.getAll()});
	},
	_renderBreachImage: function() {
		let canvas  = document.createElement('canvas'),
			context = canvas.getContext('2d');
		canvas.width = this.state.settings.imageCaptureSize.width;
		canvas.height = this.state.settings.imageCaptureSize.height;
		context.drawImage(this.state.image.breachCanvas, 0, 0, canvas.width, canvas.height);
		DropboxActions.saveCanvasAsImage(canvas);
	},
	render: function() {
		return (
			<div id="armed" className={'fill absolute'+(this.props.motionDetected ? ' motion' : '')}></div>
		);
	},
});