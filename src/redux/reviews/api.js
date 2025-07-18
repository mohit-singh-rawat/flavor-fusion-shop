import { postRequest, getRequest } from '../../helpers/api/apiCores';

const BASE_URL = '/api/reviews';

export function getReviews(params) {
  const { productId } = params;
  return getRequest(`${BASE_URL}/product/${productId}`);
}

export function addReview(params) {
  const { data } = params;
  return postRequest(BASE_URL, data);
}