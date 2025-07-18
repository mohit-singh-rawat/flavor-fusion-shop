import { adminActionTypes } from './constant';

// Dashboard reducer
const DASHBOARD_INITIAL_STATE = {
  data: null,
  loading: false,
  error: null,
};

export const dashboardReducer = (state = DASHBOARD_INITIAL_STATE, action) => {
  switch (action.type) {
    case adminActionTypes.GET_DASHBOARD_STATS_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case adminActionTypes.GET_DASHBOARD_STATS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case adminActionTypes.GET_DASHBOARD_STATS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Users reducer
const USERS_INITIAL_STATE = {
  data: [],
  loading: false,
  error: null,
  updateSuccess: false,
};

export const usersReducer = (state = USERS_INITIAL_STATE, action) => {
  switch (action.type) {
    case adminActionTypes.GET_ALL_USERS_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case adminActionTypes.GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case adminActionTypes.GET_ALL_USERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case adminActionTypes.UPDATE_USER_ROLE_LOADING:
      return {
        ...state,
        updateSuccess: false,
      };
    case adminActionTypes.UPDATE_USER_ROLE_SUCCESS:
      return {
        ...state,
        data: state.data.map(user => 
          user._id === action.payload._id ? action.payload : user
        ),
        updateSuccess: true,
      };
    case adminActionTypes.UPDATE_USER_ROLE_ERROR:
      return {
        ...state,
        error: action.payload,
        updateSuccess: false,
      };
    default:
      return state;
  }
};

// Admin products reducer
const ADMIN_PRODUCTS_INITIAL_STATE = {
  data: [],
  loading: false,
  error: null,
  createSuccess: false,
  updateSuccess: false,
  deleteSuccess: false,
};

export const adminProductsReducer = (state = ADMIN_PRODUCTS_INITIAL_STATE, action) => {
  switch (action.type) {
    case adminActionTypes.GET_ADMIN_PRODUCTS_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case adminActionTypes.GET_ADMIN_PRODUCTS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case adminActionTypes.GET_ADMIN_PRODUCTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case adminActionTypes.CREATE_PRODUCT_LOADING:
      return {
        ...state,
        createSuccess: false,
      };
    case adminActionTypes.CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        data: [...state.data, action.payload],
        createSuccess: true,
      };
    case adminActionTypes.CREATE_PRODUCT_ERROR:
      return {
        ...state,
        error: action.payload,
        createSuccess: false,
      };
    case adminActionTypes.UPDATE_PRODUCT_LOADING:
      return {
        ...state,
        updateSuccess: false,
      };
    case adminActionTypes.UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        data: state.data.map(product => 
          product._id === action.payload._id ? action.payload : product
        ),
        updateSuccess: true,
      };
    case adminActionTypes.UPDATE_PRODUCT_ERROR:
      return {
        ...state,
        error: action.payload,
        updateSuccess: false,
      };
    case adminActionTypes.DELETE_PRODUCT_LOADING:
      return {
        ...state,
        deleteSuccess: false,
      };
    case adminActionTypes.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        data: state.data.filter(product => product._id !== action.payload),
        deleteSuccess: true,
      };
    case adminActionTypes.DELETE_PRODUCT_ERROR:
      return {
        ...state,
        error: action.payload,
        deleteSuccess: false,
      };
    default:
      return state;
  }
};

// Admin orders reducer
const ADMIN_ORDERS_INITIAL_STATE = {
  data: [],
  loading: false,
  error: null,
  updateSuccess: false,
};

export const adminOrdersReducer = (state = ADMIN_ORDERS_INITIAL_STATE, action) => {
  switch (action.type) {
    case adminActionTypes.GET_ADMIN_ORDERS_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case adminActionTypes.GET_ADMIN_ORDERS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case adminActionTypes.GET_ADMIN_ORDERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case adminActionTypes.UPDATE_ORDER_STATUS_LOADING:
      return {
        ...state,
        updateSuccess: false,
      };
    case adminActionTypes.UPDATE_ORDER_STATUS_SUCCESS:
      return {
        ...state,
        data: state.data.map(order => 
          order._id === action.payload._id ? action.payload : order
        ),
        updateSuccess: true,
      };
    case adminActionTypes.UPDATE_ORDER_STATUS_ERROR:
      return {
        ...state,
        error: action.payload,
        updateSuccess: false,
      };
    default:
      return state;
  }
};