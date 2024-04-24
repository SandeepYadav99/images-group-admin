import {
    formDataRequest,
    getRequest,
    postRequest,
  } from "../libs/AxiosService.util";
  
  export async function serviceCreateAward(params) {
    return await formDataRequest("awards/create", params);
  }
  export async function serviceUpdateAward(params) {
    return await formDataRequest("awards/update", params);
  }
  export async function serviceDeleteAward(params) {
    return await postRequest("awards/delete", params);
  }
  export async function serviceGetAwardDetails(params) {
    return await postRequest("awards/detail", params);
  }
  export async function serviceGetAward(params) {
    return await postRequest("awards", params);
  }
  export async function serviceDetailsAward(params) {
    return await postRequest("awards/detail", params);
  }
  export async function serviceDetailsGetAwardList(params) {
      return await postRequest("awards/detail", params);
    }
  
    export async function serviceCreateAwardCategory(params) {
      return await formDataRequest("awards/category/create", params);
    }
    export async function serviceUpdateAwardCategory(params) {
      return await formDataRequest("awards/category/update", params);
    }
    export async function serviceDeleteAwardCategory(params) {
      return await postRequest("awards/category/delete", params);
    }
    export async function serviceDeleteAwardImages(params) {
      return await postRequest("awards/images/delete", params);
    }
    export async function serviceCreateAwardImage(params) {
      return await formDataRequest("awards/images/create", params);
    }