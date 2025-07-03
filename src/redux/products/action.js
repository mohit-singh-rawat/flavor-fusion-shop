import { ProductActiontypes } from "./constant";

export const createproductAction = (data) => ({
  type: ProductActiontypes.CREATE_PRODUCT,
  data,
});
export const updateproductAction = (data) => ({
  type: ProductActiontypes.UPDATE_PRODUCT,
  data,
});
export const getProductAction =(data)=>({
 type:ProductActiontypes.GET_PRODUCT,
 data
})
export const getProductByIdAction =(data)=>({
  type:ProductActiontypes.GET_PRODUCT_BY_ID,
  data
})