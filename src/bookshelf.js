import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserContext, { UserProvider } from './context/user_context';
import { Grid } from '@mui/material';
import Home from './pages/home';
import Auth from './pages/auth';

function Bookshelf() {
  return (
    <Grid container justifyContent='center'>
      <Grid item xs={10} md={8} lg={6}>
        <UserProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Auth />} />
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </Grid>
    </Grid>
  );
}

export default Bookshelf;

