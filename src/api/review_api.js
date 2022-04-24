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
  instance_reviews = [...instance_reviews];
  const i = instance_reviews.findIndex((r) => r.book_id === review.book_id && r.user_id === review.user_id);

  if (i > -1) instance_reviews[i] = review;
  else instance_reviews.push(review);

  onComplete(null, review, null);
};

const deleteReviewLocal = async (book_id, user_id, onComplete) => {
  await new Promise((_) => setTimeout(_, 1000));
  instance_reviews = instance_reviews.filter((r) => r.book_id !== book_id || r.user_id !== user_id);
  onComplete(null, instance_reviews, null);
};

/* ----- REMOTE FUNCTIONS ----- */

const fetchReviewsRemote = async (book_id, onComplete) => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  const response = await fetch(`/reviews/${book_id}`, requestOptions);
  const body = await response.json();

  if (response.status !== 200) onComplete(body.message, null, null);

  onComplete(null, body, null);
};

const addReviewRemote = async (review, onComplete) => {
  const { book_id } = review;

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review),
  };

  const response = await fetch(`/reviews/${book_id}`, requestOptions);
  const body = await response.json();

  if (response.status !== 200) onComplete(body.message, null, null);

  onComplete(null, null, null);
};

const deleteReviewRemote = async (book_id, user_id, onComplete) => {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id }),
  };

  const response = await fetch(`/reviews/${book_id}`, requestOptions);
  const body = await response.json();

  if (response.status !== 200) onComplete(body.message, null, null);

  onComplete(null, null, null);
};

export const fetchReviews = USE_LOCAL ? fetchReviewsLocal : fetchReviewsRemote;
export const addReview = USE_LOCAL ? addReviewLocal : addReviewRemote;
export const deleteReview = USE_LOCAL ? deleteReviewLocal : deleteReviewRemote;
