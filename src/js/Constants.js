import keyMirror from 'react/lib/keyMirror';

export default {
  // event name triggered from store, listened to by views
  CHANGE_EVENT: 'change',
  VIDEO_PLAY_EVENT: 'videoPlayEvent',
  // Each time you add an action, add it here
  ActionTypes: keyMirror({
    ADD_VIDEO_SRC: null,
    ADD_VIDEO_SRC_ERROR: null
  }),
  ActionSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })
};
