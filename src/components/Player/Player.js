import React, { useState, useEffect, useContext } from 'react';
import useFetch from '../../useFetch';
import Loading from '../Loading/Loading';
import { songIdContext } from '../../SongIdListContext';
import PlayersContext from './PlayersContext'
import { playerMaxedContext, qualityContext, urlContext } from './PlayersContext';
import { downloadingContext, downloadedContext, reInitContext as PlayerReInit } from './PlayersContext';
import AudioStateContext, { reInitContext as AudioReInit } from './AudioStateContext';
import PlayerMax from './PlayerMax';
import AudioPlayer from './Audio';
import PlayerMin from './PlayerMin';
import sanityTitle from '../../sanityTitle';
import './Player.css';

const Player = () => {
  const { songId, setSongId } = useContext(songIdContext);
  const { isPending, data, error } = useFetch('https://saavn.me/songs?id=' + songId);

  return (
    <PlayersContext>
      <AudioStateContext>
        <MainPlayer songId={songId} isPending={isPending} data={data} error={error} setSongId={setSongId} />
      </AudioStateContext>
    </PlayersContext>
  )
};

const AddToLibrary = async (songId) => {
  let RecentPlay = await JSON.parse(localStorage.getItem('recently')) || [];
  let MostPlayed = await JSON.parse(localStorage.getItem('mostPlayed')) || {};

  songId && RecentPlay.unshift(songId);
  let newRecent = Array.from(new Set(RecentPlay));
  songId && MostPlayed[songId] ? ++MostPlayed[songId] : MostPlayed[songId] = 1;

  localStorage.setItem('recently', JSON.stringify(newRecent));
  localStorage.setItem('mostPlayed', JSON.stringify(MostPlayed));
}

const MainPlayer = ({ songId, isPending, data, error, setSongId }) => {
  const [playerActive, setplayerActive] = useState(false);
  const { playerMaxed } = useContext(playerMaxedContext);
  const { quality } = useContext(qualityContext);
  const { url, setUrl } = useContext(urlContext);
  const { setDownloading } = useContext(downloadingContext);
  const { setDownloaded } = useContext(downloadedContext);
  const playerReInit = useContext(PlayerReInit);
  const audioReInit = useContext(AudioReInit);

  useEffect(() => {
    setplayerActive(true);
    setDownloading(false);
    setDownloaded(false);

    document.title = data?.name ? sanityTitle(data?.name) + ' - Pills' : 'Pills by Nitz';
    AddToLibrary(songId);
  }, [data, setDownloaded, setDownloading, songId]);

  useEffect(() => {
    if (!isPending && data)
      setUrl(quality === 'low' ? data?.downloadUrl[3]?.link : data?.downloadUrl[4]?.link);
  }, [data, isPending, quality, setUrl]);

  const reInit = async () => {
    new Promise((resolve, reject) => {
      setSongId('');
      playerReInit();
      audioReInit();
      resolve(true);
    })
      .then(() => setplayerActive(false));
  }

  return (
    <>
      {isPending && <Loading />}
      {error && <><div>Error: {error}</div></>}
      {data && playerActive && playerMaxed ? <PlayerMax data={data} /> : ''}
      {data && playerActive && !playerMaxed ? <PlayerMin data={data} reInit={reInit} /> : ''}
      {
        data && playerActive ? <div className="AudioPlayer">
          <AudioPlayer url={url} />
        </div> : ''
      }
    </>
  )
}

Player.defaultProps = {};

export default Player;
