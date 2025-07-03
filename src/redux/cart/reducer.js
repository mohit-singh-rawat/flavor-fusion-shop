import { CartActionTypes } from "./constant";

const CREATE_CART_INITIAL_STATE = {
    data: [],
    loading: false
}
const GET_CART_INITIAL_STATE = {
    data: [],
    loading: false,
}

const UPDATE_CART_INITIAL_STATE ={
    data : [],
    loading: false
}

const DELETE_CART_INITIAL_STATE ={
    data : [],
    loading: false
}

export const createCartReducer = (state = CREATE_CART_INITIAL_STATE, action) => {
    switch (action.type) {
        case CartActionTypes.CREATE_CART_LOADING:
            return {
                data: state.data,
                loading: true
            }
        case CartActionTypes.CREATE_CART_SUCCESS:
            return {
                data: action.payload,
                loading: false
            }
        case CartActionTypes.CREATE_CART_RESET:
            return {
                data: [],
                loading: false,
            };
        case CartActionTypes.CREATE_CART_ERROR:
            return {
                data: action?.payload,
                loading: false,
            };
        default:
            return { ...state };
    }
};

export const getCartReducer = (state = GET_CART_INITIAL_STATE, action) => {
    switch (action.type) {
        case CartActionTypes.GET_CART_DATA_LOADING:
            return {
                data: state.data,
                loading: true
            }
        case CartActionTypes.GET_CART_DATA_SUCCESS:
            return {
                data: action.payload,
                loading: false
            }
        // case CartActionTypes.GET_PRODUCT_RESET:
        //     return {
        //         data: [],
        //         loading: false,
        //     };
        case CartActionTypes.GET_CART_DATA_ERROR:
            return {
                data: action?.payload,
                loading: false,
            };
        default:
            return { ...state };
    }
};

export const updataCartReducer = (state = UPDATE_CART_INITIAL_STATE, action) => {
    switch (action.type) {
        case CartActionTypes.GET_PRODUCT_BY_ID_LOADING:
            return {
                data: state.data,
                loading: true
            }
        case CartActionTypes.GET_PRODUCT_BY_ID_SUCCESS:
            return {
                data: action.payload,
                loading: false
            }
        // case CartActionTypes.GET_PRODUCT_BY_ID_RESET:
        //     return {
        //         data: [],
        //         loading: false,
        //     };
        case CartActionTypes.GET_PRODUCT_BY_ID_ERROR:
            return {
                data: action?.payload,
                loading: false,
            };
        default:
            return { ...state };
    }
};

export const deleteCartReducer = (state = DELETE_CART_INITIAL_STATE, action) => {
    switch (action.type) {
        case CartActionTypes.DELETE_CART_DATA_LOADING:
            return {
                data: state.data,
                loading: true
            }
        case CartActionTypes.DELETE_CART_DATA_SUCCESS:
            return {
                data: action.payload,
                loading: false
            }
        case CartActionTypes.DELETE_CART_DATA_RESET:
            return {
                data: [],
                loading: false,
            };
        case CartActionTypes.DELETE_CART_DATA_ERROR:
            return {
                data: action?.payload,
                loading: false,
            };
        default:
            return { ...state };
    }
};