import store from "../store";
import Constants from "../config/constants";
import {
  serviceCreateSponsporVideo,
  serviceDeleteSponsporVideo,
  serviceGetSponsporVideo,
  serviceUpdateSponsporVideo,
} from "../services/SponsporVideo.service";

export const FETCH_INIT = "FETCH_INIT_ADMIN_USER";
export const FETCHED = "FETCHED_ADMIN_USER";
export const FETCHED_FAIL = "FETCHED_FAIL_ADMIN_USER";
export const FETCHED_FILTER = "FETCHED_FILTER_ADMIN_USER";
export const FETCH_NEXT = "FETCH_NEXT_ADMIN_USER";
export const FILTER = "FILTER_ADMIN_USER";
export const RESET_FILTER = "RESET_FILTER_ADMIN_USER";
export const SET_SORTING = "SET_SORTING_ADMIN_USER";
export const SET_FILTER = "SET_FILTER_ADMIN_USER";
export const SET_PAGE = "SET_PAGE_ADMIN_USER";
export const CHANGE_PAGE = "CHANGE_PAGE_ADMIN_USER";
export const CHANGE_STATUS = "CHANGE_STATE_ADMIN_USER";
export const SET_SERVER_PAGE = "SET_SERVER_PAGE_ADMIN_USER";
export const CREATE_DATA = "CREATE_ADMIN_USER";
export const UPDATE_DATA = "UPDATE_ADMIN_USER";
export const DELETE_ITEM = "DELETE_ADMIN_USER";

export function actionFetchSponsporVideo(
  index = 1,
  sorting = {},
  filter = {},
  shouldReset = false
) {
  const request = serviceGetSponsporVideo({
    index,
    row: sorting.row,
    order: sorting.order,
    ...filter,
  }); // GetAdminUser
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

export function actionCreateSponsporVideo(data) {
  const request = serviceCreateSponsporVideo(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: CREATE_DATA, payload: data.data });
      }
    });
  };
}

export function actionUpdateSponsporVideo(data) {
  const request = serviceUpdateSponsporVideo(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: UPDATE_DATA, payload: data.data });
      }
    });
  };
}

export function actionDeleteSponsporVideo(id) {
  const request = serviceDeleteSponsporVideo({ id: id });
  return (dispatch) => {
    dispatch({ type: DELETE_ITEM, payload: id });
  };
}

export function actionChangePageSponsporVideo(page) {
  return (dispatch) => {
    dispatch({ type: CHANGE_PAGE, payload: page });
  };
}

export function actionFilterSponsporVideo(value) {
  const request = null; ////serviceFetchProviderRequests(value);
  return (dispatch) => {
    dispatch({ type: FETCH_INIT, payload: null });
    request.then((data) => {
      dispatch({ type: FILTER, payload: data });
      dispatch({ type: FETCHED, payload: null });
    });
  };
}

export function actionChangeStatusSponsporVideo(id, status) {
  //const request = serviceUpdateSponsporVideo({ id: params.id, status: params.type});
  return (dispatch) => {
    dispatch({ type: CHANGE_STATUS, payload: { id, status } });
  };
}

export function actionResetFilterSponsporVideo() {
  return {
    type: RESET_FILTER,
    payload: null,
  };
}

export function actionSetPageSponsporVideo(page) {
  const stateData = store.getState().sponspor_video;
  const currentPage = stateData.currentPage;
  const totalLength = stateData.all.length;
  const sortingData = stateData.sorting_data;
  const query = stateData.query;
  const queryData = stateData.query_data;
  const serverPage = stateData.serverPage;

  if (totalLength <= (page + 1) * Constants.DEFAULT_PAGE_VALUE) {
    store.dispatch(
      actionFetchSponsporVideo(serverPage + 1, sortingData, {
        query,
        query_data: queryData,
      })
    );
  }

  return {
    type: CHANGE_PAGE,
    payload: page,
  };
}
