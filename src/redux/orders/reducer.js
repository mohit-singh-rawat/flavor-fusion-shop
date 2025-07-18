import { orderActionTypes } from "./constant";

const PLACE_ORDER_INITIAL_STATE = {
  data: null,
  loading: false,
  error: null,
  success: false,
};

const ORDER_HISTORY_INITIAL_STATE = {
  data: [],
  loading: false,
  error: null,
};

const ORDER_DETAILS_INITIAL_STATE = {
  data: null,
  loading: false,
  error: null,
};

export const placeOrderReducer = (state = PLACE_ORDER_INITIAL_STATE, action) => {
  switch (action.type) {
    case orderActionTypes.PLACE_ORDER_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };
    case orderActionTypes.PLACE_ORDER_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
        success: true,
      };
    case orderActionTypes.PLACE_ORDER_ERROR:
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

export const orderHistoryReducer = (state = ORDER_HISTORY_INITIAL_STATE, action) => {
  switch (action.type) {
    case orderActionTypes.GET_ORDER_HISTORY_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case orderActionTypes.GET_ORDER_HISTORY_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case orderActionTypes.GET_ORDER_HISTORY_ERROR:
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

export const orderDetailsReducer = (state = ORDER_DETAILS_INITIAL_STATE, action) => {
  switch (action.type) {
    case orderActionTypes.GET_ORDER_DETAILS_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case orderActionTypes.GET_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case orderActionTypes.GET_ORDER_DETAILS_ERROR:
      return {
        ...state,
        data: null,
        loading: false,
        error: action.payload,
      };
    default:
      return { ...state };
  }
};