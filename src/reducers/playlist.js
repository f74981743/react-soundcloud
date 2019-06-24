import * as types from '../constants/ActionTypes';

var initialState = {
	songs: []
};

export default function playlist(state = initialState, action) {
	switch(action.type) {
		case types.SET_PLAYLIST:
			return setPlayList(state, action);
		default:
			return state
	}
}

function setPlayList(state, action) {
	const { songs } = action;
	return Object.assign({}, state, {
		songs: action.songs
	})
}
