import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  actionCreateMeetingRoomList,
  actionDeleteMeetingRoomList,
  actionFetchMeetingRoomList,
  actionSetPageMeetingRoomList,
  actionUpdateMeetingRoomList,
} from "../../../actions/MeetingRooms.action";
import historyUtils from "../../../libs/history.utils";
import LogUtils from "../../../libs/LogUtils";
import RouteName from "../../../routes/Route.name";
import { useParams } from "react-router-dom";

const useMeetingList = ({ location }) => {
  const locationData = location?.state?.name_data;
  const [isCalling, setIsCalling] = useState(false);
  const [editData, setEditData] = useState(null);
  const params = useParams();
  const [isSidePanel, setSidePanel] = useState(false);

  const dispatch = useDispatch();
  const isMountRef = useRef(false);
  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state.meeting_room);


  useEffect(() => {
    dispatch(
      actionFetchMeetingRoomList(1, params?.id,sortingData, {
        query: isMountRef.current ? query : null,
        query_data: isMountRef.current ? queryData : null,
      })
    );
    isMountRef.current = true;
  }, []);

  const handlePageChange = useCallback((type) => {
    console.log("_handlePageChange", type);
    dispatch(actionSetPageMeetingRoomList(type));
  }, []);

  const handleDataSave = useCallback(
    (data, type) => {
      // this.props.actionChangeStatus({...data, type: type});
      if (type == "CREATE") {
        dispatch(actionCreateMeetingRoomList(data));
      } else {
        dispatch(actionUpdateMeetingRoomList(data));
      }
      setEditData(null);
    },
    [setEditData]
  );

  const queryFilter = useCallback(
    (key, value) => {
      console.log("_queryFilter", key, value);
      dispatch(
        actionFetchMeetingRoomList(1,params?.id, sortingData, {
          query: key == "SEARCH_TEXT" ? value : query,
          query_data: key == "FILTER_DATA" ? value : queryData,
        })
      );
    },
    [sortingData, query, queryData]
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
        actionFetchMeetingRoomList(
          1,
          params?.id,
          { row, order },
          {
            query: query,
            query_data: queryData,
          }
        )
      );
    },
    [query, queryData]
  );

  const handleRowSize = (page) => {
    console.log(page);
  };

  const handleDelete = useCallback(
    (id) => {
      dispatch(actionDeleteMeetingRoomList(id));
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

  const handleViewDetails = useCallback((data) => {
    historyUtils.push(`${RouteName.EVENT_HIGHLIGHTS_UPDATE}/${data?.id}`,{
      eventId:params?.id
    });
  }, []);

  const handleUpdate = useCallback((data) => {
    historyUtils.push(`${RouteName.MEETINGS_DETAIL}${data?.id}`,{
      eventId:params?.id
    });
  }, []);

  const handleCreateFed = useCallback((data) => {
    historyUtils.push(`${RouteName.EVENT_HIGHLIGHTS_CREATE}`,{
     eventId:params?.id,
    });
  }, []);

  const configFilter = useMemo(() => {
    return [
      {
        label: "Status",
        name: "status",
        type: "select",
        fields: ["ACTIVE", "INACTIVE"],
      },
    ];
  }, []);

  const handleToggleSidePannel = useCallback(
    (data) => {
      setSidePanel((e) => !e);
      setEditData(data?.id);
    },
    [setSidePanel, setEditData]
  );

  return {
    handlePageChange,
    handleDataSave,
    handleFilterDataChange,
    handleSearchValueChange,
    handleRowSize,
    handleSortOrderChange,
    handleDelete,
    handleEdit,
    handleViewDetails,
    isCalling,
    editData,
    configFilter,
    handleCreateFed,
    handleUpdate,
    locationData,
    isSidePanel,
    handleToggleSidePannel,
  };
};

export default useMeetingList;
