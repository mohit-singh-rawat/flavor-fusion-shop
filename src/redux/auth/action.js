import { authActionTypes } from "./constant";


export const createLoginAction = (data) => ({
    type: authActionTypes.AUTH_LOGIN,
    data
});
export const createRegisterAction = (data) => ({
    type: authActionTypes.AUTH_REGISTER,
    data
});