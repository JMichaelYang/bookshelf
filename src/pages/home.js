import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext, { User } from '../context/user_context';

function Home() {
  const { user } = useContext(UserContext);

  if (user === User.None) {
    return <Navigate to='/login' replace />;
  }

  return <div>Test Home</div>;
}

export default Home;
