import React, { useContext } from 'react';
import { songIdContext, songListContext } from '../../SongIdListContext';
import { playingContext, toggleContext, durationContext } from './AudioStateContext';
import { urlContext, downloadingContext, downloadedContext } from './PlayersContext';

const MediaControls = () => {
    const { songId, setSongId } = useContext(songIdContext);
    const { songList } = useContext(songListContext);
    const { playing } = useContext(playingContext);
    const { toggle } = useContext(toggleContext);
    const { setDuration } = useContext(durationContext);
    const { url: songUrl } = useContext(urlContext);
    const { downloading, setDownloading } = useContext(downloadingContext);
    const { downloaded, setDownloaded } = useContext(downloadedContext);

    const next = () => {
        let index = songList.findIndex(song => song.id === songId);
        if (index + 1 < songList.length) {
            setSongId(songList[index + 1].id);
        }
    }

    const previous = () => {
        let index = songList.findIndex(song => song.id === songId);
        if (index > 0) {
            setSongId(songList[index - 1].id);
        }
    }

    const replay = () => {
        setDuration(0);
    }

    const download = async () => {
        setDownloading(true);
        console.log(songList);
        let song = songList.find(song => song.id === songId);
        let url = songUrl.slice(8,);
        let corsUrl = 'https://nitz-cors.herokuapp.com/' + url;

        let { blobUrl, blobSize, err } = await downloadResource(corsUrl, song.name + '.mp3');

        if (blobSize > 200)
            forceDownload(blobUrl, song.name + '.mp3');
        else
            forceDownload(songUrl, song.name + '.mp3', '_blank');
        setDownloading(false);
        setDownloaded(true);
        if (err) console.error(err);
    }

    return (
        <div className="controls" onClick={e => e.stopPropagation()}>
            <span className="material-symbols-outlined repeat" onClick={replay}>replay</span>
            <span className="material-symbols-outlined previous" onClick={previous}>skip_previous</span>
            <span className="material-symbols-outlined play" onClick={toggle}>{playing ? 'pause' : 'play_arrow'}</span>
            <span className="material-symbols-outlined next" onClick={next}>skip_next</span>
            <span className={downloading ? 'downloading' : "material-symbols-outlined download"} onClick={downloading ? undefined : download}>
                {!downloading && !downloaded && 'download'}
                {!downloading && downloaded && 'download_done'}
            </span>
        </div >
    )
}

function forceDownload(blob, filename, target = '') {
    var a = document.createElement('a');
    a.download = filename;
    a.href = blob;
    a.target = target;
    document.body.appendChild(a);
    a.click();
    a.remove();
}

// Current blob size limit is around 500MB for browsers
async function downloadResource(url, filename) {
    if (!filename) filename = url.split('\\').pop().split('/').pop();
    let blobUrl = '';
    let blobSize = 0;

    return fetch(url, {
        headers: new Headers({
            'Origin': window.location.origin
        }),
        mode: 'cors'
    })
        .then(response => response.blob())
        .then(blob => {
            blobUrl = window.URL.createObjectURL(blob);
            blobSize = blob.size;
            return { blobUrl, blobSize };
        })
        .catch(err => {
            console.error(err);
            return { blobUrl, blobSize, err };
        });
}

export default MediaControls;