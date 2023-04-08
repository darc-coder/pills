import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { maxMinPlayer, setImgSrc, setQuality } from './actions';
import sanityTitle from '../../sanityTitle';
import MediaControls from './MediaControls';
import { } from './PlayersContext'
import { durationContext, fullDurationContext, toggleContext } from './AudioStateContext';


function PlayerMax({ data }) {
    const dispatch = useDispatch();

    const [imgLoad, setimgLoad] = useState(false);
    const { playerMaxed, imgSrc, quality } = useSelector(store => store);
    const { duration, setDuration } = useContext(durationContext);
    const { fullDuration } = useContext(fullDurationContext);
    const { autoplay, setAutoPlay } = useContext(toggleContext);
    let Favourites = getFavourites();
    const [isFavourite, setFavourite] = useState(Favourites.indexOf(data?.id) > -1);

    useEffect(() => {
        dispatch(setImgSrc(data?.image[2].link));
    }, [data?.image, dispatch]);

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

    function getFavourites() {
        return JSON.parse(localStorage.getItem('favourites')) || [];
    }

    function setFavourites(favourite) {
        if (Favourites.indexOf(favourite) === -1)
            Favourites.push(favourite);
        else
            Favourites.splice(Favourites.indexOf(favourite), 1);

        setFavourite(Favourites.indexOf(data?.id) > -1);

        let Arr = Array.from(new Set(Favourites));
        localStorage.setItem('favourites', JSON.stringify(Arr));
    }

    return (
        <div className="Player max">
            <span className="material-symbols-outlined playerMax" onClick={() => dispatch(maxMinPlayer(!playerMaxed))}>
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
                    <h2>{sanityTitle(data?.name)}</h2>
                    <h5>{sanityTitle(data?.artist)}</h5>
                </div>
            </div>
            <div className="bottom">
                <span className={isFavourite ? "favorite Active" : "favorite"} onClick={() => setFavourites(data?.id)}>
                    <span className="material-symbols filled">favorite</span>
                </span>

                <div className="seek-bar" onClick={e => e.stopPropagation()}>
                    <span className="duration">{getTimeinMins(duration)}</span>
                    <div className="progress-bar" onClick={seek}>
                        <div className="progress-color" style={{ width: (duration / fullDuration) * 100 + '%' }}></div>
                    </div>
                    <span className="fullDuration">{getTimeinMins(fullDuration)}</span>
                </div>
                <MediaControls />
                <div className="row">
                    <span className="quality">
                        <div className="switch">
                            <span className={quality === 'low' ? 'iconActive' : ''}>SD</span>
                            <input type="checkbox" id="quality" checked={quality !== 'low'} onChange={(e) => dispatch(e.target.checked ? setQuality('high') : setQuality('low'))} />
                            <label htmlFor="quality">
                                <span className="icon"></span>
                            </label>
                            <span className={quality !== 'low' ? 'iconActive' : ''}>HD</span>
                        </div>
                    </span>
                    <span className="autoplay">
                        <div className="switch small">
                            <input type="checkbox" id="autoplay" checked={autoplay} onChange={e => setAutoPlay(!autoplay)} />
                            <label htmlFor="autoplay">
                                <span className="material-symbols-outlined filled customIcon">play_circle</span>
                                <span className="icon"></span>
                            </label>
                        </div>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default PlayerMax;