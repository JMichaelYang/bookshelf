import React from 'react';

// A list of possible users.
export const User = Object.freeze({
  None: 'None',
  Jaewon: 'Jaewon',
  Duo: 'Duo',
  Leona: 'Leona',
  John: 'John',
  Yvonne: 'Yvonne',
  Joon: 'Joon',
});

export default React.createContext({
  user: User.None,
  updateUser: () => {},
});
