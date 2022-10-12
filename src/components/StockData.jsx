import { useEffect, useState } from 'react';
import FinnHub from '../apis/FinnHub';

const StockData = ({ symbol }) => {

    const [ stockData, setStockData ] = useState(null);

    const fetchData = async () => {
        try
        {
            const { data } = await FinnHub.get('/stock/profile2', {
                params: { symbol },
            });

            console.log(data);
            setStockData(data);
        }
        catch(error)
        {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [ symbol ]);
    
    return (
        <div>
            {stockData && (
                <div className="row border bg-white rounded shadow-sm p-4 mt-5 mb-3">
                    <div className="col-4">
                        <div><span className="fw-bold">Name: { stockData.name }</span></div>
                        <div><span className="fw-bold">Country: { stockData.country }</span></div>
                        <div><span className="fw-bold">Ticker: { stockData.ticker }</span></div>
                    </div>
                    <div className="col-4">
                        <div><span className="fw-bold">Exchange: { stockData.exchange }</span></div>
                        <div><span className="fw-bold">Industry: { stockData.finnhubIndustry }</span></div>
                        <div><span className="fw-bold">IPO: { stockData.ipo }</span></div>
                    </div>
                    <div className="col-4">
                        <div><span className="fw-bold">MarketCap: { stockData.marketCapitalization }</span></div>
                        <div><span className="fw-bold">Shares Outstanding: { stockData.shareOutstanding }</span></div>
                        <div>
                            <span className="fw-bold">URL: </span>
                            <a href={ stockData.weburl }>{ stockData.weburl }</a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StockData;
