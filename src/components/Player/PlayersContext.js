import React from 'react'

export const reInitContext = React.createContext();

function PlayersContext({ children }) {

    const reInit = () => {
        return null;
    }

    return (
        <reInitContext.Provider value={reInit}>
            {children}
        </reInitContext.Provider>
    )
}

export default PlayersContext;