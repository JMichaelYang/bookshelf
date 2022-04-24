import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/user_context';
import { BookProvider } from './context/book_context';
import { GenreProvider } from './context/genre_context';
import { ReviewProvider } from './context/review_context';
import { Grid } from '@mui/material';
import Home from './pages/home';
import Auth from './pages/auth';
import Book from './pages/book';

const Bookshelf = () => {
  return (
    <Grid container justifyContent='center'>
      <Grid item xs={10} md={8}>
        <UserProvider>
          <BookProvider>
            <ReviewProvider>
              <GenreProvider>
                <BrowserRouter>
                  <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Auth />} />
                    <Route path='/book/:bid' element={<Book />} />
                  </Routes>
                </BrowserRouter>
              </GenreProvider>
            </ReviewProvider>
          </BookProvider>
        </UserProvider>
      </Grid>
    </Grid>
  );
};

export default Bookshelf;
