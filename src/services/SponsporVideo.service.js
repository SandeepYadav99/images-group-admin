import { formDataRequest, postRequest } from "../libs/AxiosService.util";

export async function serviceCreateSponsporVideo(params) {
  return await formDataRequest("events/sponsors/video/create", params);
}
export async function serviceGetSponsporVideoDetails(params) {
  return await postRequest("events/sponsors/video/detail", params);
}

export async function serviceUpdateSponsporVideo(params) {
  return await formDataRequest("events/sponsors/video/update", params);
}
export async function serviceUpdateSponsporVideoSearch(params) {
  return await postRequest("users/autocomplete", params);
}
export async function serviceDeleteSponsporVideo(params) {
  return await postRequest("users/delete", params);
}

export async function serviceGetSponsporVideo(params) {
  return await postRequest("events/sposnors/video", params);
}

export async function serviceSponsporVideoCheck(params) {
  return await postRequest("users/check", params);
}

export async function serviceSponsporVideoUpdateHead(params) {
  return await postRequest("users/update/head", params);
}

export async function serviceSponsporVideoUpdate(params) {
  return await postRequest("users/update/userss", params);
}

export async function serviceSponsporVideos(params) {
  return await postRequest("users/userss", params);
}
export async function serviceClaimSponsporVideos(params) {
  return await postRequest("users/claim/panelists", params);
}
export async function serviceSponsporVideoClaimUpdate(params) {
  return await postRequest("users/update/claim/panelists", params);
}

export async function serviceSponsporVideoPasswordUpdate(params) {
  return await postRequest("users/update/password", params);
}
export async function serviceSponsporVideoCheckExist(params) {
  return await postRequest("users/exists", params);
}