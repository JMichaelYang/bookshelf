import React, { useMemo } from 'react';
import { fetchBooks } from '../api/book_api';
import asyncDispatch from './async_dispatch';

export const LoadBooksAction = () => (dispatch) => {
  dispatch({ type: 'load_books' });
  fetchBooks().then((books) => dispatch(LoadedBooksAction(books)));
};

const LoadedBooksAction = (books) => ({ type: 'loaded_books', books });

export const FilterBooksAction = () => ({ type: 'filter_books' });

const bookReducer = (state, action) => {
  switch (action.type) {
    case 'load_books':
      return { ...state, books: null };
    case 'loaded_books':
      return { ...state, books: action.books };
    default:
      return initialState;
  }
};

const initialState = {
  books: [],
  filtered: [],
};

const BookContext = React.createContext({
  state: initialState,
  dispatch: () => {},
});

export const BookProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(bookReducer, initialState);
  const aDispatch = useMemo(() => asyncDispatch(dispatch), [dispatch]);

  return <BookContext.Provider value={{ state, dispatch: aDispatch }}>{children}</BookContext.Provider>;
};

export default BookContext;
