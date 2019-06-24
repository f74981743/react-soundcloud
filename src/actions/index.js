import * as types from '../constants/ActionTypes';
import { CLIENT_ID } from '../constants/authConstant';

export function setDuration(duration) {
  return {
      type: types.SET_DURATION,
      duration: duration
  }
}

export function handlePlay() {
  return {
    type: types.HANDLE_PLAY,
    isPaused: false
  }
}

export function handlePause() {
  return {
    type: types.HANDLE_PAUSE,
    isPaused: true
  }
}

export function setCurrentTime(currentTime) {
  return {
    type: types.SET_CURRENT_TIME,
    currentTime: currentTime
  }
}

export function setProgressPercent(progressPercent) {
  return {
    type: types.SET_PROGRESS_PERCENT,
    progressPercent: progressPercent
  }
}

export function setBufferedPercent(bufferedPercent) {
  return {
    type: types.SET_BUFFERED_PERCENT,
    bufferedPercent: bufferedPercent
  }
}

export function setDragging(isDragging) {
  return {
    type: types.SET_DRAGGING,
    isDragging: isDragging
  }
}

export function setVolume(volume) {
  return {
    type: types.SET_VOLUME,
    volume: volume
  }
}

export function setMuted(isMuted) {
  return {
    type: types.SET_MUTED,
    isMuted: isMuted
  }
}

export function auth() {
  return function (dispatch) {
    SC.connect().then((session) => {
        dispatch(fetchStream(session));
    });
  };
};

function setMe(user) {
  return {
    type: types.ME_SET,
    user
  };
}

function fetchMe(session) {
  return function (dispatch) {
    fetch(`//api.soundcloud.com/me?oauth_token=${session.oauth_token}`)
      .then((response) => response.json())
      .then((data) => {
          dispatch(setMe(data));
      });
  }
};

export function fetchAllTracks(tags, isResetTrack, keyword) {
  return function (dispatch, getState) {
    const { track } = getState();
    var url = `//api.soundcloud.com/tracks?linked_partitioning=1&client_id=${CLIENT_ID}&offset=0&limit=50&tags=${tags}&q=${keyword}`;
    if (track.nextHref !== null && !isResetTrack) url = track.nextHref;
    
    if (track.isFetching === false) {
      dispatch(setIsFetching(true));
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (isResetTrack) dispatch(resetTracks());
            dispatch(setTracks(data.collection));
            dispatch(setNextHref(data.next_href));
            dispatch(setCurrentTags(tags));
            dispatch(setIsFetching(false));
        });
    }
  }
}

export function resetTracks() {
  return {
    type: types.RESET_TRACKS
  }
}

export function setTracks(tracks) {
  return {
    type: types.TRACKS_SET,
    tracks
  };
};

export function setCurrentTags(tags) {
  return {
    type: types.SET_CURRENT_TAGS,
    currentTags: tags
  };
}

export function setNextHref(nextHref) {
  return {
    type: types.SET_NEXT_HREF,
    nextHref: nextHref
  };
}

export function setIsFetching(isFetching) {
  return {
    type: types.SET_ISFETCHING,
    isFetching: isFetching
  }
}

export function playTrack(track) {
  return {
    type: types.TRACK_PLAY,
    track
  };
};

export function fetchPlayList() {
  return function(dispatch, getState) {
    const { tracks, activeTrack } = getState().track;
    var songs;
    for (var i = 0; i < tracks.length; i++) {
      if (tracks[i].id === activeTrack.id) {
        songs = tracks.slice(i, tracks.length);
      }
    }

    dispatch(setPlayList(songs));
  }
}

function setPlayList(songs) {
  return {
    type: types.SET_PLAYLIST,
    songs
  }
}