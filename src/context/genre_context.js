import React, { useMemo } from 'react';
import { fetchGenres } from '../api/genre_api';
import asyncDispatch from './async_dispatch';

export const LoadGenresAction = () => (dispatch) => {
  dispatch({ type: 'load_genres' });
  fetchGenres().then((genres) => dispatch(LoadedGenresAction(genres)));
};

const LoadedGenresAction = (genres) => ({ type: 'loaded_genres', genres });

const genreReducer = (state, action) => {
  switch (action.type) {
    case 'load_genres':
      return { ...state, genres: null };
    case 'loaded_genres':
      return { ...state, genres: action.genres };
    default:
      return initialState;
  }
};

const initialState = { genres: [] };

const GenreContext = React.createContext({
  state: initialState,
  dispatch: () => {},
});

export const GenreProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(genreReducer, initialState);
  const aDispatch = useMemo(() => asyncDispatch(dispatch), [dispatch]);

  return <GenreContext.Provider value={{ state, dispatch: aDispatch }}>{children}</GenreContext.Provider>;
};

export default GenreContext;
