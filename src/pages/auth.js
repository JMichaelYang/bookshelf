import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext, { LoadUsersAction, LogInAction } from '../context/user_context';
import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';

const Auth = () => {
  const { state, dispatch } = useContext(UserContext);
  const { currentUser, users } = state;

  useEffect(() => {
    dispatch(LoadUsersAction());
  }, [dispatch]);

  if (currentUser !== null) {
    return <Navigate to='/' replace />;
  }

  const renderUserButton = (buttonUser) => {
    const onClick = () => dispatch(LogInAction(buttonUser));

    return (
      <Button
        key={`user-${buttonUser.name}`}
        variant='contained'
        onClick={onClick}
        fullWidth
        size='large'
        sx={{ height: '80px', fontSize: '1.5em' }}
      >
        {buttonUser.name}
      </Button>
    );
  };

  // TODO: Change this to book spines.
  return (
    <>
      <Typography variant='h2' component='h1' align='center' sx={{ mt: '4vw', mb: '20px', fontWeight: 'bold' }}>
        Welcome to Bookshelf!
      </Typography>
      {!!users ? (
        <Stack spacing={2}>{users.map((user) => renderUserButton(user))}</Stack>
      ) : (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default Auth;
