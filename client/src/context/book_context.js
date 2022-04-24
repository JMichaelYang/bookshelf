import React, { useMemo } from 'react';
import { addBook, deleteBook, editBook, fetchBooks } from '../api/book_api';
import asyncDispatch from './async_dispatch';

export const LoadBooksAction = () => (dispatch) => {
  dispatch({ type: 'load_books' });
  const onFetched = (_error, results, _fields) => dispatch(LoadedBooksAction(results));
  fetchBooks(onFetched);
};

const LoadedBooksAction = (books) => ({ type: 'loaded_books', books });

export const FilterBooksAction = (search, rating, genres) => ({ type: 'filter_books', search, rating, genres });

export const AddBookAction = (book) => (dispatch) => {
  dispatch({ type: 'add_book' });
  const onAdd = (_error, _results, _fields) => dispatch({ type: 'added_book' });
  addBook(book, onAdd);
};

export const EditBookAction = (book) => (dispatch) => {
  dispatch({ type: 'edit_book' });
  const onEdit = (_error, _results, _fields) => dispatch({ type: 'edited_book' });
  editBook(book, onEdit);
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
    case 'filter_books':
      const { search, rating, genres } = action;
      const { books } = state;

      if (!books) return { ...state, filtered: null };

      const filtered = books.filter((book) => {
        return (
          (book.title.toLowerCase().includes(search.toLowerCase()) ||
            book.authors.findIndex((author) => author.toLowerCase().includes(search.toLowerCase())) >= 0) &&
          book.rating >= rating &&
          (genres.length === 0 || book.genres.findIndex((genre) => genres.includes(genre)) >= 0)
        );
      });

      return { ...state, filtered };
    default:
      return state;
  }
};

const initialState = { books: [], filtered: [] };
const BookContext = React.createContext({ state: initialState, dispatch: () => {} });

export const BookProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(bookReducer, initialState);
  const aDispatch = useMemo(() => asyncDispatch(dispatch), [dispatch]);

  return <BookContext.Provider value={{ state, dispatch: aDispatch }}>{children}</BookContext.Provider>;
};

export default BookContext;
