import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext, { User } from '../context/user_context';
import { Button, Typography } from '@mui/material';
import { styled } from '@mui/system';

function Auth() {
  const { user, updateUser } = useContext(UserContext);

  if (user !== User.None) {
    return <Navigate to='/' replace />;
  }

  const renderUserButton = (user) => {
    const onClick = () => updateUser(user);

    return (
      <Button
        key={`user-${user}`}
        variant='contained'
        onClick={onClick}
        fullWidth
        size='large'
        sx={{ mt: '20px', height: '100px', fontSize: '1.5em' }}
      >
        {user}
      </Button>
    );
  };

  // TODO: Change this to book spines.
  return (
    <AuthColumn>
      <Typography variant='h2' component='h1' align='center' sx={{ mb: '10px', fontWeight: 'bold' }}>
        Welcome to Bookshelf!
      </Typography>
      {Object.values(User)
        .splice(1)
        .map((val) => renderUserButton(val))}
    </AuthColumn>
  );
}

export default Auth;

const AuthColumn = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '40%',
  minWidth: '400px',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 'auto',
  marginTop: '5vw',
});
