import { useState } from 'react';
import { Chip, FormControl, Stack, TextField } from '@mui/material';

const AuthorSelect = (props) => {
  const { authors, setAuthors } = props;
  const [author, setAuthor] = useState('');

  const deleteAuthor = (i) => () => {
    const newAuthors = [...authors];
    newAuthors.splice(i, 1);
    setAuthors(newAuthors);
  };

  const changeAuthor = (e) => setAuthor(e.target.value);

  const addAuthor = (e) => {
    if ((e.keyCode === 13 || e.keyCode === 9) && !!author) {
      const newAuthors = [...authors];
      newAuthors.push(author);
      setAuthors(newAuthors);
      setAuthor('');
    }
  };

  const renderSelected = () => {
    if (!authors || authors.length === 0) return null;

    return (
      <Stack direction='row' spacing={1} sx={{ mr: 1 }}>
        {authors.map((val, i) => (
          <Chip key={`author-${i}`} label={val} onDelete={deleteAuthor(i)} />
        ))}
      </Stack>
    );
  };

  return (
    <FormControl sx={{ midWidth: '100px' }}>
      <TextField
        id='author-field'
        label='Author'
        value={author}
        onChange={changeAuthor}
        onKeyDown={addAuthor}
        InputProps={{ startAdornment: renderSelected() }}
      />
    </FormControl>
  );
};

export default AuthorSelect;
