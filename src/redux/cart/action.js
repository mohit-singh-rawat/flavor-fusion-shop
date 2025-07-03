import { CartActionTypes } from "./constant";

export const createCartAction = (data) => ({
  type: CartActionTypes.CREATE_CART,
  data,
});
export const getCartAction = (data) => ({
  type: CartActionTypes.GET_CART_DATA,
  data,
});

export const updateCartAction = (data) => ({
  type: CartActionTypes.UPDATE_CART_DATA,
  data,
});

export const deleteCartAction = (data) => ({
  type: CartActionTypes.DELETE_CART_DATA,
  data,
});
