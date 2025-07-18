import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { recommendationActionTypes } from './constant';
import { getRelatedProducts, getTrendingProducts, getPersonalizedRecommendations } from './api';

function* getRelatedProductsFunction(action) {
  try {
    yield put({
      type: recommendationActionTypes.GET_RELATED_PRODUCTS_LOADING,
      payload: {},
    });
    const response = yield call(getRelatedProducts, action);
    if (response.status === 200) {
      yield put({
        type: recommendationActionTypes.GET_RELATED_PRODUCTS_SUCCESS,
        payload: response.data,
      });
    } else {
      yield put({
        type: recommendationActionTypes.GET_RELATED_PRODUCTS_ERROR,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: recommendationActionTypes.GET_RELATED_PRODUCTS_ERROR,
      payload: error,
    });
  }
}

function* getTrendingProductsFunction() {
  try {
    yield put({
      type: recommendationActionTypes.GET_TRENDING_PRODUCTS_LOADING,
      payload: {},
    });
    const response = yield call(getTrendingProducts);
    if (response.status === 200) {
      yield put({
        type: recommendationActionTypes.GET_TRENDING_PRODUCTS_SUCCESS,
        payload: response.data,
      });
    } else {
      yield put({
        type: recommendationActionTypes.GET_TRENDING_PRODUCTS_ERROR,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: recommendationActionTypes.GET_TRENDING_PRODUCTS_ERROR,
      payload: error,
    });
  }
}

function* getPersonalizedRecommendationsFunction() {
  try {
    yield put({
      type: recommendationActionTypes.GET_PERSONALIZED_RECOMMENDATIONS_LOADING,
      payload: {},
    });
    const response = yield call(getPersonalizedRecommendations);
    if (response.status === 200) {
      yield put({
        type: recommendationActionTypes.GET_PERSONALIZED_RECOMMENDATIONS_SUCCESS,
        payload: response.data,
      });
    } else {
      yield put({
        type: recommendationActionTypes.GET_PERSONALIZED_RECOMMENDATIONS_ERROR,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: recommendationActionTypes.GET_PERSONALIZED_RECOMMENDATIONS_ERROR,
      payload: error,
    });
  }
}

export function* watchGetRelatedProducts() {
  yield takeEvery(recommendationActionTypes.GET_RELATED_PRODUCTS, getRelatedProductsFunction);
}

export function* watchGetTrendingProducts() {
  yield takeEvery(recommendationActionTypes.GET_TRENDING_PRODUCTS, getTrendingProductsFunction);
}

export function* watchGetPersonalizedRecommendations() {
  yield takeEvery(recommendationActionTypes.GET_PERSONALIZED_RECOMMENDATIONS, getPersonalizedRecommendationsFunction);
}

export default function* recommendationSaga() {
  yield all([
    fork(watchGetRelatedProducts),
    fork(watchGetTrendingProducts),
    fork(watchGetPersonalizedRecommendations),
  ]);
}