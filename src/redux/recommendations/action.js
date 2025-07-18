import { recommendationActionTypes } from "./constant";

export const getRelatedProductsAction = (data) => ({
  type: recommendationActionTypes.GET_RELATED_PRODUCTS,
  data,
});

export const getTrendingProductsAction = () => ({
  type: recommendationActionTypes.GET_TRENDING_PRODUCTS,
});

export const getPersonalizedRecommendationsAction = () => ({
  type: recommendationActionTypes.GET_PERSONALIZED_RECOMMENDATIONS,
});