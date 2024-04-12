import store from "../store";
import Constants from "../config/constants";

import EventEmitter from "../libs/Events.utils";
import { serviceCreateSplashScreen, serviceDeleteSplashScreen, serviceGetSplashScreen, serviceUpdateSplashScreen } from "../services/SplashScreen.service";

export const FETCH_INIT = "FETCH_INIT_SPLASH_SCREEN";
export const FETCHED = "FETCHED_SPLASH_SCREEN";
export const FETCHED_FAIL = "FETCHED_FAIL_SPLASH_SCREEN";
export const FETCHED_FILTER = "FETCHED_FILTER_SPLASH_SCREEN";
export const FETCH_NEXT = "FETCH_NEXT_SPLASH_SCREEN";
export const FILTER = "FILTER_SPLASH_SCREEN";
export const RESET_FILTER = "RESET_FILTER_SPLASH_SCREEN";
export const SET_SORTING = "SET_SORTING_SPLASH_SCREEN";
export const SET_FILTER = "SET_FILTER_SPLASH_SCREEN";
export const SET_PAGE = "SET_PAGE_SPLASH_SCREEN";
export const CHANGE_PAGE = "CHANGE_PAGE_SPLASH_SCREEN";
export const CHANGE_STATUS = "CHANGE_STATE_SPLASH_SCREEN";
export const SET_SERVER_PAGE = "SET_SERVER_PAGE_SPLASH_SCREEN";
export const CREATE_DATA = "CREATE_SPLASH_SCREEN";
export const UPDATE_DATA = "UPDATE_SPLASH_SCREEN";
export const DELETE_ITEM = "DELETE_SPLASH_SCREEN";

export function actionFetchSplashScreen(index = 1, sorting = {}, filter = {}) {
  const request = serviceGetSplashScreen({
    index,
    row: sorting.row,
    order: sorting.order,
    ...filter,
  });
  return (dispatch) => {
    dispatch({ type: FETCH_INIT, payload: null });
    request.then((data) => {
      dispatch({ type: SET_FILTER, payload: filter });
      dispatch({ type: SET_SORTING, payload: sorting });
      if (!data.error) {
        dispatch({ type: FETCHED, payload: { data: data.data, page: index } });
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

export function actionCreateSplashScreen(data) {
  const request = serviceCreateSplashScreen(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        EventEmitter.dispatch(EventEmitter.THROW_ERROR, {
          error: "Saved",
          type: "success",
        });
        dispatch({ type: CREATE_DATA, payload: data.data });
      }
    });
  };
}

export function actionUpdateSplashScreen(data) {
  const request = serviceUpdateSplashScreen(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: UPDATE_DATA, payload: data.data });
      }
    });
  };
}

export function actionDeleteSplashScreen(id) {
  const request = serviceDeleteSplashScreen({ id: id });
  return (dispatch) => {
    dispatch({ type: DELETE_ITEM, payload: id });
  };
}

export function actionChangePageSplashScreen(page) {
  return (dispatch) => {
    dispatch({ type: CHANGE_PAGE, payload: page });
  };
}

export function actionFilterSplashScreen(value) {
  const request = null; ////serviceFetchProviderRequests(value);
  return (dispatch) => {
    dispatch({ type: FETCH_INIT, payload: null });
    request.then((data) => {
      dispatch({ type: FILTER, payload: data });
      dispatch({ type: FETCHED, payload: null }); //dispatch function
    });
  };
}

export function actionChangeStatusSplashScreen(id, status) {
  return (dispatch) => {
    dispatch({ type: CHANGE_STATUS, payload: { id, status } });
  };
}

export function actionResetFilterSplashScreen() {
  return {
    type: RESET_FILTER,
    payload: null,
  };
}

export function actionSetPageSplashScreen(page) {
  const stateData = store.getState().SplashScreen;
  const currentPage = stateData.currentPage;
  const totalLength = stateData.all.length;
  const sortingData = stateData.sorting_data;
  const query = stateData.query;
  const queryData = stateData.query_data;
  const serverPage = stateData.serverPage;

  if (totalLength <= (page + 1) * Constants.DEFAULT_PAGE_VALUE) {
    store.dispatch(
      actionFetchSplashScreen(serverPage + 1, sortingData, {
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
