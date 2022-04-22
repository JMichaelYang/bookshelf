import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
  Paper,
  Stack,
  Typography,
  Divider,
  Chip,
  Skeleton,
} from '@mui/material';
import { Rating } from 'react-simple-star-rating';
import { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import ButtonBar from '../components/button_bar';
import BookContext, { EditBookAction, DeleteBookAction, LoadBooksAction } from '../context/book_context';
import GenreContext, { LoadGenresAction } from '../context/genre_context';
import EditBook from '../components/edit_book';

const Book = () => {
  const navigate = useNavigate();
  const { bid } = useParams();
  const { state: bookState, dispatch: bookDispatch } = useContext(BookContext);
  const { state: genreState, dispatch: genreDispatch } = useContext(GenreContext);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const { books } = bookState;
  const { genres: options } = genreState;

  useEffect(() => {
    genreDispatch(LoadGenresAction());
  }, [genreDispatch]);

  if (!books) return <Skeleton variant='text' width='100%' height={800} />;
  const book = books.find((b) => b.book_id === parseInt(bid));
  if (!book) return <Navigate to='/' replace />;

  const { book_id, title, authors, genres, image, description, rating } = book;
  const getGenreById = (id) => options.find((val) => val.genre_id === id);

  const handleBack = () => navigate('/');

  const openEditBook = () => setEditOpen(true);
  const closeEditBook = () => setEditOpen(false);
  const updateBook = (book) => {
    bookDispatch(EditBookAction(book));
    bookDispatch(LoadBooksAction('', 0, []));
  };

  const handleDeleteOpen = () => setDeleteConfirmOpen(true);
  const handleDeleteClose = () => setDeleteConfirmOpen(false);
  const handleDelete = () => {
    bookDispatch(DeleteBookAction(book_id));
    handleBack();
  };

  const backButton = { color: 'primary', action: handleBack, text: 'Back' };
  const editButton = { color: 'primary', action: openEditBook, text: 'Edit' };
  const deleteButton = { color: 'error', action: handleDeleteOpen, text: 'Delete' };

  const authorText = authors.join(', ');

  return (
    <>
      <Stack spacing={2} sx={{ my: '2vw' }}>
        <ButtonBar leftButtons={[backButton]} rightButtons={[editButton, deleteButton]} />
        <Paper sx={{ p: '32px' }}>
          <Grid container rowSpacing={4} columnSpacing={6}>
            <Grid item xs={12} md={6} lg={5} xl={4}>
              <img src={image} style={{ width: '100%', height: '100%', objectFit: 'contain' }} alt='book cover' />
            </Grid>
            <Grid item xs={12} md={6} lg={7} xl={8}>
              <Typography variant='h3' component='h3'>
                {title}
              </Typography>
              <Typography variant='h5' component='h5'>
                {authorText}
              </Typography>
              <Stack direction='row' sx={{ flexWrap: 'wrap' }}>
                {!options ? (
                  <Skeleton variant='text' width='50%' height='40px' />
                ) : (
                  genres.map((gid) => {
                    const genre = getGenreById(gid);
                    return <Chip key={`genre-${gid}`} label={genre.name} sx={{ my: 0.5, mr: 1 }} />;
                  })
                )}
              </Stack>
              <Rating ratingValue={rating * 20} size={20} style={{ marginTop: '4px' }} readonly />
              <Divider sx={{ my: 2 }} />
              <Typography variant='body1' component='div'>
                {description}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h5' component='h5' sx={{ fontWeight: 'bold' }}>
                Reviews
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Stack>
      <Dialog open={deleteConfirmOpen} onClose={handleDeleteClose} aria-labelledby='alert-dialog-delete'>
        <DialogContent>
          <DialogContentText id='alert-delete-content'>
            Are you sure you want to delete this book? This action cannot be undone.
          </DialogContentText>
          <DialogActions>
            <Button onClick={handleDeleteClose}>Cancel</Button>
            <Button onClick={handleDelete}>Confirm</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <EditBook open={editOpen} onSubmit={updateBook} onClose={closeEditBook} book={book} />
    </>
  );
};

export default Book;
