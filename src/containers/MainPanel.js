import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactDOM from 'react-dom';
import { CLIENT_ID } from '../constants/authConstant';
import { getImageUrl } from '../utils/utils';
import { IMAGE_SIZES } from '../constants/songConstant';
import classNames from 'classnames';

const MainPanel = () => {
  const player = useSelector(state => state.player);
  const playlist = useSelector(state => state.playlist);
  const user = useSelector(state => state.auth.user);
  const tracks = useSelector(state => state.track.tracks);
  const activeTrack = useSelector(state => state.track.activeTrack);
  const isFetching = useSelector(state => state.track.isFetching);
  const currentTags = useSelector(state => state.track.currentTags);
  const dispatch = useDispatch();
  return (
    <div>
      
    </div>
  )
}

export default MainPanel;