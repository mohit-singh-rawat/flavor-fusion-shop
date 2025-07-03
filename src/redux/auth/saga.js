import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { authActionTypes } from './constant';
import { createApiLogin, createApiRegister } from './api';
// import ToastHandle from '../../helpers/ToastMessage';
/**
 * Login the user
 * @param {*} payload - username and password
 */

function* createLoginFunction(data) {
    try {
        yield put({
            type: authActionTypes.AUTH_LOGIN_LOADING,
            payload: {},
        });
        const response = yield call(createApiLogin, data);
        const decryptedData = response.data.data;
        if (response.status === 200) {
            yield put({
                type: authActionTypes.AUTH_LOGIN_SUCCESS,
                payload: { ...decryptedData },
            });
        } else {
            yield put({
                type: authActionTypes.AUTH_LOGIN_ERROR,
                payload: { ...decryptedData },
            });
        }
    } catch (error) {
        // ToastHandle(error, 'danger')
        yield put({
            type: authActionTypes.AUTH_LOGIN_ERROR,
            payload: error,
        });
    }
}

function* createRegisterFunction(data) {
    try {
        yield put({
            type: authActionTypes.AUTH_REGISTER_LOADING,
            payload: {},
        });
        const response = yield call(createApiRegister, data);
        const decryptedData = response.data.data;
        if (response.status === 201) {
            yield put({
                type: authActionTypes.AUTH_REGISTER_SUCCESS,
                payload: { ...decryptedData },
            });
        } else {
            yield put({
                type: authActionTypes.AUTH_REGISTER_ERROR,
                payload: { ...decryptedData },
            });
        }
    } catch (error) {
        yield put({
            type: authActionTypes.AUTH_REGISTER_ERROR,
            payload: error,
        });
    }
}

export function* watchLoginCreate() {
    yield takeEvery(authActionTypes.AUTH_LOGIN, createLoginFunction);
}

export function* watchRegisterCreate() {
    yield takeEvery(authActionTypes.AUTH_REGISTER, createRegisterFunction);
}

export default function* authSaga() {
    yield all([
        fork(watchLoginCreate),
        fork(watchRegisterCreate),
    ]);
}
