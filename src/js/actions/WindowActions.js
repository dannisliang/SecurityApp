import Dispatcher from '../Dispatcher';
import Constants from '../Constants';

export default {
	resize: function() {
		Dispatcher.handleViewAction({
			type: Constants.ActionTypes.RESIZE,
		});
	}
};
