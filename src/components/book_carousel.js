import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import BookTile from './book_tile';

export const BookCarousel = (props) => {
  const { title, books } = props;

  return (
    <>
      {!!title && (
        <Typography variant='h6' component='h1' align='left' sx={{ mb: '20px', fontWeight: 'bold' }}>
          {title}
        </Typography>
      )}
      {books === null ? (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Stack direction='row' sx={{ width: '100%', overflow: 'auto' }}>
          {books.map((book) => (
            <BookTile key={`book-${book.id}`} book={book} />
          ))}
        </Stack>
      )}
    </>
  );
};
