import { authActionTypes } from "./constant";


const CREATE_LOGIN_DATA_INITIAL_STATE = {
    data: [],
    loading: false,
    isAuthenticated: false,
}

const CREATE_REGISTER_DATA_INITIAL_STATE = {
    data: [],
    loading: false,
    isRegistered: false,
    error: null,
}

export const createLoginReducer = (state = CREATE_LOGIN_DATA_INITIAL_STATE, action) => {
    switch (action.type) {
        case authActionTypes.AUTH_LOGIN_LOADING:
            return {
                ...state,
                loading: true,
            }
        case authActionTypes.AUTH_LOGIN_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loading: false,
                isAuthenticated: true,
            }
        case authActionTypes.AUTH_LOGIN_RESET:
            return {
                ...state,
                data: [],
                loading: false,
                isAuthenticated: false,
            };
        case authActionTypes.AUTH_LOGIN_ERROR:
            return {
                ...state,
                data: action?.payload,
                loading: false,
                isAuthenticated: false,
            };
        default:
            return { ...state };
    }
};

export const createRegisterReducer = (state = CREATE_REGISTER_DATA_INITIAL_STATE, action) => {
    switch (action.type) {
        case authActionTypes.AUTH_REGISTER_LOADING:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case authActionTypes.AUTH_REGISTER_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loading: false,
                isRegistered: true,
                error: null,
            }
        case authActionTypes.AUTH_REGISTER_RESET:
            return {
                ...state,
                data: [],
                loading: false,
                isRegistered: false,
                error: null,
            };
        case authActionTypes.AUTH_REGISTER_ERROR:
            return {
                ...state,
                data: [],
                loading: false,
                isRegistered: false,
                error: action.payload,
            };
        default:
            return { ...state };
    }
};

