import * as types from '../constants/ActionTypes';

var initialState = {
  duration: 1,
  currentTime: 0,
  progressPercent: '0%',
  bufferedPercent: '0%',
  isMuted: false,
  isPaused: true,
  volume: 0.5,
  loopMode: 'none',
  isDragging: false
}

export default function player(state = initialState, action) {
	switch(action.type) {
    case types.HANDLE_PLAY:
      return Object.assign({}, state, {
        isPaused: false
      })
    case types.HANDLE_PAUSE:
      return Object.assign({}, state, {
        isPaused: true
      })
    case types.SET_CURRENT_TIME:
      return Object.assign({}, state, {
        currentTime: action.currentTime
      })
    case types.SET_DURATION:
      return Object.assign({}, state, {
        duration: action.duration
      })
    case types.SET_PROGRESS_PERCENT:
      return Object.assign({}, state, {
        progressPercent: action.progressPercent
      })
    case types.SET_DRAGGING:
      return Object.assign({}, state, {
        isDragging: action.isDragging
      })
    case types.SET_VOLUME:
      return Object.assign({}, state, {
        volume: action.volume
      })
    case types.SET_MUTED:
      return Object.assign({}, state, {
          isMuted: action.isMuted
      })
    case types.SET_BUFFERED_PERCENT:
      return Object.assign({}, state, {
          bufferedPercent: action.bufferedPercent
      })
    default:
      return state
	}
}
