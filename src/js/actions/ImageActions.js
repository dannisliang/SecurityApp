import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import Core from '../Core';

export default {
	captureBreach: function(canvas) {
		Dispatcher.handleViewAction({
			type: Constants.ActionTypes.CAPTURE_BREACH,
			canvas: canvas
		});
	}
};
