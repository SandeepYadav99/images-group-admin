import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import SnackbarUtils from "../../../libs/SnackbarUtils";

import { useDispatch } from "react-redux";
import {
  serviceCreateMeetingCallendarBookWith,
  serviceCreateMeetingCallendarCreate,
  serviceCreateMeetingCallendarDate,
  serviceCreateMeetingCallendarRooms,
  serviceCreateMeetingCallendarTimeSlot,
} from "../../../services/MeetingsCalendar.service";
import { useParams } from "react-router-dom";
import { serviceGetList } from "../../../services/index.services";
import { actionFetchMeetingCallendarList } from "../../../actions/MeetingsCalendar.action";

const initialForm = {
  choose_date: "",
  choose_time: "",
  booked_by: "",
  booked_with: "",
  meeting_room: "",
};

const useMeetingsCalendarCreateHook = ({
  handleToggleSidePannel,
  isSidePanel,
  empId,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordCurrent, setShowPasswordCurrent] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [isEdit, setIsEdit] = useState(false);
  const includeRef = useRef(null);
  const [selectCalendarDate, setSelectCalendarDate] = useState(null); //
  const [selectCalendarTime, setSelectCalendarTime] = useState(null);
  const [selectCalendarRooms, setSelectCalendarRooms] = useState(null);
  const [selectCalendarBookWith, setSelectCalendarBookWith] = useState(null);
  const [bookUser, setBookUser] = useState("");
  const [resetValue, setResetValue] = useState("");
  const { id: event_id } = useParams();
  const dispatch = useDispatch();

  const [listData, setListData] = useState({
    EVENT_PARTICIPENT: [],
  });
  useEffect(() => {
    serviceGetList(["EVENT_PARTICIPENT"], {
      event_id: event_id,
    }).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);

  useEffect(() => {
    if (!isSidePanel) {
      handleReset();
    }
  }, [isSidePanel]);

  useEffect(() => {
    serviceCreateMeetingCallendarDate({ event_id: event_id }).then((res) => {
      if (!res?.error) {
        const data = res?.data;
        setSelectCalendarDate(data);
      }
    });
  }, [event_id]);


  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = [
      "choose_date",
      "choose_time",
      "booked_by",
      "booked_with",
      "meeting_room",
    ];
    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
      } else if (["code"].indexOf(val) < 0) {
        delete errors[val];
      }
    });
    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData]);

  useEffect(() => {
    if (!isSidePanel) return;
    serviceCreateMeetingCallendarBookWith({
      event_id: event_id,
      page: 0,
      query: "",
    }).then((res) => {
      // page:1,
      if (!res?.error) {
        const data = res?.data;
        setSelectCalendarBookWith(data);
        
      }
    });
  }, [isSidePanel]);

  const submitToServer = useCallback(() => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      const payloadData = {
        slot_id: form?.meeting_room?.slot_id,
        booked_by: form?.booked_by?.id,
        booked_with: form?.booked_with?.id,
      };
      let req;

      req = serviceCreateMeetingCallendarCreate(payloadData);
      req.then((res) => {
        if (!res.error) {
          // historyUtils.goBack();
          // window.location.reload();
          handleToggleSidePannel();
          dispatch(
            actionFetchMeetingCallendarList(1, {
              event_id: event_id,
            })
          );
        
          // dispatch(actionFetchHallMasterList(1));
        } else {
          SnackbarUtils.error(res.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting, empId, isSidePanel, event_id]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);

      return true;
    }
    submitToServer();
  }, [checkFormValidation, setErrorData, form, includeRef.current, event_id]);

  const removeError = useCallback(
    (title) => {
      const temp = JSON.parse(JSON.stringify(errorData));
      temp[title] = false;
      setErrorData(temp);
    },
    [setErrorData, errorData]
  );

 
  // const { date, times } = form.choose_date;
  // const tiemSlotFetch = useCallback(() => {
  //   if (!form.choose_date  && !form?.booked_by?.id && !form?.booked_with?.id) return;
  //   serviceCreateMeetingCallendarTimeSlot({
  //     event_id: event_id,
  //     date: form.choose_date.date,
  //     booked_by: form?.booked_by?.id, // id of logged in user
  //     booked_with: form?.booked_with?.id, // id of selected user
  //   }).then((res) => {
  //     // page:1,
  //     if (!res?.error) {
  //       const data = res?.data;
  //       setSelectCalendarTime(data);
       
  //     }
  //   });
  // }, [ event_id,form.choose_date, form.choose_date.date, form.booked_by.id, form.booked_with.id,]);

  // const timeRoomFetch = useCallback(() => {
  //   if (!form?.choose_time?.start_time && !form?.choose_time?.end_time) return;
  //   serviceCreateMeetingCallendarRooms({
  //     event_id: event_id,
  //     start_time: form?.choose_time?.start_time,
  //     end_time: form?.choose_time?.end_time,
  //   }).then((res) => {
  //     // page:1,
  //     if (!res?.error) {
  //       const data = res?.data;
  //       setSelectCalendarRooms(data);
       
  //     }
  //   });
  // }, [form.choose_time.start_time, form.choose_time.end_time, event_id]);

  const changeTextData = useCallback(
    (text, fieldName) => {
      let shouldRemoveError = true;
      const t = { ...form };
      if (fieldName === "name") {
        t[fieldName] = text?.replace(/^\s+/, "");
      } else if (fieldName === "des") {
        t[fieldName] = text?.replace(/^\s+/, "");
      } else if (fieldName === "booked_by") {
        t["meeting_room"] = "";
        t["choose_date"] = "";
        t["choose_time"] = "";
        t["booked_with"] = "";
        t[fieldName] = text;
      } else if (fieldName === "booked_with") {
        t["meeting_room"] = "";
        t["choose_date"] = "";
        t["choose_time"] = "";
        // t["booked_by"]="";

        t[fieldName] = text;
      } else if (fieldName === "choose_date") {
        serviceCreateMeetingCallendarTimeSlot({
          event_id: event_id,
          date: text?.date,
          booked_by: form?.booked_by?.id, // id of logged in user
          booked_with: form?.booked_with?.id, // id of selected user
        }).then((res) => {
          // page:1,
          if (!res?.error) {
            const data = res?.data;
            setSelectCalendarTime(data);
           
          }
        });
        t["meeting_room"] = "";
        t["choose_time"] = "";

        t[fieldName] = text;
        // }
      } else if (fieldName === "choose_time") {
        serviceCreateMeetingCallendarRooms({
          event_id: event_id,
          start_time: text?.start_time,
          end_time: text?.end_time,
        }).then((res) => {
          // page:1,
          if (!res?.error) {
            const data = res?.data;
            setSelectCalendarRooms(data);
           
          }
        });
        t["meeting_room"] = "";
        t[fieldName] = text;
      } else {
        t[fieldName] = text;
      }

      setForm(t);
      shouldRemoveError && removeError(fieldName);
    },
    [
      removeError,
      form,
      setForm,
      setResetValue,
  
      selectCalendarBookWith, 
      selectCalendarDate,
      selectCalendarRooms,
      selectCalendarTime,
     
    ]
  );
 
  const onBlurHandler = useCallback(
    (type) => {
      if (form?.[type]) {
        changeTextData(form?.[type].trim(), type);
      }
    },
    [changeTextData]
  );

  const handleDelete = useCallback(() => {}, []);

  const handleReset = useCallback(() => {
    setForm({ ...initialForm });
    setErrorData({});
  }, [form, isSidePanel, errorData]);

  const updateParticipentsList = useMemo(() => {
    return listData?.EVENT_PARTICIPENT?.filter((val) => {
      const isBookedBy = form?.booked_by?.id === val.id;
      const isBookedWith = form?.booked_with?.id === val.id;
      return !(isBookedBy || isBookedWith);
    });
  }, [listData?.EVENT_PARTICIPENT, form?.booked_by, form?.booked_with]);

  return {
    form,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isLoading,
    isSubmitting,
    errorData,
    isEdit,
    handleDelete,
    includeRef,
    handleReset,
    empId,
    showPasswordCurrent,
    setShowPasswordCurrent,
    selectCalendarDate,
    bookUser,
    selectCalendarTime,
    selectCalendarRooms,
    selectCalendarBookWith,
    listData,
    updateParticipentsList,
  };
};

export default useMeetingsCalendarCreateHook;
