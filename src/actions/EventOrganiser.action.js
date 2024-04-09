import store from "../store";
import Constants from "../config/constants";
import {
    serviceCreateEventOrganiser,
    serviceDeleteEventOrganiser,
    serviceGetEventOrganiser,
    serviceUpdateEventOrganiser,
} from "../services/EventOrganiser.service";
import LogUtils from "../libs/LogUtils";

export const FETCH_INIT = "FETCH_INIT_EVENT_ORGANISER";
export const FETCHED = "FETCHED_EVENT_ORGANISER";
export const FETCHED_FAIL = "FETCHED_FAIL_EVENT_ORGANISER";
export const FETCHED_FILTER = "FETCHED_FILTER_EVENT_ORGANISER";
export const FETCH_NEXT = "FETCH_NEXT_EVENT_ORGANISER";
export const FILTER = "FILTER_EVENT_ORGANISER";
export const RESET_FILTER = "RESET_FILTER_EVENT_ORGANISER";
export const SET_SORTING = "SET_SORTING_EVENT_ORGANISER";
export const SET_FILTER = "SET_FILTER_EVENT_ORGANISER";
export const SET_PAGE = "SET_PAGE_EVENT_ORGANISER";
export const CHANGE_PAGE = "CHANGE_PAGE_EVENT_ORGANISER";
export const CHANGE_STATUS = "CHANGE_STATE_EVENT_ORGANISER";
export const SET_SERVER_PAGE = "SET_SERVER_PAGE_EVENT_ORGANISER";
export const CREATE_DATA = "CREATE_EVENT_ORGANISER";
export const UPDATE_DATA = "UPDATE_EVENT_ORGANISER";
export const DELETE_ITEM = "DELETE_EVENT_ORGANISER";

export function actionFetchEventOrganiser(
    index = 1,
    sorting = {},
    filter = {},
    shouldReset = false,

) {
    const request = serviceGetEventOrganiser({
        index,
        row: sorting.row,
        order: sorting.order,
        ...filter,
    }); // GetEventOrganiser
    return (dispatch) => {
        if (shouldReset) {
            dispatch({
                type: CHANGE_PAGE,
                payload: 1,
            });
        }
        dispatch({ type: FETCH_INIT, payload: null });
        request.then((data) => {
            dispatch({ type: SET_FILTER, payload: filter });
            dispatch({ type: SET_SORTING, payload: sorting });
            if (!data.error) {
                dispatch({ type: FETCHED, payload: { data: data?.data, page: index } });
                dispatch({ type: SET_SERVER_PAGE, payload: index });
                if (index == 1) {
                    dispatch({ type: CHANGE_PAGE, payload: index - 1 });
                }
            } else {
                dispatch({ type: FETCHED_FAIL, payload: null });
            }
        });
    };
}

export function actionCreateEventOrganiser(data) {
    LogUtils.log('data', data);
    return (dispatch) => {
        dispatch({ type: CREATE_DATA, payload: data });
    };
}

export function actionUpdateEventOrganiser(data) {
    return (dispatch) => {
        dispatch({ type: UPDATE_DATA, payload: data });
    };
}

export function actionDeleteEventOrganiser(id) {
    const request = serviceDeleteEventOrganiser({ id: id });
    return (dispatch) => {
        dispatch({ type: DELETE_ITEM, payload: id });
    };
}

export function actionChangePageEventOrganiser(page) {
    return (dispatch) => {
        dispatch({ type: CHANGE_PAGE, payload: page });
    };
}

export function actionFilterEventOrganiser(value) {
    const request = null; ////serviceFetchProviderRequests(value);
    return (dispatch) => {
        dispatch({ type: FETCH_INIT, payload: null });
        request.then((data) => {
            dispatch({ type: FILTER, payload: data });
            dispatch({ type: FETCHED, payload: null });
        });
    };
}

export function actionChangeStatusEventOrganiser(id, status) {
    //const request = serviceUpdateEventOrganiser({ id: params.id, status: params.type});
    return (dispatch) => {
        dispatch({ type: CHANGE_STATUS, payload: { id, status } });
    };
}

export function actionResetFilterEventOrganiser() {
    return {
        type: RESET_FILTER,
        payload: null,
    };
}

export function actionSetPageEventOrganiser(page) {
    const stateData = store.getState().eventOrganiser;
    const currentPage = stateData.currentPage;
    const totalLength = stateData.all.length;
    const sortingData = stateData.sorting_data;
    const query = stateData.query;
    const queryData = stateData.query_data;
    const serverPage = stateData.serverPage;

    if (totalLength <= (page + 1) * Constants.DEFAULT_PAGE_VALUE) {
        store.dispatch(
            actionFetchEventOrganiser(serverPage + 1, sortingData, {
                query,
                query_data: queryData,
            })
        );
    }

    console.log(currentPage, totalLength);
    return {
        type: CHANGE_PAGE,
        payload: page,
    };
}
