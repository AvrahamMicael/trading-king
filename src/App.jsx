import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import OverView from './pages/Overview';
import Details from './pages/Details';

const App = () => (
  <main className='container'>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={ <OverView/> }
        />
        <Route
          path="/details/:symbol"
          element={ <Details/> }
        />
        <Route
          path="*"
          element={ <Navigate to="/" replace/> }
        />
      </Routes>
    </BrowserRouter>
  </main>
);

export default App;
