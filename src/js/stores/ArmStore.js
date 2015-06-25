import { OrderedMap } from 'immutable';
import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import BaseStore from './BaseStore';
import assign from 'object-assign';

// data storage - the values here are also the default settings
let _countdownSeconds = 60;
let _data = OrderedMap({
	countdown: false,
	countdownSeconds: _countdownSeconds,
	countdownComplete: false
});

const ArmStore = assign({}, BaseStore, {
	// public methods used by Controller-View to operate on data
	getAll: function() {
		return _data.toObject();
	},
	// register store with dispatcher, allowing actions to flow through
	dispatcherIndex: Dispatcher.register(function(payload) {
		let action = payload.action;
		switch(action.type) {
			case Constants.ActionTypes.ARM_START_COUNTDOWN:
				_data = _data.set('countdown', true);
				ArmStore.emitChange();
				break;
			case Constants.ActionTypes.ARM_END_COUNTDOWN:
				_data = _data.merge({
					countdown: false,
					countdownSeconds: _countdownSeconds,
					countdownComplete: true
				});
				ArmStore.emitChange();
				break;
			case Constants.ActionTypes.ARM_COUNTDOWN_TICK:
				_data = _data.set('countdownSeconds', _data.get('countdownSeconds') - 1);
				ArmStore.emitChange();
				break;
			case Constants.ActionTypes.ARM_RESET_COUNTDOWN:
				_data = _data.merge({
					countdown: false,
					countdownSeconds: _countdownSeconds,
					countdownComplete: false
				});
				ArmStore.emitChange();
				break;
		}
	})
});
export default ArmStore;