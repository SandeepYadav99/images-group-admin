import {
  formDataRequest,
  getRequest,
  postRequest,
} from "../libs/AxiosService.util";

export async function serviceCreateMeetingRoomSlotList(params) {
  return await postRequest("meetings/rooms/slots/create", params);
}
export async function serviceUpdateMeetingRoomSlotList(params) {
  return await formDataRequest("highlights/update", params);
}
export async function serviceDeleteMeetingRoomSlotList(params) {
  return await postRequest("events/delete", params);
}
export async function serviceGetMeetingRoomSlottListDetails(params) {
  return await postRequest("meetings/rooms/detail", params);
}
export async function serviceGetMeetingRoomSlottBoolsDetails(params) {
  return await postRequest("events/boolstatus", params);
}
export async function serviceUpdateMeetingRoomSlottTimer(params) {
  return await postRequest("events/update/timer", params);
}
export async function serviceUpdateMeetingRoomSlottStatus(params) {
  return await postRequest("events/update/status", params);
}
export async function serviceUpdateMeetingRoomSlottPoll(params) {
  return await postRequest("events/update/poll", params);
}
export async function serviceUpdateMeetingRoomSlottReg(params) {
  return await postRequest("events/update/registration", params);
}

export async function serviceGetMeetingRoomSlotList(params) {
  return await postRequest("meetings/rooms/slots", params);
}
export async function serviceDetailsMeetingRoomSlottList(params) {
  return await postRequest("events/details", params);
}
export async function serviceCheckMeetingRoomSlottList(params) {
  return await postRequest("events/exists", params);
}

export async function serviceUpdateSlotStatus(params) {
  return await postRequest("meetings/rooms/slots/update/status", params);
}

