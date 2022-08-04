import React, { useState, useEffect, useContext } from 'react';
import { sanityTitle } from './Player';
import MediaControls from './MediaControls';
import { playerMaxedContext, imgSrcContext, qualityContext } from './PlayersContext'
import { durationContext, fullDurationContext } from './AudioStateContext';


function PlayerMax({ data }) {
    const [imgLoad, setimgLoad] = useState(false);
    const { playerMaxed, setPlayerMax } = useContext(playerMaxedContext);
    const { imgSrc, setImgSrc } = useContext(imgSrcContext);
    const { quality, setQuality } = useContext(qualityContext);
    const { duration, setDuration } = useContext(durationContext);
    const { fullDuration } = useContext(fullDurationContext);

    useEffect(() => {
        setImgSrc(data.image[2].link);
    }, [data, setImgSrc]);

    const seek = (event) => {
        const seekBar = event.currentTarget;
        const clientX = event.clientX;
        const clientY = event.clientY;
        const { left, right, top, bottom } = seekBar.getBoundingClientRect();

        if (clientX > left && clientX < right && clientY > top && clientY < bottom) {
            const percent = (clientX - left) / (right - left);
            const newTime = percent * fullDuration;
            setDuration(newTime);
        }
    }

    const getTimeinMins = (time) => {
        let mins = Math.floor(time / 60);
        let secs = Math.floor(time % 60);
        if (secs < 10) {
            secs = '0' + secs;
        }
        return mins + ':' + secs;
    }

    return (
        <div className="Player max">
            <span className="material-symbols-outlined playerMax" onClick={() => setPlayerMax(!playerMaxed)}>
                expand_more
            </span>
            <div className="top">
                <div className="image">
                    <img
                        ref={(input) => {
                            // onLoad replacement for SSR
                            if (!input) { return; }
                            const img = input;

                            const updateFunc = () => {
                                setimgLoad(true);
                            };
                            img.onload = updateFunc;
                            if (img.complete) {
                                updateFunc();
                            }
                        }}
                        onError={() => setImgSrc('default-album-large.jpg')}
                        className={imgLoad ? '' : 'skeleton'}
                        src={imgSrc}
                        alt=''
                    />
                </div>
                <div className="song-name album-name">
                    <h2>{sanityTitle(data.name)}</h2>
                </div>
            </div>
            <div className="bottom">
                <div className="seek-bar" onClick={e => e.stopPropagation()}>
                    <span className="duration">{getTimeinMins(duration)}</span>
                    <div className="progress-bar" onClick={seek}>
                        <div className="progress-color" style={{ width: (duration / fullDuration) * 100 + '%' }}></div>
                    </div>
                    <span className="fullDuration">{getTimeinMins(fullDuration)}</span>
                </div>
                <MediaControls />
                <span className="quality">
                    <div className="switch">
                        <span>160 Kbps</span>
                        <input type="checkbox" id="quality" checked={quality !== 'low'} onChange={(e) => e.target.checked ? setQuality('high') : setQuality('low')} />
                        <label htmlFor="quality"></label>
                        <span>320 Kbps</span>
                    </div>
                </span>
            </div>
        </div>
    )
}

export default PlayerMax;