import React, { useState, useContext } from 'react';
import sanityTitle from '../../sanityTitle';
import { songIdContext } from '../../SongIdListContext';


const AlbumSongItem = ({ song }) => {

    const [imgSrc, setimgSrc] = useState(song?.image[0]?.link);
    let { setSongId } = useContext(songIdContext);

    return (
        <div className="SongItem" onClick={() => setSongId(song?.id)}>
            <div className="image">
                <img src={imgSrc} alt="" onError={() => setimgSrc('default-album.jpg')} />
            </div>
            <div className="name">
                <h5>{sanityTitle(song?.name)}</h5>
                <h6>{sanityTitle(song?.artist)}</h6>
            </div>
        </div>
    )
}

export default AlbumSongItem;