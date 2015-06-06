import keyMirror from 'react/lib/keyMirror';

export default {
  // overall change event - most components should use this to listen for any change in a store
  CHANGE_EVENT: 'change',
  // specific events - these are used when we have to trigger something in a controller view (ex: video element .play())
  events: {
    START_VIDEO: 'startVideo'
  },
  // action types - used by stores to know when to set data
  ActionTypes: keyMirror({
    ADD_VIDEO_SRC: null,
    ADD_VIDEO_SRC_ERROR: null
  }),
  ActionSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })
};
