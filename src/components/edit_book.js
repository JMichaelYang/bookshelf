import { useEffect, useState } from 'react';
import { IconButton, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const EditBook = (props) => {
  const { open, onClose, book: initialBook, authors: initialAuthors, genres: initialGenres } = props;
  const [book, setBook] = useState(initialBook);
  const [authors, setAuthors] = useState(initialAuthors);
  const [genres, setGenres] = useState(initialGenres);
  const { book_id, title, image, description } = book;

  useEffect(() => setBook(initialBook), [initialBook]);
  useEffect(() => setAuthors(initialAuthors), [initialAuthors]);
  useEffect(() => setGenres(initialGenres), [initialGenres]);

  return (
    <Modal open={open} onClose={onClose} aria-labelledby='edit-book-modal'>
      <Box>
        <Stack spacing={2}>
          <IconButton sx={{ ml: 'auto' }} aria-label='close'>
            <CloseIcon />
          </IconButton>
        </Stack>
      </Box>
    </Modal>
  );
};

export default EditBook;
