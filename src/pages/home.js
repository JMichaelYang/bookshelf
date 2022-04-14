import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext, { LogOutAction } from '../context/user_context';
import BookContext, { LoadBooksAction } from '../context/book_context';
import GenreContext, { LoadGenresAction } from '../context/genre_context';
import {
  Box,
  Button,
  Chip,
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

// A component that displays a set of buttons that allows the user to perform actions.
const ButtonBar = (props) => {
  const { addBook, deleteBook, logOut } = props;

  return (
    <Stack direction='row' justifyContent={'space-between'} spacing={2}>
      <Stack direction='row' spacing={2}>
        <Button variant='outlined' onClick={addBook}>
          Add Book
        </Button>
        <Button variant='outlined' color='error' onClick={deleteBook}>
          Delete Book
        </Button>
      </Stack>
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

// A component that allows the user to select a set of genres to filter by.
const GenreSelect = (props) => {
  const { genres, setGenres } = props;
  let { options } = props;

  if (options === null) options = [];

  const getGenreById = (id) => options.find((val) => val.genre_id === id);

  const renderSelected = (selected) => (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
      {selected.map((val) => (
        <Chip key={`genre-${val}`} label={getGenreById(val).name} />
      ))}
    </Box>
  );

  return (
    <FormControl sx={{ minWidth: '100px' }}>
      <InputLabel id='genre-select-label'>Genre</InputLabel>
      <Select
        SelectDisplayProps={{ style: { paddingTop: 12, paddingBottom: 12, height: 32 } }}
        labelId='genre-select-label'
        id='genre-select'
        value={genres}
        label='Genres'
        onChange={setGenres}
        renderValue={renderSelected}
        multiple
        sx={{ p: 0 }}
      >
        {options.map((val) => (
          <MenuItem key={val.genre_id} value={val.genre_id}>
            {val.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const Home = () => {
  const [search, setSearch] = useState('');
  const [rating, setRating] = useState(0);
  const [genres, setGenres] = useState([]);
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  const { state: bookState, dispatch: bookDispatch } = useContext(BookContext);
  const { state: genreState, dispatch: genreDispatch } = useContext(GenreContext);
  const { currentUser } = userState;
  const { books } = bookState;
  const { genres: allGenres } = genreState;

  useEffect(() => {
    bookDispatch(LoadBooksAction());
  }, [bookDispatch]);

  useEffect(() => {
    genreDispatch(LoadGenresAction());
  }, [genreDispatch]);

  if (currentUser === null) {
    return <Navigate to='/login' replace />;
  }

  const { name } = currentUser;

  const executeSearch = () => {};
  const addBook = () => {};
  const deleteBook = () => {};
  const logOut = () => userDispatch(LogOutAction());

  const updateSearch = (event) => setSearch(event.target.value);
  const updateRating = (event) => setRating(event.target.value);
  const updateGenres = (event) => {
    console.log(event.target.value);
    setGenres(event.target.value);
  };

  return (
    <Stack spacing={2} sx={{ mt: '4vw' }}>
      <ButtonBar addBook={addBook} deleteBook={deleteBook} logOut={logOut} />
      <Paper sx={{ p: '32px' }}>
        <Stack spacing={2}>
          <Typography variant='h4' component='h1' align='center' sx={{ mb: '20px', fontWeight: 'bold' }}>
            {`Hi ${name}! What would you like to read today?`}
          </Typography>
          <SearchBar search={search} setSearch={updateSearch} executeSearch={executeSearch} />
          <Stack spacing={2} direction='row'>
            <RatingSelect rating={rating} setRating={updateRating} />
            <GenreSelect genres={genres} setGenres={updateGenres} options={allGenres} />
          </Stack>
          <BookCarousel books={books} />
        </Stack>
      </Paper>
    </Stack>
  );
};

export default Home;
