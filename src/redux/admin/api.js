import { getRequest, postRequest, putRequest, deleteRequest } from '../../helpers/api/apiCores';

const BASE_URL = '/api/admin';

// Dashboard
export function getDashboardStats() {
  return getRequest(`${BASE_URL}/dashboard`);
}

// Users
export function getAllUsers() {
  return getRequest(`${BASE_URL}/users`);
}

export function updateUserRole(params) {
  const { userId, role } = params;
  return putRequest(`${BASE_URL}/users/${userId}/role`, { role });
}

// Products
export function getAdminProducts() {
  return getRequest(`${BASE_URL}/products`);
}

export function createProduct(params) {
  const { productData } = params;
  return postRequest(`${BASE_URL}/products`, productData);
}

export function updateProduct(params) {
  const { productId, productData } = params;
  return putRequest(`${BASE_URL}/products/${productId}`, productData);
}

export function deleteProduct(params) {
  const { productId } = params;
  return deleteRequest(`${BASE_URL}/products/${productId}`);
}

// Orders
export function getAdminOrders() {
  return getRequest(`${BASE_URL}/orders`);
}

export function updateOrderStatus(params) {
  const { orderId, status } = params;
  return putRequest(`${BASE_URL}/orders/${orderId}/status`, { status });
}