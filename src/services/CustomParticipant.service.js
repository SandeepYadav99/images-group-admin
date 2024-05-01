import { formDataRequest, postRequest } from "../libs/AxiosService.util";

export async function serviceGetCustomParticipant(params) {
  return await postRequest("events/custom/fields", params);
}

export async function serviceCreateCustomParticipant(params) {
  return await formDataRequest("events/custom/fields/create", params);
}

export async function serviceUpdateCustomParticipant(params) {
  return await formDataRequest("events/custom/fields/update", params);
}

export async function serviceGetCustomParticipantDetails(params) {
  return await postRequest("events/custom/fields/detail", params);
}

export async function serviceDeleteCustomParticipant(params) {
  return await postRequest("policies/delete", params);
}
export async function serviceGetFullCustomParticipant(params) {
  return await postRequest("events/custom/fields/list", params);
}
