import React, { useState } from 'react'

export const songIdContext = React.createContext();
export const setsongIdContext = React.createContext();
export const songListContext = React.createContext();
export const setsongListContext = React.createContext();

function SongIdListContext({ children }) {
    const [songId, setsongId] = useState(null);
    const [songList, setsongList] = useState([]);

    return (
        <songIdContext.Provider value={songId}>
            <songListContext.Provider value={songList}>
                <setsongIdContext.Provider value={setsongId}>
                    <setsongListContext.Provider value={setsongList}>
                        {children}
                    </setsongListContext.Provider>
                </setsongIdContext.Provider>
            </songListContext.Provider>
        </songIdContext.Provider>
    )
}

export default SongIdListContext