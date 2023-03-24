import React from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../component/MovieCard';
import Search from '../component/Search';
import { useAppSelector } from '../custom/hooks';

const Listing = () => {
  const { movies } = useAppSelector((state) => state.movie);

  return (
    <section>
      <Search />
      <div className="movie-list">
        {movies?.map((movie) => (
          <Link key={movie.imdbID} to={movie.imdbID}>
            <MovieCard img={movie.Poster} />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Listing;
