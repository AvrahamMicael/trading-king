import { useState } from 'react';
import Chart from 'react-apexcharts';

const StockChart = ({ chartData, symbol }) => {

    const [ dateFormat, setDateFormat ] = useState('24h');

    const availableDateFormats = [ '24h', '7d', '1y' ];

    const seriesData = chartData[availableDateFormats.indexOf(dateFormat)];

    const color = seriesData.at(-1).y - seriesData[0].y >= 0 ? '#26C201' : '#ed3419';

    const options = {
        colors: [ color ],
        title: {
            text: symbol,
            align: 'center',
            style: {
                fontSize: '24px',
            },
        },
        chart: {
            id: 'stock data',
            animations: {
                speed: 1300,
            },
        },
        xaxis: {
            type: 'datetime',
            labels: {
                dateTimeUTC: false,
            },
        },
        tooltip: {
            x: {
                format: 'MMM dd HH:mm',
            },
        },
    };

    const series = [{
        name: symbol,
        data: seriesData,
    }];

    return (
        <div className="p-4 shadow-sm bg-white">
            <Chart
                options={ options }
                series={ series }
                type="area"
                width="100%"
            />
            <div className='d-flex justify-content-center'>
                {availableDateFormats.map(availableFormat => (
                    <button
                        key={ availableFormat }
                        onClick={ () => setDateFormat(availableFormat) }
                        className={`btn m-1 btn${dateFormat != availableFormat ? '-outline' : ''}-primary`}
                    >
                        { availableFormat }
                    </button>
                ))}
            </div>
        </div>
    );
};

export default StockChart;
