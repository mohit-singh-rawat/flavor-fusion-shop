import { orderActionTypes } from "./constant";

export const placeOrderAction = (data) => ({
  type: orderActionTypes.PLACE_ORDER,
  data,
});

export const getOrderHistoryAction = () => ({
  type: orderActionTypes.GET_ORDER_HISTORY,
});

export const getOrderDetailsAction = (data) => ({
  type: orderActionTypes.GET_ORDER_DETAILS,
  data,
});