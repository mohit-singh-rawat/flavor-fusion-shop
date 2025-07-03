import { all } from 'redux-saga/effects';
import { watchLoginCreate } from './auth/saga';
import ProductSaga from './products/saga';

export default function* rootSaga() {
    yield all([
        watchLoginCreate(),
        ProductSaga() // Add this line to include the ProductSaga saga in the root saga if you have one or more sagas for products. If not, remove this line.
    ]);
}