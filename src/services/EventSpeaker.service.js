import {
  formDataRequest,
  getRequest,
  postRequest,
} from "../libs/AxiosService.util";

export async function serviceCreateEventSpeaker(params) {
  return await formDataRequest("speakers/create", params);
}
export async function serviceEventFeatured(params) {
  return await postRequest("events/speakers/make/featured", params);
}
export async function serviceUpdateEventSpeaker(params) {
  return await formDataRequest("speakers/update", params);
}
export async function serviceDeleteEventSpeaker(params) {
  return await postRequest("events/speakers/delete", params);
}
export async function serviceGetEventSpeakerDetails(params) {
  return await postRequest("speakers/detail", params);
}
export async function serviceGetEventSpeaker(params) {
  return await postRequest("speakers", params);
}
export async function serviceDetailsEventSpeaker(params) {
  return await postRequest("speakers/details", params);
}
export async function serviceCheckEventSpeaker(params) {
  return await postRequest("events/speakers/exists", params);
}

export async function serviceAssociatedSpeaker(params){
  return await postRequest("events/speakers",params)
}

export async function serviceAssociatedCommonList(params){
  return await postRequest("list",params)

}
