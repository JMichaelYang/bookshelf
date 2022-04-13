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

const initialState = { user: User.None };

export const LogInAction = (user) => ({ user, type: 'log_in' });
export const LogOutAction = () => ({ type: 'log_out' });

const userReducer = (state, action) => {
  switch (action.type) {
    case 'log_in':
      return { ...state, user: action.user };
    case 'log_out':
      return { ...state, user: User.None };
    default:
      return { ...state, user: User.None };
  }
};

const UserContext = React.createContext({
  user: User.None,
  updateUser: () => {},
});

export const UserProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(userReducer, initialState);

  return <UserContext.Provider value={[state, dispatch]}>{children}</UserContext.Provider>;
};

export default UserContext;
