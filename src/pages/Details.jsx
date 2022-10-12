import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import FinnHub from "../apis/FinnHub";
import StockChart from "../components/StockChart";
import StockData from "../components/StockData";

const Details = () => {

    const navigate = useNavigate();

    const [ chartData, setChartData ] = useState([]);
    
    const { symbol } = useParams();

    if(!symbol)
    {
        console.log('test', symbol);
        navigate('/');
    }

    const getCurrentTime = () => Math.floor(((new Date()).getTime() / 1000));

    const getFromTimeAndResolutionArray = () => {
        const today = new Date();
        const currentTime = getCurrentTime();
        let oneDay = currentTime;
        const oneWeek = currentTime - 60*60*24*7;
        const oneYear = currentTime - 60*60*24*365;
        switch(today.getDay())
        {
            case 0:
                oneDay -= 60*60*24*3;
                break;
            case 6:
                oneDay -= 60*60*24*2;
                break;
            default:
                oneDay -= 60*60*24;
        }
        return [
            { from: oneDay, resolution: 30 },
            { from: oneWeek, resolution: 60 },
            { from: oneYear, resolution: 'W' },
        ];
    };

    const formatResponsesData = responses => responses.map(({ data }) => data.t.map((el, index) => ({
        x: el*1000,
        y: Number(data.c[index].toFixed(2)),
    })));

    const fetchData = async () => {
        try
        {
            const responses = await Promise.all(getFromTimeAndResolutionArray().map(({ from, resolution }) => FinnHub.get('/stock/candle', {
                params: {
                    symbol,
                    from,
                    resolution,
                    to: getCurrentTime(),
                },
            })));
            setChartData(formatResponsesData(responses));
        }
        catch(error)
        {
            console.log(error);
            navigate('/');
        }
    };

    useEffect(() => {
        fetchData();
    }, [ symbol ]);
    
    return (
        <section>
            <Link to="/" className="btn btn-outline-secondary position-absolute mt-3 ms-1" style={{ zIndex: '100' }}>
                Home
            </Link>
            {chartData.length > 0 && (
                <>
                    <StockChart
                        chartData={ chartData }
                        symbol={ symbol }
                    />
                    <StockData symbol={ symbol }/>
                </>
            )}
        </section>
    );
};

export default Details;
