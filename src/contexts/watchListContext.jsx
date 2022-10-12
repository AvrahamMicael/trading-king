import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';

const WatchListContext = React.createContext();

export const WatchListContextProvider = ({ children }) => {
    const [ watchList, setWatchList ] = useState(JSON.parse(localStorage.watchList ?? '[ "GOOGL", "MSFT", "AMZN" ]'));
    
    const addStock = stockSymbol => {
        if(watchList.some(symbol => symbol == stockSymbol)) return;
        setWatchList([ ...watchList, stockSymbol ])
    };

    const deleteStock = stockSymbol => setWatchList(
        watchList.filter(symbol => symbol != stockSymbol)
    );

    useEffect(() => {
        localStorage.watchList = JSON.stringify(watchList);
    }, [ watchList ]);

    return (
        <WatchListContext.Provider value={{ watchList, addStock, deleteStock }}>
            { children }
        </WatchListContext.Provider>
    );
};

export const useWatchListContext = () => useContext(WatchListContext);
