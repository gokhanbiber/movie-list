import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { MovieDetailsModal } from '../modal';

export const getMovieDetails = createAsyncThunk('get-movie-details', async (url: URL) => {
  const response = await fetch(url);
  return response.json();
});

interface MovieDetails {
  movie: MovieDetailsModal;
  status: string;
}

const initialState: MovieDetails = {
  movie: {} as MovieDetailsModal,
  status: '',
};

const movieDetailSlice = createSlice({
  name: 'movieDetails',
  initialState,
  reducers: {
    clearMovieDetails: (state) => {
      state.movie = {} as MovieDetailsModal;
      state.status = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovieDetails.fulfilled, (state, action) => {
        if (action.payload.Error) {
          state.status = 'error';
          alert(action.payload.Error);
        } else {
          state.movie = action.payload;
          state.status = 'success';
        }
      })
      .addCase(getMovieDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getMovieDetails.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const { clearMovieDetails } = movieDetailSlice.actions;

export default movieDetailSlice.reducer;
