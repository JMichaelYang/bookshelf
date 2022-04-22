import { USE_LOCAL } from './constants';
import localGenres from '../test_data/genres.json';

/* ----- LOCAL FUNCTIONS ----- */

const fetchGenresLocal = async () => {
  // Delay 1 second for testing purposes.
  await new Promise((_) => setTimeout(_, 1000));
  return localGenres;
};

/* ----- REMOTE FUNCTIONS ----- */

const fetchGenresRemote = async () => [];

export const fetchGenres = USE_LOCAL ? fetchGenresLocal : fetchGenresRemote;
