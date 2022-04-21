import { useContext, useEffect } from 'react';
import { Box, Chip, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import GenreContext, { LoadGenresAction } from '../context/genre_context';

const GenreSelect = (props) => {
  const { genres, setGenres } = props;
  const { state: genreState, dispatch: genreDispatch } = useContext(GenreContext);
  let { genres: options } = genreState;

  useEffect(() => {
    genreDispatch(LoadGenresAction());
  }, [genreDispatch]);

  if (options === null) options = [];

  const getGenreById = (id) => options.find((val) => val.genre_id === id);

  const renderSelected = (selected) => (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
      {selected.map((val) => (
        <Chip key={`genre-${val}`} label={getGenreById(val).name} />
      ))}
    </Box>
  );

  const renderItems = () => {
    return options.map((val) => (
      <MenuItem key={val.genre_id} value={val.genre_id}>
        {val.name}
      </MenuItem>
    ));
  };

  return (
    <FormControl sx={{ minWidth: '100px' }}>
      <InputLabel id='genre-select-label'>Genre</InputLabel>
      <Select
        SelectDisplayProps={{ style: { paddingTop: 12, paddingBottom: 12, height: 32 } }}
        labelId='genre-select-label'
        id='genre-select'
        value={genres}
        label='Genres'
        onChange={setGenres}
        renderValue={renderSelected}
        multiple
        sx={{ p: 0 }}
      >
        {renderItems()}
      </Select>
    </FormControl>
  );
};

export default GenreSelect;
