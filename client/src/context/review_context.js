import React, { useMemo } from 'react';
import { addReview, deleteReview, fetchReviews } from '../api/review_api';
import asyncDispatch from './async_dispatch';

export const LoadReviewsAction = (book_id) => (dispatch) => {
  dispatch({ type: 'load_reviews' });
  const onFetched = (_error, results, _fields) => dispatch(LoadedReviewsAction(book_id, results));
  fetchReviews(book_id, onFetched);
};

const LoadedReviewsAction = (book_id, reviews) => ({ type: 'loaded_reviews', book_id, reviews });

export const AddReviewAction = (review) => (dispatch) => {
  dispatch({ type: 'add_review' });
  const onAdd = (_error, _results, _fields) => dispatch({ type: 'added_review' });
  addReview(review, onAdd);
};

export const DeleteReviewAction = (book_id, user_id) => (dispatch) => {
  dispatch({ type: 'delete_review' });
  const onDelete = (_error, _results, _fields) => dispatch({ type: 'deleted_review' });
  deleteReview(book_id, user_id, onDelete);
};

const reviewReducer = (state, action) => {
  switch (action.type) {
    case 'load_reviews':
      const { book_id: loadBookId } = action;
      const { reviews: oldLoadReviews } = state;
      const loadReviews = { ...oldLoadReviews, [loadBookId]: null };
      return { ...state, reviews: loadReviews };
    case 'loaded_reviews':
      const { book_id: loadedBookId, reviews: loadedNewReviews } = action;
      const { reviews: oldLoadedReviews } = state;
      const loadedReviews = { ...oldLoadedReviews, [loadedBookId]: loadedNewReviews };
      return { ...state, reviews: loadedReviews };
    default:
      return state;
  }
};

const initialState = { reviews: {} };
const ReviewContext = React.createContext({ state: initialState, dispatch: () => {} });

export const ReviewProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reviewReducer, initialState);
  const aDispatch = useMemo(() => asyncDispatch(dispatch), [dispatch]);

  return <ReviewContext.Provider value={{ state, dispatch: aDispatch }}>{children}</ReviewContext.Provider>;
};

export default ReviewContext;
