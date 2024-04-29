import store from "../store";
import Constants from "../config/constants";

import { serviceCreateEventParticipants } from "../services/AsociateEvent.service";

export const FETCH_INIT = "FETCH_INIT_ASOCIATE_EVENT";
export const FETCHED = "FETCHED_ASOCIATE_EVENT";
export const FETCHED_FAIL = "FETCHED_FAIL_ASOCIATE_EVENT";
export const FETCHED_FILTER = "FETCHED_FILTER_ASOCIATE_EVENT";
export const FETCH_NEXT = "FETCH_NEXT_ASOCIATE_EVENT";
export const FILTER = "FILTER_ASOCIATE_EVENT";
export const RESET_FILTER = "RESET_FILTER_ASOCIATE_EVENT";
export const SET_SORTING = "SET_SORTING_ASOCIATE_EVENT";
export const SET_FILTER = "SET_FILTER_ASOCIATE_EVENT";
export const SET_PAGE = "SET_PAGE_ASOCIATE_EVENT";
export const CHANGE_PAGE = "CHANGE_PAGE_ASOCIATE_EVENT";
export const CHANGE_STATUS = "CHANGE_STATE_ASOCIATE_EVENT";
export const SET_SERVER_PAGE = "SET_SERVER_PAGE_ASOCIATE_EVENT";
export const CREATE_DATA = "CREATE_ASOCIATE_EVENT";
export const UPDATE_DATA = "UPDATE_ASOCIATE_EVENT";
export const DELETE_ITEM = "DELETE_ASOCIATE_EVENT";

export function actionFetchAsociateEvent(
  index = 1,
  sorting = {},
  filter = {},
  shouldReset = false
) {
  const request = serviceCreateEventParticipants({
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
        dispatch({
          type: FETCHED,
          payload: {
            data: data?.data?.eventData,
            page: index,
          },
        });
        // console.log(data?.data?.UserData?.reg_id,"hello it is here");
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
// export function actionCreateAsociateEvent(data) {
//   const request = serviceCreateAsociateEvent(data);
//   return (dispatch) => {
//     request.then((data) => {
//       if (!data.error) {
//         EventEmitter.dispatch(EventEmitter.THROW_ERROR, {
//           error: "Saved",
//           type: "success",
//         });
//         dispatch({ type: CREATE_DATA, payload: data.data });
//       }
//     });
//   };
// }

// export function actionUpdateAsociateEvent(data) {
//   const request = serviceUpdateAsociateEvent(data);
//   return (dispatch) => {
//     request.then((data) => {
//       if (!data.error) {
//         dispatch({ type: UPDATE_DATA, payload: data.data });
//       }
//     });
//   };
// }

// export function actionDeleteAsociateEvent(id) {
//   const request = serviceDeleteAsociateEvent({ id: id });
//   return (dispatch) => {
//     dispatch({ type: DELETE_ITEM, payload: id });
//   };
// }

export function actionChangePageAsociateEvent(page) {
  return (dispatch) => {
    dispatch({ type: CHANGE_PAGE, payload: page });
  };
}

export function actionFilterAsociateEvent(value) {
  const request = null; ////serviceFetchProviderRequests(value);
  return (dispatch) => {
    dispatch({ type: FETCH_INIT, payload: null });
    request.then((data) => {
      dispatch({ type: FILTER, payload: data });
      dispatch({ type: FETCHED, payload: null }); //dispatch function
    });
  };
}

export function actionChangeStatusAsociateEvent(id, status) {
  return (dispatch) => {
    dispatch({ type: CHANGE_STATUS, payload: { id, status } });
  };
}

export function actionResetFilterAsociateEvent() {
  return {
    type: RESET_FILTER,
    payload: null,
  };
}

export function actionSetPageAsociateEvent(page) {
  const stateData = store.getState().associateEvent;
  const currentPage = stateData.currentPage;
  const totalLength = stateData.all.length;
  const sortingData = stateData.sorting_data;
  const query = stateData.query;
  const queryData = stateData.query_data;
  const serverPage = stateData.serverPage;

  if (totalLength <= (page + 1) * Constants.DEFAULT_PAGE_VALUE) {
    store.dispatch(
      actionFetchAsociateEvent(serverPage + 1, sortingData, {
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
