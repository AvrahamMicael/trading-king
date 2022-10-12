import axios from 'axios';

export default axios.create({
    baseURL: 'https://finnhub.io/api/v1',
    params: {
        token: process.env.REACT_APP_FINNHUB_API_KEY
    },
    // headers: {
    //     'X-Finnhub-Token': process.env.REACT_APP_FINNHUB_API_KEY, // doesn't work
    // },
});
