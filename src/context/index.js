import React, { createContext } from 'react';

const AppContext = createContext({
    currentCoord: undefined,
    setCurrentCoord: () => { },
    nextCoord: undefined,
    setNextCoord: () => { },
});

export default AppContext;