const asyncDispatch = (dispatch) => (action) => {
  if (action instanceof Function) {
    return action(dispatch);
  }

  return dispatch(action);
};

export default asyncDispatch;
