import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import Core from '../Core';

export default {
	authenticate: function() {
		Dispatcher.handleViewAction({
			type: Constants.ActionTypes.DROPBOX_AUTHORIZE
		});
	},
	saveCanvasAsImage: function(canvas) {
		Dispatcher.handleViewAction({
			type: Constants.ActionTypes.DROPBOX_SAVE_CANVAS_AS_IMAGE,
			canvas: canvas
		});
	}
};
