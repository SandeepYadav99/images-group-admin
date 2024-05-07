import store from "../store";
import Constants from "../config/constants";
import { serviceCreateCustomParticipantType, serviceGetCustomParticipantType, serviceUpdateCustomParticipantType } from "../services/ParticipantType.service";

export const FETCH_INIT = "FETCH_INIT_CUSTOM_PARTICIPANT";
export const FETCHED = "FETCHED_CUSTOM_PARTICIPANT";
export const FETCHED_FAIL = "FETCHED_FAIL_CUSTOM_PARTICIPANT";
export const FETCHED_FILTER = "FETCHED_FILTER_CUSTOM_PARTICIPANT";
export const FETCH_NEXT = "FETCH_NEXT_CUSTOM_PARTICIPANT";
export const FILTER = "FILTER_CUSTOM_PARTICIPANT";
export const RESET_FILTER = "RESET_FILTER_CUSTOM_PARTICIPANT";
export const SET_SORTING = "SET_SORTING_CUSTOM_PARTICIPANT";
export const SET_FILTER = "SET_FILTER_CUSTOM_PARTICIPANT";
export const SET_PAGE = "SET_PAGE_CUSTOM_PARTICIPANT";
export const CHANGE_PAGE = "CHANGE_PAGE_CUSTOM_PARTICIPANT";
export const CHANGE_STATUS = "CHANGE_STATE_CUSTOM_PARTICIPANT";
export const SET_SERVER_PAGE = "SET_SERVER_PAGE_CUSTOM_PARTICIPANT";
export const CREATE_DATA = "CREATE_CUSTOM_PARTICIPANT";
export const UPDATE_DATA = "UPDATE_CUSTOM_PARTICIPANT";
export const DELETE_ITEM = "DELETE_CUSTOM_PARTICIPANT";

export function actionFetchCustomParticipantType(
  index = 1,
  sorting = {},
  filter = {},
  shouldReset = false
) {
  const request = serviceGetCustomParticipantType({
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

export function actionCreatePolicyList(data) {
  const request = serviceCreateCustomParticipantType(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: CREATE_DATA, payload: data.data });
      }
    });
  };
}

export function actionUpdatePolicyList(data) {
  const request = serviceUpdateCustomParticipantType(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: UPDATE_DATA, payload: data.data });
      }
    });
  };
}

export function actionDeletePolicyList(id) {
  // const request = serviceDeletePolicyList({ id: id });
  // return (dispatch) => {
  //   dispatch({ type: DELETE_ITEM, payload: id });
  // };
}

export function actionChangePageAdminUser(page) {
  return (dispatch) => {
    dispatch({ type: CHANGE_PAGE, payload: page });
  };
}

export function actionFilterCustomParticipantType(value) {
  const request = null; ////serviceFetchProviderRequests(value);
  return (dispatch) => {
    dispatch({ type: FETCH_INIT, payload: null });
    request.then((data) => {
      dispatch({ type: FILTER, payload: data });
      dispatch({ type: FETCHED, payload: null });
    });
  };
}

export function actionChangeStatusCustomParticipantType(id, status) {
  //const request = serviceUpdateAdminUser({ id: params.id, status: params.type});
  return (dispatch) => {
    dispatch({ type: CHANGE_STATUS, payload: { id, status } });
  };
}

export function actionResetFilterCustomParticipantType() {
  return {
    type: RESET_FILTER,
    payload: null,
  };
}

export function actionSetPageCustomParticipantType(page) {
  const stateData = store.getState().participant_type;
  const currentPage = stateData.currentPage;
  const totalLength = stateData.all.length;
  const sortingData = stateData.sorting_data;
  const query = stateData.query;
  const queryData = stateData.query_data;
  const serverPage = stateData.serverPage;

  if (totalLength <= (page + 1) * Constants.DEFAULT_PAGE_VALUE) {
    store.dispatch(
      actionFetchCustomParticipantType(serverPage + 1, sortingData, {
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
