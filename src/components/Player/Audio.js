import React, { useState, useEffect, useContext } from 'react';
import { playingContext, durationContext } from './AudioStateContext';
import { fullDurationContext } from './AudioStateContext';
import './Player.css';

const useAudio = url => {
    const [audio] = useState(new Audio(url));
    const { playing, setPlaying } = useContext(playingContext);
    const { duration, setDuration } = useContext(durationContext);
    const { setFullDuration } = useContext(fullDurationContext);

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
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
        };
    }, [audio, setPlaying]);

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