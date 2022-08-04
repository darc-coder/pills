import React, { useState, useEffect, useContext } from 'react'
import AlbumSongItem from './AlbumSongItem';
import { songListContext } from '../../SongIdListContext';

function AlbumSection({ data }) {
    if (data.name) {
        return (
            <AlbumSectionDiv data={data} />
        )
    }
    else {
        data = { image: ['', '', { link: '/default-album-large.jpg' }], name: 'Invalid Album' }
        return <AlbumSectionDiv data={data} />
    }
}

function AlbumSectionDiv({ data }) {
    const [imgSrc, setimgSrc] = useState(data.image[2].link);
    const [imgLoad, setimgLoad] = useState(false);
    const { setSongList } = useContext(songListContext);

    function imageReplace() {
        setimgSrc('/default-album-large.jpg');
    }

    useEffect(() => {
        setSongList(data.songs);
    }, [data, setSongList])


    return (
        <>
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
                        onError={() => imageReplace()}
                        className={imgLoad ? '' : 'skeleton'}
                        src={imgSrc}
                        alt=''
                    />
                </div>
                <div className="album-name">
                    <h2>{sanityTitle(data.name)}</h2>
                </div>
            </div>
            <div className="bottom">
                {data.songs && data.songs.map((song, index) => <AlbumSongItem key={index} song={song} />)}
            </div>
        </>
    )
}

export function sanityTitle(title = "") {
    return title.replace(/\(.*\)/gi, '');
}


export default AlbumSection;