import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import historyUtils from "../../../libs/history.utils";
import RouteName from "../../../routes/Route.name";
import LogUtils from "../../../libs/LogUtils";
import {
  actionFetchCustomParticipantType,
  actionSetPageCustomParticipantType,
} from "../../../actions/ParticipantType.action";
import { useParams } from "react-router-dom";

const useParticipantType = ({}) => {
  const [isSidePanel, setSidePanel] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [editData, setEditData] = useState(null);
  const dispatch = useDispatch();
  const { id } = useParams();

  const isMountRef = useRef(false);
  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state.participant_type);

  useEffect(() => {}, []);

  useEffect(() => {
    dispatch(
      actionFetchCustomParticipantType(
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

  const handlePageChange = useCallback((type) => {
    console.log("_handlePageChange", type);
    dispatch(actionSetPageCustomParticipantType(type));
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
      historyUtils.push(`${RouteName.PARTICIPANT_TYPE_CREATE}`, {
        eventID: id,
      });
    },
    [id]
  );

  const queryFilter = useCallback(
    (key, value) => {
      console.log("_queryFilter", key, value);
      dispatch(
        actionFetchCustomParticipantType(1, sortingData, {
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
      dispatch(actionSetPageCustomParticipantType(1));
      dispatch(
        actionFetchCustomParticipantType(
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
      setSidePanel(false);
      setEditData(null);
    },
    [setEditData, setSidePanel]
  );

  const handleEdit = useCallback(
    (data) => {
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
      historyUtils.push(RouteName.PARTICIPANT_TYPE_UPDATE + data.id);
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
  };
};

export default useParticipantType;
