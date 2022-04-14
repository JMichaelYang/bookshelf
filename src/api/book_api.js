import localBooks from '../test_data/books.json';

// Local development flag.
const USE_LOCAL = true;

const fetchBooksLocal = async () => {
  // Delay 1 second for testing purposes.
  await new Promise(_ => setTimeout(_, 1000));
  return localBooks;
};

const fetchBooksRemote = async () => [];

export const fetchBooks = async () => {
  return USE_LOCAL ? await fetchBooksLocal() : await fetchBooksRemote();
};