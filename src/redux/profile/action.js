import { profileActionTypes } from "./constant";

export const getProfileAction = () => ({
  type: profileActionTypes.GET_PROFILE,
});

export const updateProfileAction = (data) => ({
  type: profileActionTypes.UPDATE_PROFILE,
  data,
});

export const addAddressAction = (data) => ({
  type: profileActionTypes.ADD_ADDRESS,
  data,
});

export const updateAddressAction = (data) => ({
  type: profileActionTypes.UPDATE_ADDRESS,
  data,
});

export const deleteAddressAction = (data) => ({
  type: profileActionTypes.DELETE_ADDRESS,
  data,
});