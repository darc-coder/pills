import React, { useState } from 'react'

export const songIdContext = React.createContext();
export const songListContext = React.createContext();

function SongIdListContext({ children }) {
    const [songId, setSongId] = useState(null);
    const [songList, setSongList] = useState([]);

    return (
        <songIdContext.Provider value={{ songId, setSongId }}>
            <songListContext.Provider value={{ songList, setSongList }}>
                {children}
            </songListContext.Provider>
        </songIdContext.Provider>
    )
}

export default SongIdListContext;