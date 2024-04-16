import { formDataRequest, postRequest } from "../libs/AxiosService.util";

export async function serviceGetMenuGraphic(params) {
    return await postRequest("events/manu/graphic", params);
}

export async function serviceCreateMenuGraphic(params) {
    return await formDataRequest("events/manu/graphic/create", params);
}

export async function serviceUpdateMenuGraphic(params) {
    return await formDataRequest("events/manu/graphic/update", params);
}

export async function serviceGetMenuGraphicDetails(params) {
    return await postRequest("events/manu/graphic/detail", params);
}

export async function serviceDeleteMenuGraphic(params) {
    return await postRequest("events/manu/graphic/delete", params);
}



export async function serviceDeleteMenuGraphicFeaturesList(params) {
    return await postRequest("events/manu/graphic/feature", params);
}