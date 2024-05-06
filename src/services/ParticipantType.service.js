import { formDataRequest, postRequest } from "../libs/AxiosService.util";

export async function serviceGetCustomParticipantType(params) {
  return await postRequest("participant/type", params);
}

export async function serviceCreateCustomParticipantType(params) {
  return await formDataRequest("participant/type/create", params);
}

export async function serviceUpdateCustomParticipantType(params) {
  return await formDataRequest("participant/type/update", params);
}

export async function serviceGetCustomParticipantTypeDetails(params) {
  return await postRequest("participant/type/detail", params);
}

export async function serviceDeleteCustomParticipantType(params) {
  return await postRequest("policies/delete", params);
}
export async function serviceGetFullCustomParticipantType(params) {
  return await postRequest("events/custom/fields/list", params);
}
