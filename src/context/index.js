import React, { createContext } from 'react';

const AppContext = createContext({
    currentCoord: undefined,
    setCurrentCoord: () => { },
    destinationCoord: undefined,
    setDestinationCoord: () => { },
    sourceCoord: undefined,
    setSourceCoord: () => { },
    selectCoord: undefined,
    setSelectCoord: () => { },
});

export default AppContext;