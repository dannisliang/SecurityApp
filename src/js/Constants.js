import keyMirror from 'react/lib/keyMirror';

export default {
  // overall change event - most components should use this to listen for any change in a store
  CHANGE_EVENT: 'change',
  RAF_EVENT: 'raf',
  // specific events - these are used when we have to trigger something in a controller view (ex: video element .play())
  events: {
    START_VIDEO: 'startVideo'
  },
  // action types - used by stores to know when to set data
  ActionTypes: keyMirror({
    APP_DEBUG: null,
    ADD_VIDEO_SRC: null,
    PLAY: null,
    ADD_VIDEO_SRC_ERROR: null,
    CAPTURE_FRAME: null,
    RAF: null,
    TOGGLE_DEBUG: null,
    SET_FPS: null,
    MOTION_ZONE_DENSITY: null,
    MOTION_DETECTED: null,
    ACTIVE_ZONES_NEEDED: null,
    RESIZE: null,
    VIDEO_RESIZE: null,
    MOTION_ZONES: null,
    ARM_START_COUNTDOWN: null,
    ARM_END_COUNTDOWN: null,
    ARM_COUNTDOWN_TICK: null,
    ARM_RESET_COUNTDOWN: null,
    ARMED: null,
    DISARMED: null,
    DEBUG_TOGGLE_EFFECTS: null,
    CAPTURE_BREACH: null,
    DB_GET_AUTH_URL: null,
    DB_AUTH_IN_PROGRESS: null,
    DB_SEND_AUTH_CODE: null,
    DROPBOX_AUTHORIZED: null,
    DROPBOX_AUTHORIZE: null,
    DROPBOX_SAVE_CANVAS_AS_IMAGE: null
  }),
  // TODO: this will come in handy when be apis come into play
  ActionSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })
};
