import {
    formDataRequest,
    getRequest,
    postRequest,
  } from "../libs/AxiosService.util";
  
  export async function serviceCreateMMeeting(params) {
    return await postRequest("meetings/slots/create", params);
  }
  export async function serviceMMeetingDetails(params) {
    return await postRequest("meetings/slots", params);
  }