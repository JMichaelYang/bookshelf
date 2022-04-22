import { USE_LOCAL } from './constants';
import localBooks from '../test_data/books.json';

/* ----- LOCAL FUNCTIONS ----- */

let instance_books = localBooks;

const fetchBooksLocal = async (onComplete) => {
  await new Promise((_) => setTimeout(_, 1000));
  onComplete(null, [...instance_books], null);
};

const addBookLocal = async (book, onComplete) => {
  await new Promise((_) => setTimeout(_, 1000));
  const newBook = { ...book, rating: 0, book_id: instance_books.length };
  instance_books = [...instance_books, newBook];
  onComplete(null, instance_books, null);
};

const deleteBookLocal = async (book_id, onComplete) => {
  await new Promise((_) => setTimeout(_, 1000));
  instance_books = instance_books.filter((book) => book.book_id !== book_id);
  onComplete(null, instance_books, null);
};

/* ----- REMOTE FUNCTIONS ----- */

const fetchBooksRemote = async (onComplete) => {};

const addBookRemote = async (book, onComplete) => {};

const deleteBookRemote = async (bookd_id, onComplete) => {};

export const fetchBooks = USE_LOCAL ? fetchBooksLocal : fetchBooksRemote;
export const addBook = USE_LOCAL ? addBookLocal : addBookRemote;
export const deleteBook = USE_LOCAL ? deleteBookLocal : deleteBookRemote;
