import { useState } from 'react';
import { useEffect } from 'react';
import FinnHub from '../apis/FinnHub';
import { useWatchListContext } from '../contexts/watchListContext';

const AutoCompleteInput = () => {

    const [ search, setSearch ] = useState('');
    const [ results, setResults ] = useState([]);

    const { addStock } = useWatchListContext();

    const onClickStock = stockSymbol => {
        addStock(stockSymbol);
        setSearch('');
    };

    const renderDropdown = () => (
        <ul
            style={{
                height: '500px',
                overflowY: 'scroll',
                overflowX: 'hidden',
            }}
            className={`dropdown-menu ${results.length ? 'show' : null}`}
        >
            {results.map(({ symbol, description: name }) => (
                <li key={ symbol } onClick={ () => onClickStock(symbol) } className='dropdown-item' style={{ cursor: 'pointer' }}>
                    { name }
                    &nbsp;
                    <span className="text-secondary">
                        ({ symbol })
                    </span>
                </li>
            ))}
        </ul>
    );

    const fetchData = async () => {
        if(!search)
        {
            setResults([]);
            return;
        }
        try
        {
            const { data } = await FinnHub.get('/search', {
                params: { q: search },
            });
            setResults(data.result);
        }
        catch(error)
        {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [ search ]);
    
    return (
        <div className="w-50 p-5 rounded mx-auto">
            <div className="form-floating dropdown">
                <input
                    type="text"
                    id="search"
                    className="form-control"
                    placeholder="Search"
                    autoComplete="off"
                    value={ search }
                    onInput={ ev => setSearch(ev.target.value) }
                />
                <label htmlFor="search">Search</label>
                {renderDropdown()}
            </div>
        </div>
    );
};

export default AutoCompleteInput;
