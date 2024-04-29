import {
    formDataRequest,
    getRequest,
    postRequest,
  } from "../libs/AxiosService.util";
  
  export async function serviceCreateMeetingRoomList(params) {
    return await postRequest("meetings/rooms/create", params);
  }
  export async function serviceUpdateMeetingRoomList(params) {
    return await formDataRequest("meetings/rooms/update", params);
  }
  export async function serviceDeleteMeetingRoomList(params) {
    return await postRequest("events/delete", params);
  }
  export async function serviceGetMeetingRoomtListDetails(params) {
    return await postRequest("meetings/rooms/detail", params);
  }
  export async function serviceGetMeetingRoomtBoolsDetails(params) {
    return await postRequest("events/boolstatus", params);
  }
  export async function serviceUpdateMeetingRoomtTimer(params) {
    return await postRequest("events/update/timer", params);
  }
  export async function serviceUpdateMeetingRoomtStatus(params) {
    return await postRequest("events/update/status", params);
  }
  export async function serviceUpdateMeetingRoomtPoll(params) {
    return await postRequest("events/update/poll", params);
  }
  export async function serviceUpdateMeetingRoomtReg(params) {
    return await postRequest("events/update/registration", params);
  }
  
  export async function serviceGetMeetingRoomList(params) {
    return await postRequest("meetings/rooms", params);
  }
  export async function serviceDetailsMeetingRoomtList(params) {
    return await postRequest("events/details", params);
  }
  export async function serviceCheckMeetingRoomtList(params) {
    return await postRequest("events/exists", params);
  }

  export async function serviceCreateDuplicateAPi(params){
    return await postRequest("meetings/rooms/duplicate",params)
  }
  
  