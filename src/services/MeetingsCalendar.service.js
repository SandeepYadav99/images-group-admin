import {
    formDataRequest,
    getRequest,
    postRequest,
  } from "../libs/AxiosService.util";
  
  export async function serviceCreateMeetingCallendarList(params) {
    return await postRequest("meetings/calendar", params);
  }
  
  export async function serviceCreateMeetingCallendarDate(params) {
    return await postRequest("meetings/calendar/dates", params);
  }

  export async function serviceCreateMeetingCallendarTimeSlot(params) {
    return await postRequest("meetings/calendar/slots", params);
  }

  export async function serviceCreateMeetingCallendarRooms(params) {
    return await postRequest("meetings/calendar/rooms", params);
  }
// api/chat/contacts
  export async function serviceCreateMeetingCallendarCreate(params) {
    return await postRequest("meetings/calendar/add", params);
  }

  export async function serviceCreateMeetingCallendarBookWith(params) {
    return await postRequest("meetings/calendar/contacts", params);
  }