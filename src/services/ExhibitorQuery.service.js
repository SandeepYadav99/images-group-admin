import { postRequest } from "../libs/AxiosService.util";

export async function serviceGetExhibitorsQuery(params) {
    return await postRequest("exhibitors/queries", params);
}

export async function serviceDownloadExhibitorQuery(params){
    return await postRequest("exhibitors/queries/export", params);
}