import { createSlice, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const initialState = {
  movies: [],
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovies(state,action){
      state.movies = action.payload;
    },
    addMovie(state, action) {
      state.movies.push(action.payload);
    },
    deleteMovie(state, action) {
      const {id} = action.payload;
      state.movies = state.movies.filter((movie) => movie._id !== id);
    },
    editMovie(state, action) {
      const id = action.payload._id;
      const index = state.movies.findIndex((movie) => movie._id === id);
      state.movies[index] = action.payload;
    },
    toggleWatched(state,action) {
      const {id} = action.payload;
      const index = state.movies.findIndex((movie) => movie._id === id);
      if (index !== -1) {
        state.movies[index].isWatched = !state.movies[index].isWatched;
      }
    },
    rateMovie(state, action) {
      const id = action.payload._id;
      const index = state.movies.findIndex((movie) => movie._id === id);
      state.movies[index] = action.payload;
    },
    reviewMovie(state, action) {
      const id = action.payload._id;
      const index = state.movies.findIndex((movie) => movie._id === id);
      state.movies[index] = action.payload;
    },
  },
});

const persistedReducer = persistReducer(persistConfig, movieSlice.reducer);
export const store = configureStore({
  reducer: { movie: persistedReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);

export const movieActions = movieSlice.actions;
