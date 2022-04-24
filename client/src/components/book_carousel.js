import { Stack, Typography } from '@mui/material';
import BookTile, { TilePlaceholder } from './book_tile';

const PLACEHOLDER_ARRAY = [...Array(10).keys()];

export const BookCarousel = (props) => {
  const { title, books } = props;
  books && books.sort((a, b) => b.rating - a.rating);

  return (
    <>
      {!!title && (
        <Typography variant='h6' component='h6' align='left' sx={{ mb: '20px', fontWeight: 'bold' }}>
          {title}
        </Typography>
      )}
      {books && books.length === 0 && (
        <Typography variant='body1' component='div' align='center' sx={{ mb: '20px', fontWeight: 'bold' }}>
          No books found. Please try again!
        </Typography>
      )}
      {books === null ? (
        <Stack direction='row' sx={{ width: '100%', overflow: 'auto' }}>
          {PLACEHOLDER_ARRAY.map((i) => (
            <TilePlaceholder key={`placeholder-${i}`} />
          ))}
        </Stack>
      ) : (
        <Stack direction='row' sx={{ width: '100%', overflow: 'auto' }}>
          {books.map((book) => (
            <BookTile key={`book-${book.book_id}`} book={book} />
          ))}
        </Stack>
      )}
    </>
  );
};
