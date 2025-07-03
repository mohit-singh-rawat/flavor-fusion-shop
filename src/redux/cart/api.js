import { postRequest, getRequest, putRequest, deleteRequest } from '../../helpers/api/apiCores';
import * as URL from '../../helpers/api/apiEndpoints';

export function createCart(params){
    const { data } = params;
    return postRequest(URL.addToCart, data);
}
export function updateCart(params){
    const { id, data } = params;
    return putRequest(`${URL.addToCart}/${id}`, data);
}
export function getCartDetails(params = {}){
    return getRequest(URL.addToCart);
}
export function deleteCart(params){
    const { id } = params;
    return deleteRequest(`${URL.addToCart}/${id}`);
}

