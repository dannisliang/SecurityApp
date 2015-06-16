import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import Core from '../Core';

export default {
	resize: function() {
		Dispatcher.handleViewAction({
			type: Constants.ActionTypes.RESIZE,
		});
	}
};
