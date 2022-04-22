import { USE_LOCAL } from './constants';
import localBooks from '../test_data/books.json';

/* ----- LOCAL FUNCTIONS ----- */

let instance_books = localBooks;

const fetchBooksLocal = async (search, rating, genres, onComplete) => {
  await new Promise((_) => setTimeout(_, 1000));
  const filtered = instance_books.filter((book) => {
    return (
      (book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.authors.findIndex((author) => author.toLowerCase().includes(search.toLowerCase())) >= 0) &&
      book.rating >= rating &&
      (genres.length === 0 || book.genres.findIndex((genre) => genres.includes(genre)) >= 0)
    );
  });
  onComplete(null, filtered, null);
};

const addBookLocal = async (book, onComplete) => {
  await new Promise((_) => setTimeout(_, 1000));
  const newBook = { ...book, rating: 0, book_id: instance_books.length };
  instance_books = [...instance_books, newBook];
  onComplete(null, instance_books, null);
};

const editBookLocal = async (book, onComplete) => {
  await new Promise((_) => setTimeout(_, 1000));
  instance_books = [...instance_books];
  const i = instance_books.findIndex((b) => b.book_id === book.book_id);
  instance_books[i] = book;
  onComplete(null, book, null);
};

const deleteBookLocal = async (book_id, onComplete) => {
  await new Promise((_) => setTimeout(_, 1000));
  instance_books = instance_books.filter((book) => book.book_id !== book_id);
  onComplete(null, instance_books, null);
};

/* ----- REMOTE FUNCTIONS ----- */

const fetchBooksRemote = async (search, rating, genres, onComplete) => {};

const addBookRemote = async (book, onComplete) => {};

const editBookRemote = async (book, onComplete) => {};

const deleteBookRemote = async (bookd_id, onComplete) => {};

export const fetchBooks = USE_LOCAL ? fetchBooksLocal : fetchBooksRemote;
export const addBook = USE_LOCAL ? addBookLocal : addBookRemote;
export const editBook = USE_LOCAL ? editBookLocal : editBookRemote;
export const deleteBook = USE_LOCAL ? deleteBookLocal : deleteBookRemote;
