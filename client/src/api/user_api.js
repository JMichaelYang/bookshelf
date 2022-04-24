import { USE_LOCAL } from './constants';
import localUsers from '../test_data/users.json';

/* ----- LOCAL FUNCTIONS ----- */

const fetchUsersLocal = async (onComplete) => {
  // Delay 1 second for testing purposes.
  await new Promise((_) => setTimeout(_, 1000));
  onComplete(null, localUsers, null);
};

/* ----- REMOTE FUNCTIONS ----- */

const fetchUsersRemote = async (onComplete) => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  const response = await fetch('/users', requestOptions);
  const body = await response.json();

  if (response.status !== 200) onComplete(body.message, null, null);

  onComplete(null, body, null);
};

export const fetchUsers = USE_LOCAL ? fetchUsersLocal : fetchUsersRemote;
