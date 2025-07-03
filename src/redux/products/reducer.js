import { ProductActiontypes } from "./constant";

const CREATE_PRODUCT_INITIAL_STATE = {
    data: [],
    loading: false
}
const GET_PRODUCT_INITIAL_STATE = {
    data: [],
    loading: false,
}

const GET_PRODUCT_BY_ID_INITIAL_STATE ={
    data : [],
    loading: false
}

export const createProductReducer = (state = CREATE_PRODUCT_INITIAL_STATE, action) => {
    switch (action.type) {
        case ProductActiontypes.CREATE_PRODUCT_LOADING:
            return {
                data: state.data,
                loading: true
            }
        case ProductActiontypes.CREATE_PRODUCT_SUCCESS:
            return {
                data: action.payload,
                loading: false
            }
        case ProductActiontypes.CREATE_PRODUCT_RESET:
            return {
                data: [],
                loading: false,
            };
        case ProductActiontypes.CREATE_PRODUCT_ERROR:
            return {
                data: action?.payload,
                loading: false,
            };
        default:
            return { ...state };
    }
};

export const getProductReducer = (state = GET_PRODUCT_INITIAL_STATE, action) => {
    switch (action.type) {
        case ProductActiontypes.GET_PRODUCT_LOADING:
            return {
                data: state.data,
                loading: true
            }
        case ProductActiontypes.GET_PRODUCT_SUCCESS:
            return {
                data: action.payload,
                loading: false
            }
        // case ProductActiontypes.GET_PRODUCT_RESET:
        //     return {
        //         data: [],
        //         loading: false,
        //     };
        case ProductActiontypes.GET_PRODUCT_ERROR:
            return {
                data: action?.payload,
                loading: false,
            };
        default:
            return { ...state };
    }
};

export const getProductByIdReducer = (state = GET_PRODUCT_BY_ID_INITIAL_STATE, action) => {
    switch (action.type) {
        case ProductActiontypes.GET_PRODUCT_BY_ID_LOADING:
            return {
                data: state.data,
                loading: true
            }
        case ProductActiontypes.GET_PRODUCT_BY_ID_SUCCESS:
            return {
                data: action.payload,
                loading: false
            }
        // case ProductActiontypes.GET_PRODUCT_BY_ID_RESET:
        //     return {
        //         data: [],
        //         loading: false,
        //     };
        case ProductActiontypes.GET_PRODUCT_BY_ID_ERROR:
            return {
                data: action?.payload,
                loading: false,
            };
        default:
            return { ...state };
    }
};