import * as actionTypes from '../constants/ActionTypes';

const initialState = {
  tracks: [],
  nextHref: null,
  isFetching: false,
  activeTrack: null,
  currentTags: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.TRACKS_SET:
      return setTracks(state, action);
    case actionTypes.TRACK_PLAY:
      return setPlay(state, action);
    case actionTypes.SET_ISFETCHING:
      return setIsFetching(state, action);
    case actionTypes.SET_NEXT_HREF:
      return setNextHref(state, action);
    case actionTypes.RESET_TRACKS:
      return resetTracks(state);
    case actionTypes.SET_CURRENT_TAGS:
      return setCurrentTags(state, action);
    default:
  }
  return state;
}

function resetTracks(state) {
  return {...state, tracks: []};
}

function setTracks(state, action) {
  const { tracks } = action;
  return { ...state, tracks: state.tracks.concat(tracks) };
}

function setPlay(state, action) {
  const { track } = action;
  return { ...state, activeTrack: track };
}

function setNextHref(state, action) {
  const { nextHref } = action;
  return { ...state, nextHref: nextHref };
}

function setIsFetching(state, action) {
  const { isFetching } = action;
  return { ...state, isFetching: isFetching };
}

function setCurrentTags(state, action) {
  const { currentTags } = action;
  return { ...state, currentTags: currentTags };
}