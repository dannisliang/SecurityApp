/*
Dispatcher.js
=============
Handles dispatching of all actions that stores listen for. It's important to note there is
a timeout in this dispatcher because we use RAF in an action so the dispatcher is always dispatching while that is on
more info: https://github.com/goatslacker/alt/issues/71
*/

import {Dispatcher} from 'flux';
import Constants from './Constants';
import assign from 'object-assign';

export default assign(new Dispatcher(), {
	handleViewAction(action) {
		var that = this,
			dispatchArgs = {
				source: Constants.ActionSources.VIEW_ACTION,
				action: action
			};
		if(this.$Dispatcher_isDispatching) {
			setTimeout(function(){
				that.dispatch(dispatchArgs);
			}, 0);
		} else {
			this.dispatch(dispatchArgs);
		}
	}
});
