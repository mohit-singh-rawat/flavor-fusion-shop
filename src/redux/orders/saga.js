import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { orderActionTypes } from './constant';
import { placeOrder, getOrderHistory, getOrderDetails } from './api';

function* placeOrderFunction(action) {
  try {
    yield put({
      type: orderActionTypes.PLACE_ORDER_LOADING,
      payload: {},
    });
    const response = yield call(placeOrder, action);
    if (response.status === 201) {
      yield put({
        type: orderActionTypes.PLACE_ORDER_SUCCESS,
        payload: response.data,
      });
    } else {
      yield put({
        type: orderActionTypes.PLACE_ORDER_ERROR,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: orderActionTypes.PLACE_ORDER_ERROR,
      payload: error,
    });
  }
}

function* getOrderHistoryFunction() {
  try {
    yield put({
      type: orderActionTypes.GET_ORDER_HISTORY_LOADING,
      payload: {},
    });
    const response = yield call(getOrderHistory);
    if (response.status === 200) {
      yield put({
        type: orderActionTypes.GET_ORDER_HISTORY_SUCCESS,
        payload: response.data,
      });
    } else {
      yield put({
        type: orderActionTypes.GET_ORDER_HISTORY_ERROR,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: orderActionTypes.GET_ORDER_HISTORY_ERROR,
      payload: error,
    });
  }
}

function* getOrderDetailsFunction(action) {
  try {
    yield put({
      type: orderActionTypes.GET_ORDER_DETAILS_LOADING,
      payload: {},
    });
    const response = yield call(getOrderDetails, action);
    if (response.status === 200) {
      yield put({
        type: orderActionTypes.GET_ORDER_DETAILS_SUCCESS,
        payload: response.data,
      });
    } else {
      yield put({
        type: orderActionTypes.GET_ORDER_DETAILS_ERROR,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: orderActionTypes.GET_ORDER_DETAILS_ERROR,
      payload: error,
    });
  }
}

export function* watchPlaceOrder() {
  yield takeEvery(orderActionTypes.PLACE_ORDER, placeOrderFunction);
}

export function* watchGetOrderHistory() {
  yield takeEvery(orderActionTypes.GET_ORDER_HISTORY, getOrderHistoryFunction);
}

export function* watchGetOrderDetails() {
  yield takeEvery(orderActionTypes.GET_ORDER_DETAILS, getOrderDetailsFunction);
}

export default function* orderSaga() {
  yield all([
    fork(watchPlaceOrder),
    fork(watchGetOrderHistory),
    fork(watchGetOrderDetails),
  ]);
}