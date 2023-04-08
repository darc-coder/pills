export const maxMinPlayer = (maxed = false) => {
    if (maxed) return { type: 'MAXIMIZED' }
    else return { type: 'MINIMIZED' }
}

export const setImgSrc = (imgSrc = '') => {
    return { type: 'IMG', payload: imgSrc }
}

export const setQuality = (audioQuality = 'low') => {
    if (audioQuality === 'high') return { type: 'HIGH' }
    else return { type: 'LOW' }
}

export const setSongUrl = (songUrl = '') => {
    return { type: 'SONG', payload: songUrl }
}

export const setDownloading = (downloading = false) => {
    if (downloading === true) return { type: 'DOWNLOADING' }
    else return { type: 'NOT_DOWNLOADING' }

}

export const setDownloaded = (downloaded = false) => {
    if (downloaded === true) return { type: 'DOWNLOADED' }
    else return { type: 'NOT_DOWNLOADED' }
}