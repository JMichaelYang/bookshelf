import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext, { LogOutAction } from '../context/user_context';
import BookContext, { AddBookAction, LoadBooksAction } from '../context/book_context';
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { BookCarousel } from '../components/book_carousel';
import GenreSelect from '../components/genre_select';
import EditBook from '../components/edit_book';

// A component that displays a set of buttons that allows the user to perform actions.
const ButtonBar = (props) => {
  const { addBook, logOut } = props;

  return (
    <Stack direction='row' justifyContent={'space-between'} spacing={2}>
      <Button variant='outlined' onClick={addBook}>
        Add Book
      </Button>
      <Button variant='outlined' onClick={logOut}>
        Log Out
      </Button>
    </Stack>
  );
};

// A component that allows the user to search for a book.
const SearchBar = (props) => {
  const { search, setSearch, executeSearch } = props;

  const SearchButton = (
    <IconButton onClick={executeSearch}>
      <SearchIcon />
    </IconButton>
  );

  return (
    <FormControl>
      <TextField
        id='search-field'
        autoFocus
        fullWidth
        value={search}
        onChange={setSearch}
        label='Search for a book or author...'
        InputProps={{ endAdornment: SearchButton }}
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

  useEffect(() => {
    if (!addOpen) bookDispatch(LoadBooksAction(search, rating, genres));
  }, [bookDispatch, search, rating, genres, addOpen]);

  if (currentUser === null) return <Navigate to='/login' replace />;

  const executeSearch = () => {};

  const createBook = (book) => bookDispatch(AddBookAction(book));
  const logOut = () => userDispatch(LogOutAction());

  const updateSearch = (event) => setSearch(event.target.value);
  const updateRating = (event) => setRating(event.target.value);
  const updateGenres = (event) => setGenres(event.target.value);

  const openAddBook = () => setAddOpen(true);
  const closeAddBook = () => setAddOpen(false);

  return (
    <>
      <Stack spacing={2} sx={{ my: '2vw' }}>
        <ButtonBar addBook={openAddBook} logOut={logOut} />
        <Paper sx={{ p: '32px' }}>
          <Stack spacing={2}>
            <Typography variant='h4' component='h4' align='center' sx={{ mb: '20px', fontWeight: 'bold' }}>
              {`Hi ${name}! What would you like to read today?`}
            </Typography>
            <SearchBar search={search} setSearch={updateSearch} executeSearch={executeSearch} />
            <Stack spacing={2} direction='row'>
              <RatingSelect rating={rating} setRating={updateRating} />
              <GenreSelect genres={genres} setGenres={updateGenres} />
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
