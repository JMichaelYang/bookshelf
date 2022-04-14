import { Card, CardActions, CardMedia, IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const BookTile = (props) => {
  const { book, width = 240 } = props;
  const { image } = book;

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
        <IconButton sx={{ ml: 'auto' }} aria-label='go'>
          <ArrowForwardIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default BookTile;
