import store from "../store";
import Constants from "../config/constants";

import EventEmitter from "../libs/Events.utils";
import { serviceCreateEventSpeakerMaster, serviceDeleteEventSpeakerMaster, serviceGetEventSpeakerMaster, serviceUpdateEventSpeakerMaster } from "../services/SpeakerMaster.service";

export const FETCH_INIT = "FETCH_INIT_SPEAKER_MASTER";
export const FETCHED = "FETCHED_SPEAKER_MASTER";
export const FETCHED_FAIL = "FETCHED_FAIL_SPEAKER_MASTER";
export const FETCHED_FILTER = "FETCHED_FILTER_SPEAKER_MASTER";
export const FETCH_NEXT = "FETCH_NEXT_SPEAKER_MASTER";
export const FILTER = "FILTER_SPEAKER_MASTER";
export const RESET_FILTER = "RESET_FILTER_SPEAKER_MASTER";
export const SET_SORTING = "SET_SORTING_SPEAKER_MASTER";
export const SET_FILTER = "SET_FILTER_SPEAKER_MASTER";
export const SET_PAGE = "SET_PAGE_SPEAKER_MASTER";
export const CHANGE_PAGE = "CHANGE_PAGE_SPEAKER_MASTER";
export const CHANGE_STATUS = "CHANGE_STATE_SPEAKER_MASTER";
export const SET_SERVER_PAGE = "SET_SERVER_PAGE_SPEAKER_MASTER";
export const CREATE_DATA = "CREATE_SPEAKER_MASTER";
export const UPDATE_DATA = "UPDATE_SPEAKER_MASTER";
export const DELETE_ITEM = "DELETE_SPEAKER_MASTER";

export function actionFetchEventSpeakerMaster(index = 1, sorting = {}, filter = {}) {
  const request = serviceGetEventSpeakerMaster({
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

export function actionCreateEventSpeakerMaster(data) {
  const request = serviceCreateEventSpeakerMaster(data);
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

export function actionUpdateEventSpeakerMaster(data) {
  const request = serviceUpdateEventSpeakerMaster(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: UPDATE_DATA, payload: data.data });
      }
    });
  };
}

export function actionDeleteEventSpeakerMaster(id) {
  const request = serviceDeleteEventSpeakerMaster({ id: id });
  return (dispatch) => {
    dispatch({ type: DELETE_ITEM, payload: id });
  };
}

export function actionChangePageEventSpeakerMaster(page) {
  return (dispatch) => {
    dispatch({ type: CHANGE_PAGE, payload: page });
  };
}

export function actionFilterEventSpeakerMaster(value) {
  const request = null; ////serviceFetchProviderRequests(value);
  return (dispatch) => {
    dispatch({ type: FETCH_INIT, payload: null });
    request.then((data) => {
      dispatch({ type: FILTER, payload: data });
      dispatch({ type: FETCHED, payload: null }); //dispatch function
    });
  };
}

export function actionChangeStatusEventSpeakerMaster(id, status) {
  return (dispatch) => {
    dispatch({ type: CHANGE_STATUS, payload: { id, status } });
  };
}

export function actionResetFilterEventSpeakerMaster() {
  return {
    type: RESET_FILTER,
    payload: null,
  };
}

export function actionSetPageEventSpeakerMaster(page) {
  const stateData = store.getState().SpeakerMaster;
  const currentPage = stateData.currentPage;
  const totalLength = stateData.all.length;
  const sortingData = stateData.sorting_data;
  const query = stateData.query;
  const queryData = stateData.query_data;
  const serverPage = stateData.serverPage;

  if (totalLength <= (page + 1) * Constants.DEFAULT_PAGE_VALUE) {
    store.dispatch(
      actionFetchEventSpeakerMaster(serverPage + 1, sortingData, {
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
