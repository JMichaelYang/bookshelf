import React, { useMemo } from 'react';
import { fetchBooks } from '../api/book_api';

const initialState = { 
  books: [],
  filtered: [] 
};

export const LoadBooksAction = () => (dispatch) => {
  dispatch({ type: 'load_books' });
  fetchBooks().then(books => dispatch(LoadedBooksAction(books)));
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

const BookContext = React.createContext({
  state: initialState,
  dispatch: () => {},
});

const wrapDispatch = (dispatch) => (action) => {
  if(action instanceof Function) {
    return action(dispatch);
  }

  return dispatch(action);
};

export const BookProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(bookReducer, initialState);
  const asyncDispatch = useMemo(() => wrapDispatch(dispatch), [dispatch]);

  console.log(state);

  return <BookContext.Provider value={{ state, dispatch: asyncDispatch }}>{children}</BookContext.Provider>;
};

export default BookContext;
