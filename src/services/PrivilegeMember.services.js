import {
    formDataRequest,
    getRequest,
    postRequest,
  } from "../libs/AxiosService.util";
  
  export async function serviceCreateMembership(params) {
    return await formDataRequest("events/privilaged/member/create", params);
  }
  export async function serviceUpdateMembership(params) {
    return await formDataRequest("events/privilaged/member/update", params);
  }
  export async function serviceDeleteMembership(params) {
    return await postRequest("awards/delete", params);
  }
  export async function serviceGetMembershipDetails(params) {
    return await postRequest("events/privilaged/member/detail", params);
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

    /*  Member Category Starts */
  
    export async function serviceCreateMemberCategory(params) {
      return await postRequest("events/privilaged/member/category/create", params);
    }
    export async function serviceUpdateMemberCategory(params) {
      return await postRequest("events/privilaged/member/category/update", params);
    }
    export async function serviceDeleteMemberCategory(params) {
      return await postRequest("events/privilaged/member/category/delete", params);
    }

  /*Delete Award Images */
    export async function serviceDeleteAwardMemberImages(params) {
      return await postRequest("events/privilaged/member/board/delete", params);
    }
    export async function serviceCreateAwardMemberImage(params) {
      return await formDataRequest("events/privilaged/member/board/create", params);
    }
    
    