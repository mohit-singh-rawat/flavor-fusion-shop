import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { reviewActionTypes } from './constant';
import { getReviews, addReview } from './api';

function* getReviewsFunction(action) {
  try {
    yield put({
      type: reviewActionTypes.GET_REVIEWS_LOADING,
      payload: {},
    });
    const response = yield call(getReviews, action);
    if (response.status === 200) {
      yield put({
        type: reviewActionTypes.GET_REVIEWS_SUCCESS,
        payload: response.data,
      });
    } else {
      yield put({
        type: reviewActionTypes.GET_REVIEWS_ERROR,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: reviewActionTypes.GET_REVIEWS_ERROR,
      payload: error,
    });
  }
}

function* addReviewFunction(action) {
  try {
    yield put({
      type: reviewActionTypes.ADD_REVIEW_LOADING,
      payload: {},
    });
    const response = yield call(addReview, action);
    if (response.status === 201) {
      yield put({
        type: reviewActionTypes.ADD_REVIEW_SUCCESS,
        payload: response.data,
      });
    } else {
      yield put({
        type: reviewActionTypes.ADD_REVIEW_ERROR,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: reviewActionTypes.ADD_REVIEW_ERROR,
      payload: error,
    });
  }
}

export function* watchGetReviews() {
  yield takeEvery(reviewActionTypes.GET_REVIEWS, getReviewsFunction);
}

export function* watchAddReview() {
  yield takeEvery(reviewActionTypes.ADD_REVIEW, addReviewFunction);
}

export default function* reviewSaga() {
  yield all([
    fork(watchGetReviews),
    fork(watchAddReview),
  ]);
}