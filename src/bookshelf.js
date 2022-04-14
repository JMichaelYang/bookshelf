import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/user_context';
import { BookProvider } from './context/book_context';
import { Grid } from '@mui/material';
import Home from './pages/home';
import Auth from './pages/auth';

const Bookshelf = () => {
  return (
    <Grid container justifyContent='center'>
      <Grid item xs={10} md={8}>
        <UserProvider>
          <BookProvider>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Auth />} />
              </Routes>
            </BrowserRouter>
          </BookProvider>
        </UserProvider>
      </Grid>
    </Grid>
  );
};

export default Bookshelf;
