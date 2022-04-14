import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext, { LogOutAction, User } from '../context/user_context';
import BookContext, { LoadBooksAction } from '../context/book_context';
import { Box, Button, CircularProgress, IconButton, Paper, Stack, TextField, Typography } from '@mui/material';
import BookTile from '../components/book_tile';
import SearchIcon from '@mui/icons-material/Search';

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
  const { user } = userState;
  const { books } = bookState;

  useEffect(() => {
    bookDispatch(LoadBooksAction());
  }, [bookDispatch]);

  if (user === User.None) {
    return <Navigate to='/login' replace />;
  }

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
        <Typography variant='h4' component='h1' align='center' sx={{ mb: '20px', fontWeight: 'bold' }}>
          {`Hi ${user}! What would you like to read today?`}
        </Typography>
        <TextField
          id='search-field'
          autoFocus
          fullWidth
          label='Search for a book...'
          InputProps={{ endAdornment: SearchButton }}
        />
      </Paper>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ p: '32px' }}>
          <Typography variant='h6' component='h1' align='left' sx={{ mb: '20px', fontWeight: 'bold' }}>
            House Favorites
          </Typography>
          {books === null ? (
            <CircularProgress />
          ) : (
            <Stack direction='row' sx={{ width: '100%', overflow: 'auto' }}>
              {books.map((book) => (
                <BookTile key={`book-${book.id}`} book={book} />
              ))}
            </Stack>
          )}
        </Paper>
      </Box>
    </Stack>
  );
};

export default Home;
