import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext, { LogInAction, User } from '../context/user_context';
import { Button, Stack, Typography } from '@mui/material';

function Auth() {
  const [state, dispatch] = useContext(UserContext);
  const { user } = state;

  if (user !== User.None) {
    return <Navigate to='/' replace />;
  }

  const renderUserButton = (buttonUser) => {
    const onClick = () => dispatch(LogInAction(buttonUser));

    return (
      <Button
        key={`user-${buttonUser}`}
        variant='contained'
        onClick={onClick}
        fullWidth
        size='large'
        sx={{ height: '80px', fontSize: '1.5em' }}
      >
        {buttonUser}
      </Button>
    );
  };

  // TODO: Change this to book spines.
  return (
    <>
      <Typography variant='h2' component='h1' align='center' sx={{ mt: '4vw', mb: '20px', fontWeight: 'bold' }}>
        Welcome to Bookshelf!
      </Typography>
      <Stack spacing={2}>
        {Object.values(User)
          .splice(1)
          .map((val) => renderUserButton(val))}
      </Stack>
    </>
  );
}

export default Auth;
