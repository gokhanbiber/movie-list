import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppDispatch } from './custom/hooks';
import './App.css';
import Listing from './pages/Listing';
import MoviePage from './pages/MoviePage';
import { fetchMovies } from './state/movieSlice';
import { APIKEY } from './custom/const';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    //default
    const urlOmdb = new URL(`https://www.omdbapi.com/?s=the%20last&apikey=${APIKEY}`);

    dispatch(fetchMovies(urlOmdb));
  }, [dispatch]);

  return (
    <main className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/movies" />} />
        <Route path="/movies" element={<Listing />} />
        <Route path="/movies/:movieId" element={<MoviePage />} />
        <Route path="*" element={<h1 className="not-found">Page Not Found</h1>} />{' '}
      </Routes>
    </main>
  );
}

export default App;
