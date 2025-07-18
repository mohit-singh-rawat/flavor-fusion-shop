import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { adminActionTypes } from './constant';
import { 
  getDashboardStats, 
  getAllUsers, 
  updateUserRole,
  getAdminProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getAdminOrders,
  updateOrderStatus
} from './api';

// Dashboard sagas
function* getDashboardStatsFunction() {
  try {
    yield put({
      type: adminActionTypes.GET_DASHBOARD_STATS_LOADING,
    });
    const response = yield call(getDashboardStats);
    if (response.status === 200) {
      yield put({
        type: adminActionTypes.GET_DASHBOARD_STATS_SUCCESS,
        payload: response.data,
      });
    } else {
      yield put({
        type: adminActionTypes.GET_DASHBOARD_STATS_ERROR,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: adminActionTypes.GET_DASHBOARD_STATS_ERROR,
      payload: error.message,
    });
  }
}

// Users sagas
function* getAllUsersFunction() {
  try {
    yield put({
      type: adminActionTypes.GET_ALL_USERS_LOADING,
    });
    const response = yield call(getAllUsers);
    if (response.status === 200) {
      yield put({
        type: adminActionTypes.GET_ALL_USERS_SUCCESS,
        payload: response.data,
      });
    } else {
      yield put({
        type: adminActionTypes.GET_ALL_USERS_ERROR,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: adminActionTypes.GET_ALL_USERS_ERROR,
      payload: error.message,
    });
  }
}

function* updateUserRoleFunction(action) {
  try {
    yield put({
      type: adminActionTypes.UPDATE_USER_ROLE_LOADING,
    });
    const response = yield call(updateUserRole, action.data);
    if (response.status === 200) {
      yield put({
        type: adminActionTypes.UPDATE_USER_ROLE_SUCCESS,
        payload: response.data,
      });
    } else {
      yield put({
        type: adminActionTypes.UPDATE_USER_ROLE_ERROR,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: adminActionTypes.UPDATE_USER_ROLE_ERROR,
      payload: error.message,
    });
  }
}

// Products sagas
function* getAdminProductsFunction() {
  try {
    yield put({
      type: adminActionTypes.GET_ADMIN_PRODUCTS_LOADING,
    });
    const response = yield call(getAdminProducts);
    if (response.status === 200) {
      yield put({
        type: adminActionTypes.GET_ADMIN_PRODUCTS_SUCCESS,
        payload: response.data,
      });
    } else {
      yield put({
        type: adminActionTypes.GET_ADMIN_PRODUCTS_ERROR,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: adminActionTypes.GET_ADMIN_PRODUCTS_ERROR,
      payload: error.message,
    });
  }
}

function* createProductFunction(action) {
  try {
    yield put({
      type: adminActionTypes.CREATE_PRODUCT_LOADING,
    });
    const response = yield call(createProduct, action.data);
    if (response.status === 201) {
      yield put({
        type: adminActionTypes.CREATE_PRODUCT_SUCCESS,
        payload: response.data,
      });
    } else {
      yield put({
        type: adminActionTypes.CREATE_PRODUCT_ERROR,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: adminActionTypes.CREATE_PRODUCT_ERROR,
      payload: error.message,
    });
  }
}

function* updateProductFunction(action) {
  try {
    yield put({
      type: adminActionTypes.UPDATE_PRODUCT_LOADING,
    });
    const response = yield call(updateProduct, action.data);
    if (response.status === 200) {
      yield put({
        type: adminActionTypes.UPDATE_PRODUCT_SUCCESS,
        payload: response.data,
      });
    } else {
      yield put({
        type: adminActionTypes.UPDATE_PRODUCT_ERROR,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: adminActionTypes.UPDATE_PRODUCT_ERROR,
      payload: error.message,
    });
  }
}

function* deleteProductFunction(action) {
  try {
    yield put({
      type: adminActionTypes.DELETE_PRODUCT_LOADING,
    });
    const response = yield call(deleteProduct, action.data);
    if (response.status === 200) {
      yield put({
        type: adminActionTypes.DELETE_PRODUCT_SUCCESS,
        payload: action.data.productId,
      });
    } else {
      yield put({
        type: adminActionTypes.DELETE_PRODUCT_ERROR,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: adminActionTypes.DELETE_PRODUCT_ERROR,
      payload: error.message,
    });
  }
}

// Orders sagas
function* getAdminOrdersFunction() {
  try {
    yield put({
      type: adminActionTypes.GET_ADMIN_ORDERS_LOADING,
    });
    const response = yield call(getAdminOrders);
    if (response.status === 200) {
      yield put({
        type: adminActionTypes.GET_ADMIN_ORDERS_SUCCESS,
        payload: response.data,
      });
    } else {
      yield put({
        type: adminActionTypes.GET_ADMIN_ORDERS_ERROR,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: adminActionTypes.GET_ADMIN_ORDERS_ERROR,
      payload: error.message,
    });
  }
}

function* updateOrderStatusFunction(action) {
  try {
    yield put({
      type: adminActionTypes.UPDATE_ORDER_STATUS_LOADING,
    });
    const response = yield call(updateOrderStatus, action.data);
    if (response.status === 200) {
      yield put({
        type: adminActionTypes.UPDATE_ORDER_STATUS_SUCCESS,
        payload: response.data,
      });
    } else {
      yield put({
        type: adminActionTypes.UPDATE_ORDER_STATUS_ERROR,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: adminActionTypes.UPDATE_ORDER_STATUS_ERROR,
      payload: error.message,
    });
  }
}

// Watchers
export function* watchGetDashboardStats() {
  yield takeEvery(adminActionTypes.GET_DASHBOARD_STATS, getDashboardStatsFunction);
}

export function* watchGetAllUsers() {
  yield takeEvery(adminActionTypes.GET_ALL_USERS, getAllUsersFunction);
}

export function* watchUpdateUserRole() {
  yield takeEvery(adminActionTypes.UPDATE_USER_ROLE, updateUserRoleFunction);
}

export function* watchGetAdminProducts() {
  yield takeEvery(adminActionTypes.GET_ADMIN_PRODUCTS, getAdminProductsFunction);
}

export function* watchCreateProduct() {
  yield takeEvery(adminActionTypes.CREATE_PRODUCT, createProductFunction);
}

export function* watchUpdateProduct() {
  yield takeEvery(adminActionTypes.UPDATE_PRODUCT, updateProductFunction);
}

export function* watchDeleteProduct() {
  yield takeEvery(adminActionTypes.DELETE_PRODUCT, deleteProductFunction);
}

export function* watchGetAdminOrders() {
  yield takeEvery(adminActionTypes.GET_ADMIN_ORDERS, getAdminOrdersFunction);
}

export function* watchUpdateOrderStatus() {
  yield takeEvery(adminActionTypes.UPDATE_ORDER_STATUS, updateOrderStatusFunction);
}

export default function* adminSaga() {
  yield all([
    fork(watchGetDashboardStats),
    fork(watchGetAllUsers),
    fork(watchUpdateUserRole),
    fork(watchGetAdminProducts),
    fork(watchCreateProduct),
    fork(watchUpdateProduct),
    fork(watchDeleteProduct),
    fork(watchGetAdminOrders),
    fork(watchUpdateOrderStatus),
  ]);
}