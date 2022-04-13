import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext, { User } from '../context/user_context';
import { IconButton, Stack, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function Home() {
  const [state, dispatch] = useContext(UserContext);
  const { user } = state;

  if (user === User.None) {
    return <Navigate to='/login' replace />;
  }

  const search = () => {};

  const SearchButton = (
    <IconButton onClick={search}>
      <SearchIcon />
    </IconButton>
  );

  return (
    <>
      <Typography variant='h3' component='h1' align='center' sx={{ mt: '4vw', mb: '20px', fontWeight: 'bold' }}>
        {`Hi ${user}! What would you like to read today?`}
      </Typography>
      <TextField
        id='search-field'
        autoFocus
        fullWidth
        label='Search for a book...'
        InputProps={{ endAdornment: SearchButton }}
      />
      <Stack direction='row' spacing={2}></Stack>
    </>
  );
}

export default Home;
