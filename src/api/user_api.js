import localUsers from '../test_data/users.json';

// Local development flag.
const USE_LOCAL = true;

const fetchUsersLocal = async () => {
  // Delay 1 second for testing purposes.
  await new Promise((_) => setTimeout(_, 1000));
  return localUsers;
};

const fetchUsersRemote = async () => [];

export const fetchUsers = async () => {
  return USE_LOCAL ? await fetchUsersLocal() : await fetchUsersRemote();
};
