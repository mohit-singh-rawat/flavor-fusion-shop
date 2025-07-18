import { recommendationActionTypes } from "./constant";

const INITIAL_STATE = {
  data: [],
  loading: false,
  error: null,
};

export const relatedProductsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case recommendationActionTypes.GET_RELATED_PRODUCTS_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case recommendationActionTypes.GET_RELATED_PRODUCTS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case recommendationActionTypes.GET_RELATED_PRODUCTS_ERROR:
      return {
        ...state,
        data: [],
        loading: false,
        error: action.payload,
      };
    default:
      return { ...state };
  }
};

export const trendingProductsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case recommendationActionTypes.GET_TRENDING_PRODUCTS_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case recommendationActionTypes.GET_TRENDING_PRODUCTS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case recommendationActionTypes.GET_TRENDING_PRODUCTS_ERROR:
      return {
        ...state,
        data: [],
        loading: false,
        error: action.payload,
      };
    default:
      return { ...state };
  }
};

export const personalizedRecommendationsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case recommendationActionTypes.GET_PERSONALIZED_RECOMMENDATIONS_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case recommendationActionTypes.GET_PERSONALIZED_RECOMMENDATIONS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case recommendationActionTypes.GET_PERSONALIZED_RECOMMENDATIONS_ERROR:
      return {
        ...state,
        data: [],
        loading: false,
        error: action.payload,
      };
    default:
      return { ...state };
  }
};