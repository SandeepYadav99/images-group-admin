import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import historyUtils from "../../../libs/history.utils";
import LogUtils from "../../../libs/LogUtils";
import RouteName from "../../../routes/Route.name";
import { serviceGetList } from "../../../services/index.services";
import { useParams } from "react-router";
import {
  serviceEventFeatured,

} from "../../../services/EventSpeaker.service";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import { actionCreateMeetingCallendarList, actionFetchMeetingCallendarList, actionSetPageMeetingCallendarList } from "../../../actions/MeetingsCalendar.action";

const useMeetingsCalendarHook = ({}) => {
  const [isCalling, setIsCalling] = useState(false);
  const [isSidePanel, setSidePanel] = useState(false);
  const [editData, setEditData] = useState(null);
  const [listData, setListData] = useState({
    LOCATIONS: [],
  });
  const { id } = useParams();
  const dispatch = useDispatch();
  const isMountRef = useRef(false);

  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state.meeting_callendar);

  useEffect(() => {
    dispatch(
      actionFetchMeetingCallendarList(1, sortingData, {
        query: isMountRef.current ? query : null,
        query_data: isMountRef.current ? queryData : null,
         event_id: id,
      })
    );
    isMountRef.current = true;
  }, [id]);

  useEffect(() => {
    serviceGetList(["LOCATIONS"]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);

  const handlePageChange = useCallback((type) => {
    console.log("_handlePageChange", type);
    dispatch(actionSetPageMeetingCallendarList(type));
  }, []);

  const handleDataSave = useCallback(
    (data, type) => {
      // this.props.actionChangeStatus({...data, type: type});
      if (type == "CREATE") {
        dispatch(actionCreateMeetingCallendarList(data));
      }
      //  else {
      //   dispatch(actionUpdateEventSpeakerMaster(data));
      // }
      setEditData(null);
    },
    [setEditData]
  );

  const queryFilter = useCallback(
    (key, value) => {
      console.log("_queryFilter", key, value);
      // dispatch(actionSetPageEventSpeakerRequests(1));
      dispatch(
        actionFetchMeetingCallendarList(1, sortingData, {
          query: key == "SEARCH_TEXT" ? value : query,
          query_data: key == "FILTER_DATA" ? value : queryData,
          event_id: id,
        })
      );
    },
    [sortingData, query, queryData, id]
  );

  const handleFilterDataChange = useCallback(
    (value) => {
      console.log("_handleFilterDataChange", value);
      queryFilter("FILTER_DATA", value);
    },
    [queryFilter]
  );

  const handleSearchValueChange = useCallback(
    (value) => {
      console.log("_handleSearchValueChange", value);
      queryFilter("SEARCH_TEXT", value);
    },
    [queryFilter]
  );

  const handleSortOrderChange = useCallback(
    (row, order) => {

      dispatch(
        actionFetchMeetingCallendarList(
          1,
          { row, order },
          {
            query: query,
            query_data: queryData,
            event_id: id,
          }
        )
      );
    },
    [query, queryData, id]
  );

  const handleRowSize = (page) => {
    console.log(page);
  };

  const handleDelete = useCallback(
    (id) => {
      // dispatch(actionDeleteEventSpeakerMaster(id));
      setEditData(null);
    },
    [setEditData]
  );

  const handleEdit = useCallback(
    (data) => {
      setEditData(data);
    },
    [setEditData]
  );

  const handleToggle_Edit_SidePannel = useCallback((data) => {
    LogUtils.log("data", data);
    historyUtils.push(`${RouteName.EVENTS_SPEAKERS_LIST}`); //+data.id
  }, []);

  const handleCreateFed = useCallback(
    (data) => {
      LogUtils.log("data", data);
      historyUtils.push(`${RouteName.SPEAKERS_MASTER_CREATE}`);
    },
    [id]
  );

  const handleUpdateFed = useCallback(
    (data) => {
      LogUtils.log("data", data);
      historyUtils.push(`${RouteName.SPEAKERS_MASTER_UPDATE}${data?.id}`);
    },
    [id]
  );

  const toggleFeatured = useCallback((data) => {
    const isCurrentlyFeatured = data?.is_featured;
    const newFeaturedStatus = !isCurrentlyFeatured;

    const updatedData = {
      id: data?.id,
      event_id: id,
      is_featured: newFeaturedStatus,
    };

    serviceEventFeatured(updatedData)
      .then((res) => {
        if (!res.error) {
          window.location.reload()
        } else {
          SnackbarUtils.error(res?.message);
        }
      });
  }, [dispatch, id, query, queryData]);


 
  const handleToggleSidePannel = useCallback(
    (data) => {
      setSidePanel((e) => !e);
      setEditData(data?.id);
    },
    [setSidePanel, setEditData]
  );

  const configFilter = useMemo(() => {
    return [
      {
        label: "Status",
        name: "status",
        type: "select",
        fields: ["BLOCKED", "BOOKED","AVAILABLE","UNAVAILABLE"],
      },
    ];
  }, [listData]);

  return {
    handlePageChange,
    handleDataSave,
    handleFilterDataChange,
    handleSearchValueChange,
    handleRowSize,
    handleSortOrderChange,
    handleDelete,
    handleEdit,
    isCalling,
    editData,
    configFilter,
    handleCreateFed,
    handleToggle_Edit_SidePannel,
    handleUpdateFed,
    toggleFeatured,
    handleToggleSidePannel,
    isSidePanel
  };
};

export default useMeetingsCalendarHook;
