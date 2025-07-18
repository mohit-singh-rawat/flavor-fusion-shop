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
    const { page = 1, limit = 50, search = '', category = '', minPrice = '', maxPrice = '', sortBy = '', sortOrder = 'asc' } = params;
    const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(search && { search }),
        ...(category && { category }),
        ...(minPrice && { minPrice: minPrice.toString() }),
        ...(maxPrice && { maxPrice: maxPrice.toString() }),
        ...(sortBy && { sortBy }),
        ...(sortOrder && { sortOrder })
    });
    return getRequest(`${URL.getProducts}?${queryParams.toString()}`);
}

export function getProductById(params){
    const { id } = params;
    return getRequest(`${URL.product}/${id}`);
}