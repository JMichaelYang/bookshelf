import { Box, Card, CardActions, CardContent, Skeleton, Stack, Typography } from '@mui/material';
import BookTile from './book_tile';

const TilePlaceholder = (props) => {
  const { width = 240 } = props;

  return (
    <Card sx={{ width: `${width}px`, m: '8px', flexShrink: 0 }}>
      <CardContent>
        <Skeleton variant='text' width={208} height={56} />
      </CardContent>
      <Box sx={{ width: '94%', px: '8px', m: 'auto' }}>
        <Skeleton variant='rectangular' width={208} height={300} />
      </Box>
      <CardActions>
        <Skeleton variant='text' width={224} height={40} />
      </CardActions>
    </Card>
  );
};

export const BookCarousel = (props) => {
  const { title, books } = props;

  return (
    <>
      {!!title && (
        <Typography variant='h6' component='h6' align='left' sx={{ mb: '20px', fontWeight: 'bold' }}>
          {title}
        </Typography>
      )}
      {books === null ? (
        <Stack direction='row' sx={{ width: '100%', overflow: 'auto' }}>
          <TilePlaceholder />
          <TilePlaceholder />
          <TilePlaceholder />
          <TilePlaceholder />
          <TilePlaceholder />
          <TilePlaceholder />
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
