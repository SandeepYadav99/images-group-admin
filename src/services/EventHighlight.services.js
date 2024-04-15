import {
    formDataRequest,
    getRequest,
    postRequest,
  } from "../libs/AxiosService.util";
  
  export async function serviceCreateEventHighLightList(params) {
    return await formDataRequest("knowledge/center/create", params);
  }
  export async function serviceUpdateEventHighLightList(params) {
    return await formDataRequest("knowledge/center/update", params);
  }
  export async function serviceDeleteEventHighLightList(params) {
    return await postRequest("events/delete", params);
  }
  export async function serviceGetEventHighLightListDetails(params) {
    return await postRequest("knowledge/center/detail", params);
  }
  export async function serviceGetEventHighLightBoolsDetails(params) {
    return await postRequest("events/boolstatus", params);
  }
  export async function serviceUpdateEventHighLightTimer(params) {
    return await postRequest("events/update/timer", params);
  }
  export async function serviceUpdateEventHighLightStatus(params) {
    return await postRequest("events/update/status", params);
  }
  export async function serviceUpdateEventHighLightPoll(params) {
    return await postRequest("events/update/poll", params);
  }
  export async function serviceUpdateEventHighLightReg(params) {
    return await postRequest("events/update/registration", params);
  }
  
  export async function serviceGetEventHighLightList(params) {
    return await postRequest("knowledge/center", params);
  }
  export async function serviceDetailsEventHighLightList(params) {
    return await postRequest("events/details", params);
  }
  export async function serviceCheckEventHighLightList(params) {
    return await postRequest("events/exists", params);
  }
  