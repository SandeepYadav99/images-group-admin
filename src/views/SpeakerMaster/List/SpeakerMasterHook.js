import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  actionCreateEventSpeaker,
  actionDeleteEventSpeaker,
  actionFetchEventSpeaker,
  actionSetPageEventSpeaker,
  actionUpdateEventSpeaker,
} from "../../../actions/EventSpeaker.action";
import historyUtils from "../../../libs/history.utils";
import LogUtils from "../../../libs/LogUtils";
import RouteName from "../../../routes/Route.name";
import { serviceGetList } from "../../../services/index.services";
import { useParams } from "react-router";
import {
  serviceDeleteSpaekers,
  serviceEventFeatured,

} from "../../../services/EventSpeaker.service";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import { actionCreateEventSpeakerMaster, actionDeleteEventSpeakerMaster, actionFetchEventSpeakerMaster, actionSetPageEventSpeakerMaster, actionUpdateEventSpeakerMaster } from "../../../actions/SpeakerMaster.action";

const useSpeakerMasterListHook = ({}) => {
  const [isCalling, setIsCalling] = useState(false);
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
  } = useSelector((state) => state.SpeakerMaster);

  useEffect(() => {
    dispatch(
      actionFetchEventSpeakerMaster(1, sortingData, {
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
    dispatch(actionSetPageEventSpeakerMaster(type));
  }, []);

  const handleDataSave = useCallback(
    (data, type) => {
      // this.props.actionChangeStatus({...data, type: type});
      if (type == "CREATE") {
        dispatch(actionCreateEventSpeakerMaster(data));
      } else {
        dispatch(actionUpdateEventSpeakerMaster(data));
      }
      setEditData(null);
    },
    [setEditData]
  );

  const queryFilter = useCallback(
    (key, value) => {
      console.log("_queryFilter", key, value);
      // dispatch(actionSetPageEventSpeakerRequests(1));
      dispatch(
        actionFetchEventSpeakerMaster(1, sortingData, {
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
        actionFetchEventSpeakerMaster(
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
      dispatch(actionDeleteEventSpeakerMaster(id));
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

  const handleDeleteSpeaker =(all)=>{
    serviceDeleteSpaekers({id:all?.id})?.then((res)=>{
      if(!res?.error){
        SnackbarUtils.success("Speaker Deleted");
        window.location.reload();
      }
    })
  }

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
    handleDeleteSpeaker,
  };
};

export default useSpeakerMasterListHook;
