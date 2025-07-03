import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { ProductActiontypes } from './constant';
import { createProduct, getProducts } from './api';
/**
 * Login the user
 * @param {*} payload - username and password
 */
function* createCartFunction(data) {
    try {
        yield put({
            type: ProductActiontypes.CREATE_PRODUCT_LOADING,
            payload: {},
        });
        const response = yield call(createProduct, data);
        const decryptedData = response.data.data;
        if (response.status === 201) {
            yield put({
                type: ProductActiontypes.CREATE_PRODUCT_SUCCESS,
                payload: { ...decryptedData },
            });
            yield put({
                type: ProductActiontypes.CREATE_PRODUCT_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: ProductActiontypes.CREATE_PRODUCT_ERROR,
                payload: { ...decryptedData },
            });
        }
    } catch (error) {
        yield put({
            type: ProductActiontypes.CREATE_PRODUCT_ERROR,
            payload: error,
        });
    }
}

function* getProductFunction(action){
    try {
        yield put({
            type: ProductActiontypes.GET_PRODUCT_LOADING,
            payload: {},
        });
        const response = yield call(getProducts);
        const responseData = response.data;
        if (response.status === 200) {
            // Handle both direct array response and nested data response
            const products = responseData.data || responseData;
            yield put({
                type: ProductActiontypes.GET_PRODUCT_SUCCESS,
                payload: Array.isArray(products) ? products : [],
            });
        } else {
            yield put({
                type: ProductActiontypes.GET_PRODUCT_ERROR,
                payload: responseData.message || 'Failed to fetch products',
            });
        }
    }
    catch (error) {
        console.error('Product fetch error:', error);
        yield put({
            type: ProductActiontypes.GET_PRODUCT_ERROR,
            payload: error.message || 'Network error',
        });
    }
}
function* updateProductFunction(data) {
    try {
        yield put({
            type: ProductActiontypes.UPDATE_PRODUCT_LOADING,
            payload: {},
        });
        const response = yield call(updateProduct, data);
        const decryptedData = response.data.data;
        if (response.status === 200) {
            yield put({
                type: ProductActiontypes.UPDATE_PRODUCT_SUCCESS,
                payload: { ...decryptedData },
            });
            yield put({
                type: ProductActiontypes.UPDATE_PRODUCT_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: ProductActiontypes.UPDATE_PRODUCT_ERROR,
                payload: { ...decryptedData },
            });
        }
    } catch (error) {
        yield put({
            type: ProductActiontypes.UPDATE_PRODUCT_ERROR,
            payload: error,
        });
    }
}

function* getProductByIdFunction(data) {
    try {
        yield put({
            type: ProductActiontypes.GET_PRODUCT_BY_ID_LOADING,
            payload: {},
        });
        const response = yield call(getProductById, data);
        const decryptedData = response.data.data;
        if (response.status === 200) {
            yield put({
                type: ProductActiontypes.GET_PRODUCT_BY_ID_SUCCESS,
                payload: { ...decryptedData },
            });
            yield put({
                type: ProductActiontypes.GET_PRODUCT_BY_ID_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: ProductActiontypes.GET_PRODUCT_BY_ID_ERROR,
                payload: { ...decryptedData },
            });
        }
    } catch (error) {
        yield put({
            type: ProductActiontypes.GET_PRODUCT_BY_ID_ERROR,
            payload: error,
        });
    }
}

export function* watchProductCreate() {
    yield takeEvery(ProductActiontypes.CREATE_PRODUCT, createCartFunction);
}

export function* watchProductUpdate() {
    yield takeEvery(ProductActiontypes.UPDATE_PRODUCT, updateProductFunction);
}

export function* watchProductGet() {
    yield takeEvery(ProductActiontypes.GET_PRODUCT, getProductFunction);
}
export function* watchProductGetById() {
    yield takeEvery(ProductActiontypes.GET_PRODUCT_BY_ID, getProductByIdFunction);
}

export default function* ProductSaga() {
    yield all([
        fork(watchProductCreate),
        fork(watchProductUpdate),
        fork(watchProductGet),
        fork(watchProductGetById),
    ]);
}


