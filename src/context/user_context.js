import React, { useMemo } from 'react';
import { fetchUsers } from '../api/user_api';
import asyncDispatch from './async_dispatch';

export const LoadUsersAction = () => (dispatch) => {
  dispatch({ type: 'load_users' });
  const onFetched = (_error, results, _fields) => dispatch(LoadedUsersAction(results));
  fetchUsers(onFetched);
};

const LoadedUsersAction = (users) => ({ type: 'loaded_users', users });

export const LogInAction = (user) => ({ user, type: 'log_in' });

export const LogOutAction = () => ({ type: 'log_out' });

const userReducer = (state, action) => {
  switch (action.type) {
    case 'load_users':
      return { ...state, users: null };
    case 'loaded_users':
      return { ...state, users: action.users };
    case 'log_in':
      return { ...state, currentUser: action.user };
    case 'log_out':
      return { ...state, currentUser: null };
    default:
      return state;
  }
};

const initialState = {
  users: [],
  currentUser: null,
};

const UserContext = React.createContext({
  state: initialState,
  dispatch: () => {},
});

export const UserProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(userReducer, initialState);
  const aDispatch = useMemo(() => asyncDispatch(dispatch), [dispatch]);

  return <UserContext.Provider value={{ state, dispatch: aDispatch }}>{children}</UserContext.Provider>;
};

export default UserContext;
