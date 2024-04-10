import {
    formDataRequest,
    getRequest,
    postRequest,
  } from "../libs/AxiosService.util";
  
  export async function serviceCreateSplashScreen(params) {
    return await formDataRequest("splash/screen/create", params);
  }
  export async function serviceUpdateSplashScreen(params) {
    return await formDataRequest("splash/screen/update", params);
  }
  export async function serviceDeleteSplashScreen(params) {
    return await postRequest("splash/screen/delete", params);
  }
  export async function serviceGetSplashScreenDetails(params) {
    return await postRequest("splash/screen/detail", params);
  }
  export async function serviceGetSplashScreen(params) {
    return await postRequest("splash/screen", params);
  }
  export async function serviceDetailsSplashScreen(params) {
    return await postRequest("splash/screen/detail", params);
  }
  export async function serviceDetailSplashScreen(params) {
      return await postRequest("splash/screen/detail", params);
    }
  