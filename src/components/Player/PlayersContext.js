import React, { useState } from 'react'

export const playerMaxedContext = React.createContext();
export const imgSrcContext = React.createContext();
export const qualityContext = React.createContext();
export const urlContext = React.createContext();
export const downloadingContext = React.createContext();
export const downloadedContext = React.createContext();
export const reInitContext = React.createContext();

function PlayersContext({ children }) {
    const [playerMaxed, setPlayerMax] = useState(true);
    const [imgSrc, setImgSrc] = useState('');
    const [quality, setQuality] = useState('low');
    const [url, setUrl] = useState('');
    const [downloading, setDownloading] = useState(false);
    const [downloaded, setDownloaded] = useState(false);

    const reInit = () => {
        setPlayerMax(false);
        setQuality('low');
        setUrl('');
        setDownloading(false);
        setDownloaded(false);
    }

    return (

        <playerMaxedContext.Provider value={{ playerMaxed, setPlayerMax }}>
            <imgSrcContext.Provider value={{ imgSrc, setImgSrc }}>
                <qualityContext.Provider value={{ quality, setQuality }}>
                    <urlContext.Provider value={{ url, setUrl }}>
                        <downloadingContext.Provider value={{ downloading, setDownloading }}>
                            <downloadedContext.Provider value={{ downloaded, setDownloaded }}>
                                <reInitContext.Provider value={reInit}>
                                    {children}
                                </reInitContext.Provider>
                            </downloadedContext.Provider>
                        </downloadingContext.Provider>
                    </urlContext.Provider>
                </qualityContext.Provider>
            </imgSrcContext.Provider>
        </playerMaxedContext.Provider >
    )
}

export default PlayersContext;