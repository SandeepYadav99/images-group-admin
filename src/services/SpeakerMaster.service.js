import {
    formDataRequest,
    getRequest,
    postRequest,
  } from "../libs/AxiosService.util";
  
  export async function serviceCreateEventSpeakerMaster(params) {
    return await formDataRequest("speakers/create", params);
  }
  export async function serviceEventFeatured(params) {
    return await postRequest("events/speakers/featured", params);
  }
  export async function serviceUpdateEventSpeakerMaster(params) {
    return await formDataRequest("speakers/update", params);
  }
  export async function serviceDeleteEventSpeakerMaster(params) {
    return await postRequest("events/speakers/delete", params);
  }
 
  export async function serviceGetEventSpeakerMaster(params) {
    return await postRequest("speakers", params);
  }
  export async function serviceDetailsSpeakerMaster(params) {
    return await postRequest("/speakers/detail", params);
  }
  export async function serviceCheckEventSpeaker(params) {
    return await postRequest("events/speakers/exists", params);
  }
  