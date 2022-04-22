import React, { useMemo } from 'react';
import { addBook, deleteBook, fetchBooks } from '../api/book_api';
import asyncDispatch from './async_dispatch';

export const LoadBooksAction = (search, rating, genres) => (dispatch) => {
  dispatch({ type: 'load_books' });
  const onFetched = (_error, results, _fields) => dispatch(LoadedBooksAction(results));
  fetchBooks(search, rating, genres, onFetched);
};

const LoadedBooksAction = (books) => ({ type: 'loaded_books', books });

export const AddBookAction = (book) => (dispatch) => {
  dispatch({ type: 'add_book' });
  const onAdd = (_error, _results, _fields) => dispatch({ type: 'added_book' });
  addBook(book, onAdd);
};

export const DeleteBookAction = (book_id) => (dispatch) => {
  dispatch({ type: 'delete_book' });
  const onDelete = (_error, _results, _fields) => dispatch({ type: 'deleted_book' });
  deleteBook(book_id, onDelete);
};

const bookReducer = (state, action) => {
  switch (action.type) {
    case 'load_books':
      return { ...state, books: null };
    case 'loaded_books':
      return { ...state, books: action.books };
    default:
      return state;
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
