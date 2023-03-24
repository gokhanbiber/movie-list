import React, { useState } from 'react';
import { APIKEY } from '../custom/const';
import { useAppDispatch } from '../custom/hooks';
import { fetchMovies } from '../state/movieSlice';

const Search = () => {
  const [title, setTitle] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const dispatch = useAppDispatch();

  const clearFilters = () => {
    setTitle('');
    setYear('');
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const urlOmdb = new URL(`https://www.omdbapi.com/`);
    urlOmdb.searchParams.append('s', title);
    year && urlOmdb.searchParams.append('y', year);
    urlOmdb.searchParams.append('apiKey', APIKEY);
    dispatch(fetchMovies(urlOmdb));

    clearFilters();
  };

  return (
    <div className="search">
      <form onSubmit={handleSubmit}>
        <input
          className="search__bar"
          type="search"
          name="title"
          placeholder="Title..."
          minLength={3}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="search__bar"
          type="search"
          name="year"
          placeholder="Year... 1900~2099"
          pattern="^(19|20)\d{2}$"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <button className="search__submit" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
