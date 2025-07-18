import { adminActionTypes } from './constant';

// Dashboard actions
export const getDashboardStatsAction = () => ({
  type: adminActionTypes.GET_DASHBOARD_STATS,
});

// User actions
export const getAllUsersAction = () => ({
  type: adminActionTypes.GET_ALL_USERS,
});

export const updateUserRoleAction = (userId, role) => ({
  type: adminActionTypes.UPDATE_USER_ROLE,
  data: { userId, role },
});

// Product actions
export const getAdminProductsAction = () => ({
  type: adminActionTypes.GET_ADMIN_PRODUCTS,
});

export const createProductAction = (productData) => ({
  type: adminActionTypes.CREATE_PRODUCT,
  data: { productData },
});

export const updateProductAction = (productId, productData) => ({
  type: adminActionTypes.UPDATE_PRODUCT,
  data: { productId, productData },
});

export const deleteProductAction = (productId) => ({
  type: adminActionTypes.DELETE_PRODUCT,
  data: { productId },
});

// Order actions
export const getAdminOrdersAction = () => ({
  type: adminActionTypes.GET_ADMIN_ORDERS,
});

export const updateOrderStatusAction = (orderId, status) => ({
  type: adminActionTypes.UPDATE_ORDER_STATUS,
  data: { orderId, status },
});