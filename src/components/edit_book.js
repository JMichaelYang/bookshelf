import { useEffect, useState } from 'react';
import { Box, Button, FormControl, IconButton, Modal, Stack, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import GenreSelect from './genre_select';

const EditBook = (props) => {
  const { open, onSubmit, onClose, book: initialBook, authors: initialAuthors, genres: initialGenres } = props;
  const [book, setBook] = useState(initialBook);
  const [authors, setAuthors] = useState(initialAuthors);
  const [genres, setGenres] = useState(initialGenres);
  const { title, image, description } = book;

  useEffect(() => setBook(initialBook), [initialBook]);
  useEffect(() => setAuthors(initialAuthors), [initialAuthors]);
  useEffect(() => setGenres(initialGenres), [initialGenres]);

  const setTitle = (newTitle) => setBook({ ...book, title: newTitle });
  const setImage = (newImage) => setBook({ ...book, image: newImage });
  const setDescription = (newDescription) => setBook({ ...book, description: newDescription });

  const handleSubmit = () => onSubmit({ book, authors, genres });

  return (
    <Modal open={open} onClose={onClose} aria-labelledby='edit-book-modal'>
      <Box>
        <Stack spacing={2}>
          <IconButton sx={{ ml: 'auto' }} aria-label='close' onClick={onClose}>
            <CloseIcon />
          </IconButton>
          <FormControl>
            <TextField id='title-field' autoFocus fullWidth value={title} onChange={setTitle} label='Title' />
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
          </FormControl>
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
