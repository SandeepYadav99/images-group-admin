import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
 
  actionFetchAsociateEvent,

  actionSetPageAsociateEvent,
 
} from "../../../../actions/AsociateEvent.action";
import { useParams } from "react-router-dom";
import historyUtils from "../../../../libs/history.utils";
import RouteName from "../../../../routes/Route.name";


const useEventListHook = () => {
  const [isSidePanel, setSidePanel] = useState(false);
  const [editData, setEditData] = useState(null);
  const dispatch = useDispatch();
  const {id}=useParams()
  const isMountRef = useRef(false);
  const [isAcceptPopUp, setIsAcceptPopUp] = useState(false);


  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state?.associateEvent);

  useEffect(() => {
    // dispatch(actionFetchAppUser());
  }, []);

 

  useEffect(() => {
    dispatch(
      actionFetchAsociateEvent(1, {}, {
        query: isMountRef.current ? query : null,
        query_data: isMountRef.current ? queryData : null,
        user_id:id
      })
    );
    isMountRef.current = true;
  }, []);

  const handlePageChange = useCallback((type) => {
    console.log("_handlePageChange", type);
    dispatch(actionSetPageAsociateEvent(type));
  }, []);



  const handleDataSave = useCallback(
    (data, type) => {
      // this.props.actionChangeStatus({...data, type: type});
      // if (type == "CREATE") {
      //   dispatch(actionCreateAppUser(data));
      // } else {
      //   dispatch(actionUpdateAppUser(data));
      // }
      setSidePanel((e) => !e);
      setEditData(null);
    },
    [setSidePanel, setEditData]
  );

  const queryFilter = useCallback(
    (key, value) => {
      console.log("_queryFilter", key, value);
      // dispatch(actionSetPageAppUserRequests(1));
      dispatch(
        actionFetchAsociateEvent(1, sortingData, {
          query: key == "SEARCH_TEXT" ? value : query,
          query_data: key == "FILTER_DATA" ? value : queryData,
        })
      );
      // dispatch(actionFetchAppUser(1, sortingData))
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
      console.log(`handleSortOrderChange key:${row} order: ${order}`);
      dispatch(actionSetPageAsociateEvent(1));
      dispatch(
        actionFetchAsociateEvent(
          1,
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
      // dispatch(actionDeleteAsociateEvent(id));
      setSidePanel(false);
      setEditData(null);
    },
    [setEditData, setSidePanel]
  );

  const handleEdit = useCallback(
    (data) => {
      setEditData(data);
      setSidePanel((e) => !e);
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

  const toggleAcceptDialog = useCallback(
    (all) => {
     historyUtils.push(`${RouteName.EVENTS_DETAILS}${all?.id}`)
      // setDataValue({ ...obj });
    },
    [isAcceptPopUp]
  );
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
    editData,
    isSidePanel,
    configFilter,
    handleToggleSidePannel,
    isAcceptPopUp,
    toggleAcceptDialog
  };
};

export default useEventListHook;




