import {
  formDataRequest,
  getRequest,
  postRequest,
} from "../libs/AxiosService.util";

export async function serviceCreateEventSchedule(params) {
  return await formDataRequest("events/schedule/create", params);
}
export async function serviceUpdateEventSchedule(params) {
  return await formDataRequest("events/schedule/update", params);
}
export async function serviceDeleteEventSchedule(params) {
  return await postRequest("events/schedule/delete", params);
}
export async function serviceGetEventScheduleDetails(params) {
  return await postRequest("events/schedule/detail", params);
}
export async function serviceGetEventSchedule(params) {
  return await postRequest("events/schedule", params);
}
export async function serviceDetailsEventSchedule(params) {
  return await postRequest("events/schedule/detail", params);
}
export async function serviceEventScheduleLive(params) {
  return await postRequest("events/schedule/make/live", params);
}
export async function serviceEventScheduleHideLive(params) {
  return await postRequest("events/schedule/hide/live", params);
}

export async function serviceEventScheduleScheduleStatus(params) {
  return await postRequest("events/schedule/is/complete", params);
}

export async function serviceEventScheduleRatingCount(params) {
  return await postRequest("events/schedule/rating/count", params);
}

export async function serviceEventScheduleStatusUpdate(params) {
  return await postRequest("events/schedule/status/update", params);
}