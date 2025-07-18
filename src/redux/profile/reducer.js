import { profileActionTypes } from "./constant";

const PROFILE_INITIAL_STATE = {
  data: null,
  loading: false,
  error: null,
};

const UPDATE_PROFILE_INITIAL_STATE = {
  data: null,
  loading: false,
  error: null,
  success: false,
};

const ADDRESS_INITIAL_STATE = {
  data: null,
  loading: false,
  error: null,
  success: false,
};

export const getProfileReducer = (state = PROFILE_INITIAL_STATE, action) => {
  switch (action.type) {
    case profileActionTypes.GET_PROFILE_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case profileActionTypes.GET_PROFILE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case profileActionTypes.GET_PROFILE_ERROR:
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

export const updateProfileReducer = (state = UPDATE_PROFILE_INITIAL_STATE, action) => {
  switch (action.type) {
    case profileActionTypes.UPDATE_PROFILE_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };
    case profileActionTypes.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
        success: true,
      };
    case profileActionTypes.UPDATE_PROFILE_ERROR:
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

export const addressReducer = (state = ADDRESS_INITIAL_STATE, action) => {
  switch (action.type) {
    case profileActionTypes.ADD_ADDRESS_LOADING:
    case profileActionTypes.UPDATE_ADDRESS_LOADING:
    case profileActionTypes.DELETE_ADDRESS_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };
    case profileActionTypes.ADD_ADDRESS_SUCCESS:
    case profileActionTypes.UPDATE_ADDRESS_SUCCESS:
    case profileActionTypes.DELETE_ADDRESS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
        success: true,
      };
    case profileActionTypes.ADD_ADDRESS_ERROR:
    case profileActionTypes.UPDATE_ADDRESS_ERROR:
    case profileActionTypes.DELETE_ADDRESS_ERROR:
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