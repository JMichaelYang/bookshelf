import { useEffect, useState } from 'react';
import { Box, Button, IconButton, Modal, Stack, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import GenreSelect from './genre_select';
import AuthorSelect from './author_select';

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

const EditBook = (props) => {
  const { open, onSubmit, onClose, book: initialBook } = props;
  const [book, setBook] = useState(initialBook);
  const { title, authors, genres, image, description } = book;

  useEffect(() => setBook(initialBook), [initialBook]);

  const setTitle = (e) => setBook({ ...book, title: e.target.value });
  const setAuthors = (authors) => setBook({ ...book, authors });
  const setGenres = (genres) => setBook({ ...book, genres });
  const setImage = (e) => setBook({ ...book, image: e.target.value });
  const setDescription = (e) => setBook({ ...book, description: e.target.value });

  const handleSubmit = () => {
    onSubmit(book);
    handleClose();
  };

  const handleClose = () => {
    setBook(initialBook);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby='edit-book-modal'>
      <Box sx={BOX_STYLE}>
        <Stack spacing={2}>
          <IconButton sx={{ ml: 'auto' }} aria-label='close' onClick={onClose}>
            <CloseIcon />
          </IconButton>
          <TextField id='title-field' autoFocus fullWidth value={title} onChange={setTitle} label='Title' />
          <AuthorSelect authors={authors} setAuthors={setAuthors} />
          <TextField id='image-field' fullWidth value={image} onChange={setImage} label='Image URL' />
          <GenreSelect genres={genres} setGenres={setGenres} />
          <TextField
            id='description-field'
            fullWidth
            value={description}
            onChange={setDescription}
            label='Description'
            multiline
            maxRows={5}
          />
          <Stack direction='row' justifyContent={'space-between'} spacing={2}>
            <Button variant='outlined' onClick={handleSubmit}>
              Confirm
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

export default EditBook;
