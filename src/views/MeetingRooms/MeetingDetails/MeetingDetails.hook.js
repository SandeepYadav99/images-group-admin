import { useParams } from "react-router-dom";
import { serviceGetMeetingRoomSlottListDetails, serviceUpdateSlotStatus } from "../../../services/MeetingSlots.service";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actionCreateMeetingRoomSlotList,
  actionDeleteMeetingRoomSlotList,
  actionFetchMeetingRoomSlotList,
  actionSetPageMeetingRoomSlotList,
  actionUpdateMeetingRoomSlotList,
} from "../../../actions/MeetingRoomSlot.action";
import historyUtils from "../../../libs/history.utils";
import RouteName from "../../../routes/Route.name";
import SnackbarUtils from "../../../libs/SnackbarUtils";

const initialForm = {
  status:'',
}

const useMeetingDetailHook = ({ location }) => {
  const event = location?.state?.eventId;
  const [form,setForm] = useState({...initialForm})
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const params = useParams();
  const [dataValue, setDataValue] = useState();
  const locationData = location?.state?.name_data;
  const [isCalling, setIsCalling] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isSidePanel, setSidePanel] = useState(false);
  const [dateRange, setDateRange] = useState(false);
  const [popupOpen,setPopupOpen] = useState(false);
  const [dataId,setDataId] = useState("");
  const [duplicate,setDuplicate] = useState(false);

  const dispatch = useDispatch();
  const isMountRef = useRef(false);
  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state.meeting_slots);

  useEffect(() => {
    dispatch(
      actionFetchMeetingRoomSlotList(1, params?.id, sortingData, {
        query: isMountRef.current ? query : null,
        query_data: isMountRef.current ? queryData : null,
      })
    );
    isMountRef.current = true;
  }, []);

  const handlePageChange = useCallback((type) => {
    dispatch(actionSetPageMeetingRoomSlotList(type));
  }, []);

  const handleDataSave = useCallback(
    (data, type) => {
      if (type == "CREATE") {
        dispatch(actionCreateMeetingRoomSlotList(data));
      } else {
        dispatch(actionUpdateMeetingRoomSlotList(data));
      }
      setEditData(null);
    },
    [setEditData]
  );

  const queryFilter = useCallback(
    (key, value) => {
      console.log("_queryFilter", key, value);
      dispatch(
        actionFetchMeetingRoomSlotList(1, params?.id, sortingData, {
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
        actionFetchMeetingRoomSlotList(
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
      dispatch(actionDeleteMeetingRoomSlotList(id));
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
    historyUtils.push(`${RouteName.EVENT_HIGHLIGHTS_UPDATE}/${data?.id}`, {
      eventId: params?.id,
    });
  }, []);

 

  const handleCreateFed = useCallback((data) => {
    historyUtils.push(`${RouteName.EVENT_HIGHLIGHTS_CREATE}`, {
      eventId: params?.id,
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

  useEffect(() => {
    if (params?.id) {
      serviceGetMeetingRoomSlottListDetails({
        id: params?.id,
        event_id: event,
      })?.then((res) => {
        setDataValue(res?.data?.details);
      });
    }
  }, [params?.id]);

  const handleOpenDateRange = useCallback(() => {
    setDateRange((e)=>!e);
  }, [dateRange, setDateRange]);


  const handleOpenPopUp =useCallback((all)=>{
    setPopupOpen(true)
    setDataId(all?.id)
  },[popupOpen,dataId])

  const handleClosePopUp =useCallback(()=>{
    setPopupOpen(false)
    setDataId('')
  },[])

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["status"];

    required.forEach((val) => {
      if (
        (!form?.[val] && parseInt(form?.[val]) != 0) ||
        (Array.isArray(form?.[val]) && form?.[val]?.length === 0)
      ) {
        errors[val] = true;
      }
    });

    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData]);

  const removeError = useCallback(
    (title) => {
      const temp = JSON.parse(JSON.stringify(errorData));
      temp[title] = false;
      setErrorData(temp);
    },
    [setErrorData, errorData]
  );

  const changeTextData = useCallback(
    (text, fieldName) => {
      let shouldRemoveError = true;
      const t = { ...form };
        t[fieldName] = text;
      
      setForm(t);
      shouldRemoveError && removeError(fieldName);
    },
    [removeError, form, setForm]
  );

  const submitToServer = useCallback(
    (status) => {
      if (!isSubmitting) {
        setIsSubmitting(true);

        const payload ={
          id:dataId,
          status:form?.status
        }

        let req = serviceUpdateSlotStatus({...payload})
        req.then((res) => {
          if (!res.error) {
            setPopupOpen(false)
            window?.location?.reload();
          } else {
            SnackbarUtils.error(res?.message);
          }
          setIsSubmitting(false);
        });
      }
    },
    [form, isSubmitting, setIsSubmitting]
  );

  const onBlurHandler = useCallback(
    (type) => {
      if (form?.[type]) {
        changeTextData(form?.[type].trim(), type);
      }
    },
    [changeTextData]
  );

  const handleSubmit = useCallback(
    async (status) => {
      const errors = checkFormValidation();
      if (Object.keys(errors)?.length > 0) {
        setErrorData(errors);
        return true;
      }
      submitToServer(status);
    },
    [checkFormValidation, setErrorData, form, submitToServer]
  );

  const handleOpenDuplicate =useCallback(()=>{
      setDuplicate((e)=> !e)
  },[duplicate])

  return {
    form,
    dataValue,
    errorData,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isSubmitting,
    handlePageChange,
    handleDataSave,
    handleFilterDataChange,
    handleToggleSidePannel,
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
    locationData,
    isSidePanel,
    handleOpenDateRange,
    dateRange,
    event,
    popupOpen,
    handleOpenPopUp,
    handleClosePopUp,
    duplicate,
    handleOpenDuplicate,
  };
};

export default useMeetingDetailHook;
