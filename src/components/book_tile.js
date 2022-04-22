import { Box, Card, CardActions, CardContent, CardMedia, IconButton, Skeleton, Typography } from '@mui/material';
import { Rating } from 'react-simple-star-rating';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export const TilePlaceholder = (props) => {
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

const BookTile = (props) => {
  const { book, width = 240 } = props;
  const { title, authors, image, rating } = book;
  const authorText = authors.join(', ');

  return (
    <Card sx={{ width: `${width}px`, m: '8px', flexShrink: 0 }}>
      <CardContent>
        <Typography
          variant='h6'
          component='h6'
          align='center'
          sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          {title}
        </Typography>
        <Typography
          variant='body1'
          component='div'
          align='center'
          sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          {authorText}
        </Typography>
      </CardContent>
      <CardMedia
        component='img'
        height='300'
        image={image}
        alt='book image'
        sx={{ width: '94%', px: '8px', m: 'auto', objectFit: 'contain' }}
      />
      <CardActions>
        <Box sx={{ px: '8px' }}>
          <Rating ratingValue={rating * 20} size={width / 10} style={{ marginTop: '4px' }} readonly />
        </Box>
        <IconButton sx={{ ml: 'auto' }} aria-label='go'>
          <ArrowForwardIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default BookTile;
