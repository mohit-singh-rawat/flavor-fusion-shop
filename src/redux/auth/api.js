import { postRequest, getRequest, putRequest, deleteRequest } from '../../helpers/api/apiCores';
import * as URL from '../../helpers/api/apiEndpoints';

export function createApiLogin(params) {
    const { data } = params;
    return postRequest(URL.authLogin, data);
}
export function createApiRegister(params) {
    const { data } = params;
    return postRequest(URL.authRegister, data);
}
