import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import historyUtils from "../../../libs/history.utils";
import LogUtils from "../../../libs/LogUtils";
import RouteName from "../../../routes/Route.name";
import { serviceGetList } from "../../../services/index.services";
import { useParams } from "react-router";
import { actionCreateInfoCenterList, actionDeleteInfoCenterList, actionFetchInfoCenterList, actionSetPageInfoCenterList, actionUpdateInfoCenterList } from "../../../actions/InfoCenter.action";
import { serviceGetEventListDetails } from "../../../services/EventList.service";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import { EventData } from "../../../helper/helper";
import { serviceGetPendingEventListDetails } from "../../../services/PendingEventList.service";

const useMenuGraphicHook = ({}) => {
  const [isCalling, setIsCalling] = useState(false);
  const [editData, setEditData] = useState(null);
  const [listData, setListData] = useState({
    LOCATIONS: [],
  });
  const [featureList, setFeatureList] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const isMountRef = useRef(false);
  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state.InfoCenter);


  useEffect(() => {
    dispatch(
      actionFetchInfoCenterList(1, sortingData, {
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
   
    dispatch(actionSetPageInfoCenterList(type));
  }, []);


  const queryFilter = useCallback(
    (key, value) => {
     
      // dispatch(actionSetPageEventSpeakerRequests(1));
      dispatch(
        actionFetchInfoCenterList(1, sortingData, {
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
      console.log(`handleSortOrderChange key:${row} order: ${order}`);
      dispatch(
        actionFetchInfoCenterList(
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
      dispatch(actionDeleteInfoCenterList(id));
      setEditData(null);
    },
    [setEditData]
  );

 

  const handleEditFed = useCallback((data) => {
    // LogUtils.log("data", data);
    // historyUtils.push(`${RouteName.EVENTS_SPEAKERS_LIST}`); //+data.id
  }, []);

  const handleCreateFed = useCallback(
    (data) => {
      LogUtils.log("data", data);
      historyUtils.push(`${RouteName.MENU_GRAPHIC_CREATE}`);
      // , {event_id:id}
    },
    [id]
  );

  const handleViewUpdate = useCallback((data) => {
  
    historyUtils.push(`${RouteName.INFOR_CENTER_UPDATE}${data?.id}`,{event_id:id}); //+data.id
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
  }, [listData]);

  return {
    handlePageChange,
   
    handleFilterDataChange,
    handleSearchValueChange,
    handleRowSize,
    handleSortOrderChange,
    handleDelete,
  
    isCalling,
    editData,
    configFilter,
    handleCreateFed,
    handleEditFed,
    handleViewUpdate,
   
  };
};

export default useMenuGraphicHook;
