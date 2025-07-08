import { all } from 'redux-saga/effects';
import authSaga, { watchLoginCreate } from './auth/saga';
import ProductSaga from './products/saga';

export default function* rootSaga() {
    yield all([
       authSaga(),
        ProductSaga(),
    ]);
}