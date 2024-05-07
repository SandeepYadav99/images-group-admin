import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import historyUtils from "../../../libs/history.utils";
import RouteName from "../../../routes/Route.name";
import LogUtils from "../../../libs/LogUtils";
import {
  actionFetchCustomParticipant,
  actionSetPageCustomParticipant,
} from "../../../actions/CustomParticipant.action";
import { useParams } from "react-router-dom";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import { serviceDeleteCustomParticipant } from "../../../services/CustomParticipant.service";

const useCustomParticipantList = ({}) => {
  const [isSidePanel, setSidePanel] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isDeletedPopUp, setIsDeletedPopUp] = useState(false);
  const [deleteId, setDeleteID] = useState(null);

  const dispatch = useDispatch();
  const { id } = useParams();

  const isMountRef = useRef(false);
  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state.custom_participant);

  useEffect(() => {
    // dispatch(actionFetchCustomParticipant());
  }, []);

  useEffect(() => {
    dispatch(
      actionFetchCustomParticipant(
        1,
        {},
        {
          query: isMountRef.current ? query : null,
          query_data: isMountRef.current ? queryData : null,
          event_id: id,
        }
      )
    );
    isMountRef.current = true;
  }, [id]);

  const toggleDeletedDialog = useCallback(
    (obj) => {
      if (obj) {
        setDeleteID(obj?.id);
      } else {
        setDeleteID(null);
      }
      setIsDeletedPopUp((e) => !e);
    },
    [isDeletedPopUp, setIsDeletedPopUp, deleteId, setDeleteID]
  );
  const handleDelete = useCallback(
    (id) => {
      // dispatch(actionDeleteEventSchedule(id));
      setSidePanel(false);
      setEditData(null);
    },
    [setEditData, setSidePanel]
  );

  const handlePageChange = useCallback((type) => {
    console.log("_handlePageChange", type);
    dispatch(actionSetPageCustomParticipant(type));
  }, []);

  const handleDataSave = useCallback(
    (data, type) => {
      setSidePanel((e) => !e);
      setEditData(null);
    },
    [setSidePanel, setEditData]
  );

  const handleCreateFed = useCallback(
    (data) => {
      LogUtils.log("data", data);
      historyUtils.push(`${RouteName.CUSTOM_PARTICIPANT_CREATE}`, {
        eventID: id,
      });
    },
    [id]
  );

  const queryFilter = useCallback(
    (key, value) => {
      console.log("_queryFilter", key, value);
      // dispatch(actionSetPageAppUserRequests(1));
      dispatch(
        actionFetchCustomParticipant(1, sortingData, {
          query: key == "SEARCH_TEXT" ? value : query,
          query_data: key == "FILTER_DATA" ? value : queryData,
          event_id: id,
        })
      );
      // dispatch(actionFetchAppUser(1, sortingData))
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
      dispatch(actionSetPageCustomParticipant(1));
      dispatch(
        actionFetchCustomParticipant(
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

  const handleDeleteData = useCallback(
    (data) => {
      serviceDeleteCustomParticipant({
        id: deleteId,
      }).then((res) => {
        if (!res.error) {
          SnackbarUtils.success("Deleted Successfully");
          dispatch(
            actionFetchCustomParticipant(1, sortingData, {
              query: isMountRef.current ? query : null,
              query_data: isMountRef.current ? queryData : null,
              event_id: id,
            })
          );
        } else {
          SnackbarUtils.error(res?.message);
        }
      });
      //
    },
    [id,deleteId, setDeleteID]
  );

  const handleEdit = useCallback(
    (data) => {
      // setEditData(data);
      // setSidePanel((e) => !e);
      historyUtils.push(RouteName.PRODUCT_CATEGORY_UPDATE + data?.id);
    },
    [setEditData, setSidePanel]
  );

  const handleToggleSidePannel = useCallback(
    (data) => {
      setSidePanel((e) => !e);
      setEditData(data?.id);
    },
    [setSidePanel, setEditData]
  );

  const handleSideToggle = useCallback(
    (data) => {
      historyUtils.push(RouteName.LOCATIONS_UPDATE + data?.id);
    },
    [setEditData, setSidePanel]
  );

  const handleViewDetails = useCallback(
    (data) => {
      historyUtils.push(RouteName.CUSTOM_PARTICIPANT_UPDATE + data.id, {
        eventID: id,
      }); //+data.id
    },
    [id]
  );

  const handleCreate = useCallback(() => {
    historyUtils.push(RouteName.LOCATIONS_CREATE);
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

  return {
    handlePageChange,
    handleDataSave,
    handleFilterDataChange,
    handleSearchValueChange,
    handleRowSize,
    handleSortOrderChange,
    handleDelete,
    handleEdit,
    handleSideToggle,
    handleViewDetails,
    isCalling,
    editData,
    isSidePanel,
    configFilter,
    handleCreate,
    handleToggleSidePannel,
    handleCreateFed,
    isDeletedPopUp,
    toggleDeletedDialog,
    handleDeleteData,
  };
};

export default useCustomParticipantList;
