import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import Core from '../Core';

export default {
	getAuthUrl: function() {
		Dispatcher.handleViewAction({
			type: Constants.ActionTypes.DB_GET_AUTH_URL
		});
	},
	authInProgress: function() {
		Dispatcher.handleViewAction({
			type: Constants.ActionTypes.DB_AUTH_IN_PROGRESS
		});
	},
	sendAuthCode: function(string) {
		Dispatcher.handleViewAction({
			type: Constants.ActionTypes.DB_SEND_AUTH_CODE,
			string: string
		});
	},
};
