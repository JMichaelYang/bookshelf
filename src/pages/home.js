import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext, { LogOutAction } from '../context/user_context';
import BookContext, { AddBookAction, LoadBooksAction } from '../context/book_context';
import { FormControl, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material';
import { BookCarousel } from '../components/book_carousel';
import GenreSelect from '../components/genre_select';
import EditBook from '../components/edit_book';
import debounce from 'lodash.debounce';
import ButtonBar from '../components/button_bar';

// A component that allows the user to search for a book.
const SearchBar = (props) => {
  const { search, setSearch } = props;

  return (
    <FormControl>
      <TextField
        id='search-field'
        autoFocus
        fullWidth
        value={search}
        onChange={setSearch}
        label='Search for a book or author...'
      />
    </FormControl>
  );
};

// A component that allows the user to select a rating to filter by.
const RatingSelect = (props) => {
  const { rating, setRating } = props;

  return (
    <FormControl>
      <InputLabel id='rating-select-label'>Rating</InputLabel>
      <Select labelId='rating-select-label' id='rating-select' value={rating} label='Rating' onChange={setRating}>
        <MenuItem value={0}>None</MenuItem>
        <MenuItem value={1}>{'> 1 star'}</MenuItem>
        <MenuItem value={2}>{'> 2 stars'}</MenuItem>
        <MenuItem value={3}>{'> 3 stars'}</MenuItem>
        <MenuItem value={4}>{'> 4 stars'}</MenuItem>
      </Select>
    </FormControl>
  );
};

const EMPTY_BOOK = Object.freeze({ title: '', authors: [], genres: [], image: '', description: '' });

const Home = () => {
  const [search, setSearch] = useState('');
  const [rating, setRating] = useState(0);
  const [genres, setGenres] = useState([]);
  const [addOpen, setAddOpen] = useState(false);
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  const { state: bookState, dispatch: bookDispatch } = useContext(BookContext);
  const { currentUser } = userState;
  const { name } = currentUser || {};
  const { books } = bookState;

  const updateSearch = (event) => setSearch(event.target.value);
  const updateRating = (event) => setRating(event.target.value);
  const openAddBook = () => setAddOpen(true);
  const closeAddBook = () => setAddOpen(false);

  const executeSearch = useMemo(() => {
    return debounce((s, r, g) => bookDispatch(LoadBooksAction(s, r, g)), 300);
  }, [bookDispatch]);

  useEffect(() => {
    executeSearch(search, rating, genres);
  }, [executeSearch, search, rating, genres]);

  const createBook = (book) => {
    bookDispatch(AddBookAction(book));
    executeSearch(search, rating, genres);
  };

  const logOut = () => userDispatch(LogOutAction());

  if (currentUser === null) return <Navigate to='/login' replace />;

  const addButton = { color: 'primary', action: openAddBook, text: 'Add Book' };
  const logOutButton = { color: 'primary', action: logOut, text: 'Log Out' };

  return (
    <>
      <Stack spacing={2} sx={{ my: '2vw' }}>
        <ButtonBar leftButtons={[addButton]} rightButtons={[logOutButton]} />
        <Paper sx={{ p: '32px' }}>
          <Stack spacing={2}>
            <Typography variant='h4' component='h4' align='center' sx={{ mb: '20px', fontWeight: 'bold' }}>
              {`Hi ${name}! What would you like to read today?`}
            </Typography>
            <SearchBar search={search} setSearch={updateSearch} />
            <Stack spacing={2} direction='row'>
              <RatingSelect rating={rating} setRating={updateRating} />
              <GenreSelect genres={genres} setGenres={setGenres} />
            </Stack>
            <BookCarousel books={books} />
          </Stack>
        </Paper>
      </Stack>
      <EditBook open={addOpen} onSubmit={createBook} onClose={closeAddBook} book={EMPTY_BOOK} />
    </>
  );
};

export default Home;
