import React, { useContext } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import allReducers from './reducers';
import config from '../../config.json';
import useFetch from '../../useFetch';
import { songIdContext } from '../../SongIdListContext';
import PlayersContext from './PlayersContext'
import AudioStateContext from './AudioStateContext';
import MainPlayer from './MainPlayer';
import './Player.css';

const store = configureStore({ reducer: allReducers },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const Player = () => {
  const { songId, setSongId } = useContext(songIdContext);
  const { isPending, data, error } = useFetch(config.url + '/songs?id=' + songId);

  return (
    <Provider store={store}>
      <PlayersContext>
        <AudioStateContext>
          <MainPlayer songId={songId} isPending={isPending} data={data} error={error} setSongId={setSongId} />
        </AudioStateContext>
      </PlayersContext>
    </Provider>
  )
};

export const AddToLibrary = async (songId) => {
  let RecentPlay = await JSON.parse(localStorage.getItem('recently')) || [];
  let MostPlayed = await JSON.parse(localStorage.getItem('mostPlayed')) || {};

  songId && RecentPlay.unshift(songId);
  let newRecent = Array.from(new Set(RecentPlay));
  songId && MostPlayed[songId] ? ++MostPlayed[songId] : MostPlayed[songId] = 1;

  localStorage.setItem('recently', JSON.stringify(newRecent));
  localStorage.setItem('mostPlayed', JSON.stringify(MostPlayed));
}

// Main Player moved to MainPlayer.js

Player.defaultProps = {};

export default Player;
