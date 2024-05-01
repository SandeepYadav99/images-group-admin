import { formDataRequest, formDataRequestCustom, postRequest } from "../libs/AxiosService.util";


export async function serviceCreateExhibitors(params) {
  return await formDataRequest("exhibitors/creates", params);
}
export async function serviceUpdateExhibitors(params) {
  return await formDataRequest("exhibitors/update", params);
}

export async function serviceUpdateFileUpdate(params) {
  // console.log({type})
  return await formDataRequest("files/upload", params);
}
export async function serviceGetExhibitorsDetails(params) {
  return await postRequest("exhibitors/detail", params);
}
export async function serviceGetExhibitors(params) {
  return await postRequest("exhibitors", params);
}
export async function serviceDeleteExhibitors(params) {
  return await postRequest("exhibitors", params);
}

export async  function serviceExhibitorsList(params) {
  return await postRequest("list", params);
}

export async function serviceGetProductList(){
  return await postRequest("product/group/tages")
}

export async function debounceValidationList(params){
  return await postRequest("users/exists",params)
}

export async function servicesPartnerTypeList(params){
  return await postRequest("list",params)
}



