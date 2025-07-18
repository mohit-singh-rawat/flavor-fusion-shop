import { postRequest, getRequest, putRequest, deleteRequest } from '../../helpers/api/apiCores';

import * as URL from '../../helpers/api/apiEndpoints';

export function getProfile() {
  return getRequest(URL.profile);
}

export function updateProfile(params) {
  const { data } = params;
  return putRequest(URL.profile, data);
}

export function addAddress(params) {
  const { data } = params;
  return postRequest(`${URL.profile}/address`, data);
}

export function updateAddress(params) {
  const { addressId, data } = params;
  return putRequest(`${URL.profile}/address/${addressId}`, data);
}

export function deleteAddress(params) {
  const { addressId } = params;
  return deleteRequest(`${URL.profile}/address/${addressId}`);
}