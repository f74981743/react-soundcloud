import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch, useCallBack } from 'react-redux';
import ReactDOM from 'react-dom';
import { CLIENT_ID } from '../constants/authConstant';
import { getImageUrl } from '../utils/utils';
import { IMAGE_SIZES } from '../constants/songConstant';
import classNames from 'classnames';
import * as Actions from '../actions';
import './TracksBoard.css';

const TracksBoard = () => {
  const player = useSelector(state => state.player);
  const playlist = useSelector(state => state.playlist);
  const user = useSelector(state => state.auth.user);
  const trackState = useSelector(state => state.track);
  const  { tracks, activeTrack, isFetching, currentTags } = trackState;
  const dispatch = useDispatch();
  const tracksBoard = useRef(null);
  const loadingCls = classNames({
    'loading': true,
    hide: isFetching === false
  });;

  const handlePlay = (track) => {
    if (track !== activeTrack) {
      dispatch(Actions.playTrack(track));
    }
    dispatch(Actions.handlePlay());
    dispatch(Actions.fetchPlayList());
  }

  const onScroll = () => {
    const tracksBoardEl = tracksBoard.current;
    if (tracksBoardEl.scrollTop >= (tracksBoardEl.scrollHeight - tracksBoardEl.offsetHeight - 200)) {
      dispatch(Actions.fetchAllTracks());
    }
  };

  var fakeDivs = [];
  for (var i = 0; i < 10; i++) {
    fakeDivs.push(<div className="fake-div" key={i}></div>);
  }

  // componentDidMount
  useEffect(() => {
    
    const tracksBoardEl = tracksBoard.current;
    tracksBoardEl.addEventListener('scroll', onScroll);
    dispatch(Actions.fetchAllTracks());
    return () => {
      tracksBoardEl.removeEventListener('scroll', onScroll);
    }
  }, []);

  return (
    <div className="tracks-board" ref={tracksBoard}>
      {/* <Header actions={actions} currentTags={currentTags} /> */}
      <div className="container">
          {
            tracks.map((track, key) => {
              const playBtnCls = classNames({
                'play-btn': true,
                'btn': true,
                'hide': (player.isPaused === true || track !== activeTrack) ? false : true
              });

              const pauseBtnCls = classNames({
                'pause-btn': true,
                'btn': true,
                'hide': (player.isPaused !== true && track === activeTrack) ? false : true
              });
              const image = getImageUrl(track.artwork_url, IMAGE_SIZES.LARGE);
              return (
                <div className="track" onDoubleClick={() => {
                  handlePlay(track)
                }} key={key}>
                  <div className="track-img" style={{backgroundImage: `url(${image})`}}></div>
                  <div className="track-info">
                    <img src={track.user.avatar_url} />
                    <div className="track-detail">
                      <div className="title">{track.title || '--'}</div>
                      <div className="tag-list">{track.tag_list || '--'}</div>
                    </div>
                  </div>
                  <div className="track-button">
                    <div className={playBtnCls} onClick={() => {
                      handlePlay(track);
                    }}></div>
                    <div className={pauseBtnCls} onClick={() => {
                      dispatch(Actions.handlePause());
                    }}></div>
                  </div>
                </div>
              );
            })
          }
          {
              fakeDivs
          }
          <div className={loadingCls}></div>
      </div>
      {/* {
          activeTrack ?
              <Player src={`${activeTrack.stream_url}?client_id=${CLIENT_ID}`} player={player} playlist={playlist} actions={actions} activeTrack={activeTrack} /> :
              null
      } */}
    </div>
  )
}

export default TracksBoard;