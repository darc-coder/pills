import React, { useState } from 'react';

export const playingContext = React.createContext();
export const toggleContext = React.createContext();
export const durationContext = React.createContext();
export const fullDurationContext = React.createContext();

function AudioStateContext({ children }) {
    const [playing, setPlaying] = useState(false);
    const toggle = () => setPlaying(!playing);
    const [duration, setDuration] = useState(0);
    const [fullDuration, setFullDuration] = useState(0);

    return (
        <playingContext.Provider value={{ playing, setPlaying }}>
            <toggleContext.Provider value={{ toggle }}>
                <durationContext.Provider value={{ duration, setDuration }}>
                    <fullDurationContext.Provider value={{ fullDuration, setFullDuration }}>
                        {children}
                    </fullDurationContext.Provider>
                </durationContext.Provider>
            </toggleContext.Provider >
        </playingContext.Provider >
    )
}

export default AudioStateContext