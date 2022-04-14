import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext, { LogOutAction } from '../context/user_context';
import BookContext, { LoadBooksAction } from '../context/book_context';
import { Button, IconButton, Paper, Stack, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { BookCarousel } from '../components/book_carousel';

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

const Home = () => {
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  const { state: bookState, dispatch: bookDispatch } = useContext(BookContext);
  const { currentUser } = userState;
  const { books } = bookState;

  useEffect(() => {
    bookDispatch(LoadBooksAction());
  }, [bookDispatch]);

  if (currentUser === null) {
    return <Navigate to='/login' replace />;
  }

  const { name } = currentUser;

  const search = () => {};
  const addBook = () => {};
  const deleteBook = () => {};
  const logOut = () => userDispatch(LogOutAction());

  const SearchButton = (
    <IconButton onClick={search}>
      <SearchIcon />
    </IconButton>
  );

  return (
    <Stack spacing={2} sx={{ mt: '4vw' }}>
      <ButtonBar addBook={addBook} deleteBook={deleteBook} logOut={logOut} />
      <Paper sx={{ p: '32px' }}>
        <Stack spacing={2}>
          <Typography variant='h4' component='h1' align='center' sx={{ mb: '20px', fontWeight: 'bold' }}>
            {`Hi ${name}! What would you like to read today?`}
          </Typography>
          <TextField
            id='search-field'
            autoFocus
            fullWidth
            label='Search for a book or author...'
            InputProps={{ endAdornment: SearchButton }}
          />
          <BookCarousel books={books} />
        </Stack>
      </Paper>
    </Stack>
  );
};

export default Home;
