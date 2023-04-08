import React, { useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { maxMinPlayer, setImgSrc } from './actions';
import sanityTitle from '../../sanityTitle';
import MediaControls from './MediaControls';
import { } from './PlayersContext'
import { durationContext, fullDurationContext } from './AudioStateContext';
import './PlayerMin.css';

function PlayerMin({ data, reInit }) {
    const dispatch = useDispatch();
    const { playerMaxed, imgSrc } = useSelector(store => store);
    const { duration, setDuration } = useContext(durationContext);
    const { fullDuration } = useContext(fullDurationContext);

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

    return (
        <div className="Player mini" onClick={() => dispatch(maxMinPlayer(!playerMaxed))}>

            <div className="left">
                <div className="image">
                    <img src={imgSrc} alt='' />
                </div>
            </div>

            <div className="right">
                <div className="song-name">
                    <h5>{sanityTitle(data?.name)}</h5>
                </div>
                <div className="seek-bar" onClick={e => e.stopPropagation()}>
                    <div className="progress-bar" onClick={seek}>
                        <div className="progress-color" style={{ width: (duration / fullDuration) * 100 + '%' }}></div>
                    </div>
                </div>
                <MediaControls />
            </div>

            <span className="material-symbols-outlined close" onClick={(e) => { e.stopPropagation(); reInit(); }}>close</span>
        </div>
    )
}

export default PlayerMin;