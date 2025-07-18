import { postRequest, getRequest } from '../../helpers/api/apiCores';

const BASE_URL = '/api/orders';

export function placeOrder(params) {
  const { data } = params;
  return postRequest(`${BASE_URL}/place`, data);
}

export function getOrderHistory() {
  return getRequest(`${BASE_URL}/history`);
}

export function getOrderDetails(params) {
  const { orderId } = params;
  return getRequest(`${BASE_URL}/${orderId}`);
}