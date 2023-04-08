import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSongUrl } from './actions';

import Loading from '../Loading/Loading';
import AudioPlayer from './Audio';
import PlayerMax from './PlayerMax';
import PlayerMin from './PlayerMin';
import sanityTitle from '../../sanityTitle';
import { AddToLibrary } from './Player';
import { setDownloading, setDownloaded } from './actions';
import { reInitContext as AudioReInit } from './AudioStateContext';


const MainPlayer = ({ songId, isPending, data, error, setSongId }) => {
    const dispatch = useDispatch();

    const [playerActive, setplayerActive] = useState(false);
    const { playerMaxed, quality, songUrl } = useSelector(state => state);
    const audioReInit = useContext(AudioReInit);

    useEffect(() => {
        setplayerActive(true);
        dispatch(setDownloading(false));
        dispatch(setDownloaded(false));

        document.title = data?.name ? sanityTitle(data?.name) + ' - Pills' : 'Pills by Nitz';
        AddToLibrary(songId);
    }, [data, dispatch, songId]);

    useEffect(() => {
        if (!isPending && data)
            dispatch(setSongUrl(quality === 'low' ? data?.downloadUrl[3]?.link : data?.downloadUrl[4]?.link));
    }, [data, dispatch, isPending, quality]);

    const reInit = async () => {
        new Promise((resolve, reject) => {
            setSongId('');
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
                    <AudioPlayer url={songUrl} />
                </div> : ''
            }
        </>
    )
}

export default MainPlayer;