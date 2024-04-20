import store from "../store";
import Constants from "../config/constants";

import EventEmitter from "../libs/Events.utils";
import { serviceCreateAward, serviceDeleteAward, serviceGetAward, serviceUpdateAward } from "../services/Award.servcice";

export const FETCH_INIT = "FETCH_INIT_AWARD";
export const FETCHED = "FETCHED_AWARD";
export const FETCHED_FAIL = "FETCHED_FAIL_AWARD";
export const FETCHED_FILTER = "FETCHED_FILTER_AWARD";
export const FETCH_NEXT = "FETCH_NEXT_AWARD";
export const FILTER = "FILTER_AWARD";
export const RESET_FILTER = "RESET_FILTER_AWARD";
export const SET_SORTING = "SET_SORTING_AWARD";
export const SET_FILTER = "SET_FILTER_AWARD";
export const SET_PAGE = "SET_PAGE_AWARD";
export const CHANGE_PAGE = "CHANGE_PAGE_AWARD";
export const CHANGE_STATUS = "CHANGE_STATE_AWARD";
export const SET_SERVER_PAGE = "SET_SERVER_PAGE_AWARD";
export const CREATE_DATA = "CREATE_AWARD";
export const UPDATE_DATA = "UPDATE_AWARD";
export const DELETE_ITEM = "DELETE_AWARD";

export function actionFetchAward(index = 1, sorting = {}, filter = {}) {
  const request = serviceGetAward({
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

export function actionCreateAward(data) {
  const request = serviceCreateAward(data);
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

export function actionUpdateAward(data) {
  const request = serviceUpdateAward(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: UPDATE_DATA, payload: data.data });
      }
    });
  };
}

export function actionDeleteAward(id) {
  const request = serviceDeleteAward({ id: id });
  return (dispatch) => {
    dispatch({ type: DELETE_ITEM, payload: id });
  };
}

export function actionChangePageAward(page) {
  return (dispatch) => {
    dispatch({ type: CHANGE_PAGE, payload: page });
  };
}

export function actionFilterAward(value) {
  const request = null; ////serviceFetchProviderRequests(value);
  return (dispatch) => {
    dispatch({ type: FETCH_INIT, payload: null });
    request.then((data) => {
      dispatch({ type: FILTER, payload: data });
      dispatch({ type: FETCHED, payload: null }); //dispatch function
    });
  };
}

export function actionChangeStatusAward(id, status) {
  return (dispatch) => {
    dispatch({ type: CHANGE_STATUS, payload: { id, status } });
  };
}

export function actionResetFilterAward() {
  return {
    type: RESET_FILTER,
    payload: null,
  };
}

export function actionSetPageAward(page) {
  const stateData = store.getState().award;
  const currentPage = stateData.currentPage;
  const totalLength = stateData.all.length;
  const sortingData = stateData.sorting_data;
  const query = stateData.query;
  const queryData = stateData.query_data;
  const serverPage = stateData.serverPage;

  if (totalLength <= (page + 1) * Constants.DEFAULT_PAGE_VALUE) {
    store.dispatch(
      actionFetchAward(serverPage + 1, sortingData, {
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
