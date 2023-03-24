import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { MovieModal } from '../modal';

export const fetchMovies = createAsyncThunk('fetch-movie', async (url: URL) => {
  const response = await fetch(url);
  return response.json();
});

interface Movies {
  movies: MovieModal[];
  status: string;
}

const initialState: Movies = {
  movies: [],
  status: '',
};

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        if (action.payload.Error) {
          state.status = 'error';
          alert(action.payload.Error);
        } else {
          state.movies = action.payload.Search;
          state.status = 'success';
        }
      })
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export default movieSlice.reducer;
