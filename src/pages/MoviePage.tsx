import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails, clearMovieDetails } from '../state/movieDetailSlice';
import { useAppDispatch, useAppSelector } from '../custom/hooks';
import MovieDescription from '../component/MovieDescription';

const MoviePage = () => {
  const { movieId } = useParams<'movieId'>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const urlOmdb = new URL(`https://www.omdbapi.com/?i=${movieId}&apikey=7f2a1bfe`);

    dispatch(getMovieDetails(urlOmdb));
  }, [dispatch, movieId]);

  const { movie, status } = useAppSelector((state) => state.movieDetails);

  const handleBack = () => {
    dispatch(clearMovieDetails());
    navigate('/');
  };

  return (
    <div className="movie-page">
      <div className="movie-page-nav">
        <button className="btn-back" type="button" onClick={handleBack}>
          Back
        </button>
      </div>
      {status === 'success' && (
        <div className="movie-page-detail">
          <div className="movie-page-detail-main">
            <img alt="poster" src={movie.Poster} />
          </div>
          <div className="movie-page-detail-description">
            <h4>
              <span className="text-bolder">
                {movie.Title} / {movie.imdbRating}
              </span>
            </h4>
            <MovieDescription desc="Plot" text={movie.Plot} />
            <MovieDescription desc="Director" text={movie.Director} />
            <MovieDescription desc="Genres" text={movie.Genre} />
            <MovieDescription desc="Actors" text={movie.Actors} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviePage;
