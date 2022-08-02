import React, { useState, useEffect, useContext } from 'react';
import useFetch from '../../useFetch';
import Loading from '../Loading/Loading';
import { songIdContext } from '../../SongIdListContext';
import PlayersContext from './PlayersContext'
import { playerMaxedContext, qualityContext, urlContext } from './PlayersContext';
import { downloadingContext, downloadedContext } from './PlayersContext';
import AudioStateContext from './AudioStateContext';
import PlayerMax from './PlayerMax';
import AudioPlayer from './Audio';
import PlayerMin from './PlayerMin';
import './Player.css';

const Player = () => {
  let songId = useContext(songIdContext);
  let { isPending, data, error } = useFetch('https://saavn.me/songs?id=' + songId);

  return (
    <PlayersContext>
      <AudioStateContext>
        <MainPlayer songId={songId} isPending={isPending} data={data} error={error} />
      </AudioStateContext>
    </PlayersContext>
  )
};

const MainPlayer = ({ songId, isPending, data, error }) => {
  const [playerActive, setplayerActive] = useState(false);
  const { playerMaxed } = useContext(playerMaxedContext);
  const { quality } = useContext(qualityContext);
  const { url, setUrl } = useContext(urlContext);
  const { setDownloading } = useContext(downloadingContext);
  const { setDownloaded } = useContext(downloadedContext);

  useEffect(() => {
    setplayerActive(true);
    setDownloading(false);
    setDownloaded(false);
  }, [setDownloaded, setDownloading, songId]);

  useEffect(() => {
    if (!isPending && data)
      setUrl(quality === 'low' ? data.downloadUrl[3].link : data.downloadUrl[4].link);
  }, [data, isPending, quality, setUrl]);

  return (
    <>
      {isPending && <Loading />}
      {error && <><Loading /> <div>Error: {error}</div></>}
      {data && playerActive && playerMaxed ? <PlayerMax data={data} /> : ''}
      {data && playerActive && !playerMaxed ? <PlayerMin data={data} setplayerActive={setplayerActive} /> : ''}
      {
        data && playerActive ? <div className="AudioPlayer">
          <AudioPlayer url={url} />
        </div> : ''
      }
    </>
  )
}

export function sanityTitle(title = "") {
  return title.replace(/\(.*\)/gi, '');
}

Player.defaultProps = {};

export default Player;
