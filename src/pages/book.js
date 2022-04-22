import { Paper, Stack, Typography } from '@mui/material';
import { useContext } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import ButtonBar from '../components/button_bar';
import BookContext from '../context/book_context';

const Book = () => {
  const navigate = useNavigate();
  const { bid } = useParams();
  const { state: bookState, dispatch: bookDispatch } = useContext(BookContext);
  const { books } = bookState;
  const book = books && books.find((b) => b.book_id === parseInt(bid));
  if (!book) return <Navigate to='/' replace />;

  const handleBack = () => navigate('/');

  const backButton = { color: 'primary', action: handleBack, text: 'Back' };
  const deleteButton = { color: 'error', action: () => {}, text: 'Delete' };

  return (
    <>
      <Stack spacing={2} sx={{ my: '2vw' }}>
        <ButtonBar leftButtons={[backButton]} rightButtons={[deleteButton]} />
        <Paper sx={{ p: '32px' }}>
          <Stack spacing={2}>
            <Typography variant='h4' component='h4' align='center' sx={{ mb: '20px', fontWeight: 'bold' }}>
              {`Hi! What would you like to read today?`}
            </Typography>
            <Stack spacing={2} direction='row'></Stack>
          </Stack>
        </Paper>
      </Stack>
    </>
  );
};

export default Book;
