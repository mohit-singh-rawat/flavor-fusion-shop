import { reviewActionTypes } from "./constant";

export const getReviewsAction = (data) => ({
  type: reviewActionTypes.GET_REVIEWS,
  data,
});

export const addReviewAction = (data) => ({
  type: reviewActionTypes.ADD_REVIEW,
  data,
});