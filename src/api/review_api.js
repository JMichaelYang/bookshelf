import { USE_LOCAL } from './constants';
import localReviews from '../test_data/reviews.json';

/* ----- LOCAL FUNCTIONS ----- */

let instance_reviews = localReviews;

const fetchReviewsLocal = async (book_id, onComplete) => {
  await new Promise((_) => setTimeout(_, 1000));
  const filtered = instance_reviews.filter((review) => review.book_id === book_id);
  onComplete(null, filtered, null);
};

const addReviewLocal = async (review, onComplete) => {
  await new Promise((_) => setTimeout(_, 1000));
  instance_reviews = [...instance_reviews, review];
  onComplete(null, onComplete, null);
};

const editReviewLocal = async (review, onComplete) => {
  await new Promise((_) => setTimeout(_, 1000));
  instance_reviews = [...instance_reviews];
  const i = instance_reviews.findIndex((r) => r.book_id === review.book_id && r.user_id === review.user_id);
  instance_reviews[i] = review;
  onComplete(null, review, null);
};

const deleteReviewLocal = async (book_id, user_id, onComplete) => {
  await new Promise((_) => setTimeout(_, 1000));
  instance_reviews = instance_reviews.filter((r) => r.book_id !== book_id || r.user_id !== user_id);
  onComplete(null, instance_reviews, null);
};

/* ----- REMOTE FUNCTIONS ----- */

const fetchReviewsRemote = async (book_id, onComplete) => {};

const addReviewRemote = async (review, onComplete) => {};

const editReviewRemote = async (review, onComplete) => {};

const deleteReviewRemote = async (book_id, user_id, onComplete) => {};

export const fetchReviews = USE_LOCAL ? fetchReviewsLocal : fetchReviewsRemote;
export const addReview = USE_LOCAL ? addReviewLocal : addReviewRemote;
export const editReview = USE_LOCAL ? editReviewLocal : editReviewRemote;
export const deleteReview = USE_LOCAL ? deleteReviewLocal : deleteReviewRemote;
