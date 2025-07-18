import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { profileActionTypes } from './constant';
import { getProfile, updateProfile, addAddress, updateAddress, deleteAddress } from './api';

function* getProfileFunction() {
  try {
    yield put({
      type: profileActionTypes.GET_PROFILE_LOADING,
      payload: {},
    });
    const response = yield call(getProfile);
    if (response.status === 200) {
      yield put({
        type: profileActionTypes.GET_PROFILE_SUCCESS,
        payload: response.data,
      });
    } else {
      yield put({
        type: profileActionTypes.GET_PROFILE_ERROR,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: profileActionTypes.GET_PROFILE_ERROR,
      payload: error,
    });
  }
}

function* updateProfileFunction(action) {
  try {
    yield put({
      type: profileActionTypes.UPDATE_PROFILE_LOADING,
      payload: {},
    });
    const response = yield call(updateProfile, action);
    if (response.status === 200) {
      yield put({
        type: profileActionTypes.UPDATE_PROFILE_SUCCESS,
        payload: response.data,
      });
    } else {
      yield put({
        type: profileActionTypes.UPDATE_PROFILE_ERROR,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: profileActionTypes.UPDATE_PROFILE_ERROR,
      payload: error,
    });
  }
}

function* addAddressFunction(action) {
  try {
    yield put({
      type: profileActionTypes.ADD_ADDRESS_LOADING,
      payload: {},
    });
    const response = yield call(addAddress, action);
    if (response.status === 200) {
      yield put({
        type: profileActionTypes.ADD_ADDRESS_SUCCESS,
        payload: response.data,
      });
    } else {
      yield put({
        type: profileActionTypes.ADD_ADDRESS_ERROR,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: profileActionTypes.ADD_ADDRESS_ERROR,
      payload: error,
    });
  }
}

function* updateAddressFunction(action) {
  try {
    yield put({
      type: profileActionTypes.UPDATE_ADDRESS_LOADING,
      payload: {},
    });
    const response = yield call(updateAddress, action);
    if (response.status === 200) {
      yield put({
        type: profileActionTypes.UPDATE_ADDRESS_SUCCESS,
        payload: response.data,
      });
    } else {
      yield put({
        type: profileActionTypes.UPDATE_ADDRESS_ERROR,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: profileActionTypes.UPDATE_ADDRESS_ERROR,
      payload: error,
    });
  }
}

function* deleteAddressFunction(action) {
  try {
    yield put({
      type: profileActionTypes.DELETE_ADDRESS_LOADING,
      payload: {},
    });
    const response = yield call(deleteAddress, action);
    if (response.status === 200) {
      yield put({
        type: profileActionTypes.DELETE_ADDRESS_SUCCESS,
        payload: response.data,
      });
    } else {
      yield put({
        type: profileActionTypes.DELETE_ADDRESS_ERROR,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: profileActionTypes.DELETE_ADDRESS_ERROR,
      payload: error,
    });
  }
}

export function* watchGetProfile() {
  yield takeEvery(profileActionTypes.GET_PROFILE, getProfileFunction);
}

export function* watchUpdateProfile() {
  yield takeEvery(profileActionTypes.UPDATE_PROFILE, updateProfileFunction);
}

export function* watchAddAddress() {
  yield takeEvery(profileActionTypes.ADD_ADDRESS, addAddressFunction);
}

export function* watchUpdateAddress() {
  yield takeEvery(profileActionTypes.UPDATE_ADDRESS, updateAddressFunction);
}

export function* watchDeleteAddress() {
  yield takeEvery(profileActionTypes.DELETE_ADDRESS, deleteAddressFunction);
}

export default function* profileSaga() {
  yield all([
    fork(watchGetProfile),
    fork(watchUpdateProfile),
    fork(watchAddAddress),
    fork(watchUpdateAddress),
    fork(watchDeleteAddress),
  ]);
}