import { reviewActionTypes } from "./constant";

const REVIEWS_INITIAL_STATE = {
  data: [],
  loading: false,
  error: null,
};

const ADD_REVIEW_INITIAL_STATE = {
  data: null,
  loading: false,
  error: null,
  success: false,
};

export const getReviewsReducer = (state = REVIEWS_INITIAL_STATE, action) => {
  switch (action.type) {
    case reviewActionTypes.GET_REVIEWS_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case reviewActionTypes.GET_REVIEWS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case reviewActionTypes.GET_REVIEWS_ERROR:
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

export const addReviewReducer = (state = ADD_REVIEW_INITIAL_STATE, action) => {
  switch (action.type) {
    case reviewActionTypes.ADD_REVIEW_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };
    case reviewActionTypes.ADD_REVIEW_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
        success: true,
      };
    case reviewActionTypes.ADD_REVIEW_ERROR:
      return {
        ...state,
        data: null,
        loading: false,
        error: action.payload,
        success: false,
      };
    default:
      return { ...state };
  }
};