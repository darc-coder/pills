import { combineReducers } from 'redux';

const playerMaxedReducer = (state = false, action = { type: '' }) => {
    switch (action.type) {
        case 'MAXIMIZED':
            state = true;
            break;
        case 'MINIMIZED':
            state = false;
            break;
        default:
            break;
    }

    return state;
}

const imgSrcReducer = (state = '', action = { type: '', payload: '' }) => {

    if (action.type === "IMG" && action.payload)
        state = action.payload;

    return state;
}

const audioQualityReducer = (state = '', action = { type: '' }) => {
    switch (action.type) {
        case 'HIGH':
            state = 'high';
            break;
        case 'LOW':
            state = 'low';
            break;
        default:
            break;
    }

    return state;
}

const songUrlReducer = (state = '', action = { type: '', payload: '' }) => {

    if (action.type === 'SONG' && action.payload)
        state = action.payload;

    return state;
}

const downloadingReducer = (state = false, action = { type: '' }) => {
    switch (action.type) {
        case 'DOWNLOADING':
            state = true;
            break;
        case 'NOT_DOWNLOADING':
            state = false;
            break;
        default:
            break;
    }

    return state;
}

const downloadedReducer = (state = false, action = { type: '' }) => {
    switch (action.type) {
        case 'DOWNLOADED':
            state = true;
            break;
        case 'NOT_DOWNLOADED':
            state = false;
            break;
        default:
            break;
    }

    return state;
}

const reInitReducer = (state = false) => {
    return state;
}

const allReducers = combineReducers({
    playerMaxed: playerMaxedReducer,
    imgSrc: imgSrcReducer,
    quality: audioQualityReducer,
    songUrl: songUrlReducer,
    downloading: downloadingReducer,
    downloaded: downloadedReducer,
    reInit: reInitReducer
});

export default allReducers;