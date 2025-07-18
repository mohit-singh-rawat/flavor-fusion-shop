import { all } from 'redux-saga/effects';
import authSaga, { watchLoginCreate } from './auth/saga';
import ProductSaga from './products/saga';
import profileSaga from './profile/saga';
import reviewSaga from './reviews/saga';
import orderSaga from './orders/saga';
import recommendationSaga from './recommendations/saga';
import chatSaga from './chat/saga';
import adminSaga from './admin/saga';

export default function* rootSaga() {
    yield all([
       authSaga(),
        ProductSaga(),
        profileSaga(),
        reviewSaga(),
        orderSaga(),
        recommendationSaga(),
        chatSaga(),
        adminSaga(),
    ]);
}