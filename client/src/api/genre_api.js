import { USE_LOCAL } from './constants';
import localGenres from '../test_data/genres.json';

/* ----- LOCAL FUNCTIONS ----- */

const fetchGenresLocal = async (onComplete) => {
  // Delay 1 second for testing purposes.
  await new Promise((_) => setTimeout(_, 1000));
  onComplete(null, localGenres, null);
};

/* ----- REMOTE FUNCTIONS ----- */

const fetchGenresRemote = async (onComplete) => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  const response = await fetch('/genres', requestOptions);
  const body = await response.json();

  if (response.status !== 200) onComplete(body.message, null, null);

  onComplete(null, body, null);
};

export const fetchGenres = USE_LOCAL ? fetchGenresLocal : fetchGenresRemote;
