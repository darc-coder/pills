import React, { useState } from 'react';

export const activeNavContext = React.createContext();

function ActivePageContext({ children }) {
    const [activeNav, setactiveNav] = useState("Home");

    function activatePage(page) {
        setactiveNav(page);
    }


    return (
        <activeNavContext.Provider value={{ activeNav, activatePage }} >
            {children}
        </activeNavContext.Provider>
    )
}

export default ActivePageContext;