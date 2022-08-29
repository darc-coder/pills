import React, { useState, useEffect, useContext } from 'react';
import { songIdContext, songListContext } from '../../SongIdListContext';
import { playingContext, durationContext } from './AudioStateContext';
import { fullDurationContext, toggleContext } from './AudioStateContext';
import './Player.css';

const useAudio = url => {
    const [audio] = useState(new Audio(url));
    const { playing, setPlaying } = useContext(playingContext);
    const { duration, setDuration } = useContext(durationContext);
    const { setFullDuration } = useContext(fullDurationContext);
    const { songId, setSongId } = useContext(songIdContext);
    const { songList } = useContext(songListContext);
    const { autoplay } = useContext(toggleContext);

    useEffect(() => {
        playing ? audio.play() : audio.pause();
    }, [audio, playing]
    );

    useEffect(() => {
        audio.src = url;
        audio.oncanplay = () => {
            audio.play();
            setPlaying(true);
            setFullDuration(audio.duration);
        }

        return () => audio.removeEventListener('canplay', () => audio.play());
    }, [audio, setFullDuration, setPlaying, url]);

    useEffect(() => {
        const next = () => {
            if (autoplay) {
                let index = songList.findIndex(song => song?.id === songId);
                if (index + 1 < songList.length) {
                    setSongId(songList[index + 1].id);
                }
            }
        }
        audio.addEventListener('ended', () => { next(); setPlaying(false); });
        audio.onpause = () => setPlaying(false);
        audio.onplay = () => setPlaying(true);
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
            audio.removeEventListener('pause', () => setPlaying(false));
            audio.removeEventListener('play', () => setPlaying(true));
        };
    }, [audio, autoplay, setPlaying, setSongId, songId, songList]);

    useEffect(() => {

        audio.addEventListener('timeupdate', () => {
            setDuration(audio.currentTime);
        }, [audio, setDuration]);
        return () => {
            audio.removeEventListener('timeupdate', () => {
                setDuration(audio.currentTime);
            }, [audio, setDuration]);
        }
    }, [audio, duration, setDuration]);

    useEffect(() => {
        if (Math.abs(audio.currentTime - duration) > 1) {
            audio.currentTime = duration;
        }
    }, [audio, duration]);


    return audio;
};

const AudioPlayer = ({ url }) => {
    useAudio(url);

    return (<></>);
};

export default AudioPlayer;