import { USE_LOCAL } from './constants';
import localUsers from '../test_data/users.json';

/* ----- LOCAL FUNCTIONS ----- */

const fetchUsersLocal = async () => {
  // Delay 1 second for testing purposes.
  await new Promise((_) => setTimeout(_, 1000));
  return localUsers;
};

/* ----- REMOTE FUNCTIONS ----- */

const fetchUsersRemote = async () => [];

export const fetchUsers = USE_LOCAL ? fetchUsersLocal : fetchUsersRemote;
