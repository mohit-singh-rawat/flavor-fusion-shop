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
        console.log('Login response:', response);
        
        if (response.status === 200) {
            const userData = response.data;
            yield put({
                type: authActionTypes.AUTH_LOGIN_SUCCESS,
                payload: userData,
            });
        } else {
            yield put({
                type: authActionTypes.AUTH_LOGIN_ERROR,
                payload: response.data,
            });
        }
    } catch (error) {
        console.error('Login error:', error);
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
        console.log('Register response:', response);
        
        if (response.status === 201) {
            const userData = response.data;
            yield put({
                type: authActionTypes.AUTH_REGISTER_SUCCESS,
                payload: userData,
            });
        } else {
            yield put({
                type: authActionTypes.AUTH_REGISTER_ERROR,
                payload: response.data,
            });
        }
    } catch (error) {
        console.error('Register error:', error);
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
