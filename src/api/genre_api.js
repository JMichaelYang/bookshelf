import localGenres from '../test_data/genres.json';

// Local development flag.
const USE_LOCAL = true;

const fetchGenresLocal = async () => {
  // Delay 1 second for testing purposes.
  await new Promise((_) => setTimeout(_, 1000));
  return localGenres;
};

const fetchGenresRemote = async () => [];

export const fetchGenres = () => (USE_LOCAL ? fetchGenresLocal() : fetchGenresRemote());
