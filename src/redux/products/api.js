import { postRequest, getRequest, putRequest, deleteRequest } from '../../helpers/api/apiCores';
import * as URL from '../../helpers/api/apiEndpoints';

export function createProduct(params){
    const { data } = params;
    return postRequest(URL.createProduct, data);
}
export function updateProduct(params){
    const { id, data } = params;
    return putRequest(`${URL.getProductById}/${id}`, data);
}
export function getProducts(params = {}){
    return getRequest(URL.getProducts);
}

export function getProductById(params){
    const { id } = params;
    return getRequest(`${URL.product}/${id}`);
}