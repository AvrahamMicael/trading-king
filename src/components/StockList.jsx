import { useState } from 'react';
import FinnHub from '../apis/FinnHub';
import { useEffect } from 'react';
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import { useWatchListContext } from '../contexts/watchListContext';
import { useNavigate } from 'react-router-dom';

const StockList = () => {

    const navigate = useNavigate();
    const [ stock, setStock ] = useState([]);
    const { watchList, deleteStock } = useWatchListContext();

    const handleStockSelect = symbol => navigate(`details/${symbol}`);

    const valuesForNegativeAnd0AndPositive = (number, valueForNegative, valueFor0, valueForPositive) => number < 0
        ? valueForNegative
        : number == 0
            ? valueFor0
            : valueForPositive;

    const getStockColor = stockDataNumber => valuesForNegativeAnd0AndPositive(
        stockDataNumber,
        'danger',
        'dark',
        'success'
    );
    const renderIconIfNeeded = stockDataNumber => valuesForNegativeAnd0AndPositive(
        stockDataNumber,
        <BsFillCaretDownFill className='ms-1'/>,
        null,
        <BsFillCaretUpFill className='mb-1 ms-1'/>
    );

    const fetchData = async () => {
        await Promise.allSettled(watchList.map(symbol => FinnHub.get('/quote', {
            params: { symbol },
        })))
            .then(responses => responses.filter(({ status }) => status == 'fulfilled').map(({ value }) => value))
            .then(responses => {
                setStock(
                    responses.map(res => ({
                        data: res.data,
                        symbol: res.config.params.symbol,
                    }))
                );
            });
    };

    useEffect(() => {
        fetchData();
    }, [ watchList ]);
    
    return (
        <div>
            <table className='table table-hover mt-5'>
                <thead style={{ color: 'black' }}>
                    <tr>
                        <th scope='col'>Name</th>
                        <th scope='col'>Last</th>
                        <th scope='col'>Chg</th>
                        <th scope='col'>Chg%</th>
                        <th scope='col'>High</th>
                        <th scope='col'>Low</th>
                        <th scope='col'>Open</th>
                        <th scope='col'>Pclose</th>
                    </tr>
                </thead>
                <tbody>
                    {stock.map(({ symbol, data }) => (
                        <tr onClick={ () => handleStockSelect(symbol) } className='table-row' key={ symbol } style={{ cursor: 'pointer' }}>
                            <th scope='row'>{ symbol }</th>
                            <td>{ data.c }</td>
                            <td className={`position-relative text-${getStockColor(data.d)}`}>
                                { data.d }
                                {renderIconIfNeeded(data.d)}
                            </td>
                            <td className={`position-relative text-${getStockColor(data.dp)}`}>
                                { data.dp }
                                {renderIconIfNeeded(data.dp)}
                            </td>
                            <td>{ data.h }</td>
                            <td>{ data.l }</td>
                            <td>{ data.o }</td>
                            <td>
                                { data.pc }
                                <button
                                    onClick={ ev => {
                                        ev.stopPropagation();
                                        deleteStock(symbol);
                                    } }
                                    type="button"
                                    className="btn btn-danger btn-sm ms-3 d-inline-block delete-btn"
                                >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StockList;
