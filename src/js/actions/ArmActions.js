import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import Core from '../Core';

export default {
	startCountdown: function() {
		Dispatcher.handleViewAction({
			type: Constants.ActionTypes.ARM_START_COUNTDOWN
		});
	},
	endCountdown: function() {
		Dispatcher.handleViewAction({
			type: Constants.ActionTypes.ARM_END_COUNTDOWN
		});
	},
	countdownTick: function() {
		Dispatcher.handleViewAction({
			type: Constants.ActionTypes.ARM_COUNTDOWN_TICK
		});
	},
	resetCountdown: function() {
		Dispatcher.handleViewAction({
			type: Constants.ActionTypes.ARM_RESET_COUNTDOWN
		});
	},
	armed: function() {
		Dispatcher.handleViewAction({
			type: Constants.ActionTypes.ARMED
		});
	},
	disarmed: function() {
		Dispatcher.handleViewAction({
			type: Constants.ActionTypes.DISARMED
		});
	}
};
