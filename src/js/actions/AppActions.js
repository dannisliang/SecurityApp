import Dispatcher from '../Dispatcher';
import Constants from '../Constants';

export default {
	debug: function(boolean) {
		Dispatcher.handleViewAction({
			type: Constants.ActionTypes.APP_DEBUG,
			boolean: boolean
		});
	}
};
