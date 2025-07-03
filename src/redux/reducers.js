import { combineReducers } from "redux";
import { createLoginReducer, createRegisterReducer } from "./auth/reducer";
import { getProductReducer } from "./products/reducer";

export default combineReducers({
  auth: createLoginReducer,
  register: createRegisterReducer,
  getProducts : getProductReducer,
});
