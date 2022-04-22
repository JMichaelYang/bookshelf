import { Box, Button, IconButton, Modal, Stack, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { Rating } from 'react-simple-star-rating';

const BOX_STYLE = Object.freeze({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60vw',
  minWidth: 400,
  bgcolor: 'background.paper',
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
});

const EditReview = (props) => {
  const { open, onSubmit, onClose, review: initialReview } = props;
  const [review, setReview] = useState(initialReview);
  const { rating, review_text } = review;

  useEffect(() => setReview(initialReview), [initialReview]);

  const setRating = (rate) => setReview({ ...review, rating: rate / 20 });
  const setReviewText = (e) => setReview({ ...review, review_text: e.target.value });

  const handleSubmit = () => {
    onSubmit(review);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby='edit-review-modal'>
      <Box sx={BOX_STYLE}>
        <Stack spacing={2}>
          <IconButton sx={{ ml: 'auto' }} aria-label='close' onClick={onClose}>
            <CloseIcon />
          </IconButton>
          <Rating onClick={setRating} ratingValue={rating * 20} size={40} style={{ marginTop: '4px' }} allowHalfIcon />
          <TextField
            id='text-field'
            fullWidth
            value={review_text}
            onChange={setReviewText}
            label='Review'
            multiline
            maxRows={8}
          />
          <Stack direction='row' justifyContent={'space-between'} spacing={2}>
            <Button variant='outlined' onClick={handleSubmit}>
              Submit
            </Button>
            <Button variant='outlined' onClick={onClose}>
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default EditReview;
