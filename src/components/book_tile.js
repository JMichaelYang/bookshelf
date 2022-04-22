import { Box, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import { Rating } from 'react-simple-star-rating';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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
