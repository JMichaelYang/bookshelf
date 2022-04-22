import { USE_LOCAL } from './constants';
import localReviews from '../test_data/reviews.json';

/* ----- LOCAL FUNCTIONS ----- */

let instance_reviews = localReviews;

const fetchReviewsLocal = async (book_id, onComplete) => {
  await new Promise((_) => setTimeout(_, 1000));
  const filtered = instance_reviews.filter((review) => review.book_id === book_id);
  onComplete(null, filtered, null);
};

/* ----- REMOTE FUNCTIONS ----- */

const fetchReviewsRemote = async (book_id, onComplete) => {};

export const fetchReviews = USE_LOCAL ? fetchReviewsLocal : fetchReviewsRemote;
