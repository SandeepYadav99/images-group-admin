import { formDataRequest, postRequest } from "../libs/AxiosService.util";

export async function serviceCreateEventParticipants(params) {
  return await postRequest("events/participants/user", params);
}