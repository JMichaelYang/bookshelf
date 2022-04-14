import { Box, Card, CardActions, CardMedia, IconButton } from '@mui/material';
import { Rating } from 'react-simple-star-rating';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const BookTile = (props) => {
  const { book, width = 240 } = props;
  const { image, rating } = book;

  return (
    <Card sx={{ width: `${width}px`, m: '8px', flexShrink: 0 }}>
      <CardMedia
        component='img'
        height='300'
        image={image}
        alt='book image'
        sx={{ width: '94%', p: '8px', m: 'auto', objectFit: 'contain' }}
      />
      <CardActions>
        <Box sx={{ px: '8px' }}>
          <Rating ratingValue={rating * 20} size={width / 8} style={{ marginTop: '4px' }} readonly />
        </Box>
        <IconButton sx={{ ml: 'auto' }} aria-label='go'>
          <ArrowForwardIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default BookTile;
