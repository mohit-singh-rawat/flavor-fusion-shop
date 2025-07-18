import { getRequest } from '../../helpers/api/apiCores';

const BASE_URL = '/api/recommendations';

export function getRelatedProducts(params) {
  const { productId } = params;
  return getRequest(`${BASE_URL}/related/${productId}`);
}

export function getTrendingProducts() {
  return getRequest(`${BASE_URL}/trending`);
}

export function getPersonalizedRecommendations() {
  return getRequest(`${BASE_URL}/personalized`);
}