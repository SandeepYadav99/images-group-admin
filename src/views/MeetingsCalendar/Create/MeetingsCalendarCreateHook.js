import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import SnackbarUtils from "../../../libs/SnackbarUtils";
import Constants from "../../../config/constants";

import {
  serviceCreateHallMasterList,
  serviceGetHallMasterDetails,
  serviceUpdateHallMasterList,
} from "../../../services/HallMaster.service";
import { actionFetchHallMasterList } from "../../../actions/HallMaster.action";
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
    const userName = JSON.parse(localStorage.getItem("user"));
    console.log(userName);
    setBookUser(userName?.id);
  }, [bookUser]);

  // useEffect(() => {
  //   if (empId) {
  //     serviceGetHallMasterDetails({ id: empId }).then((res) => {
  //       if (!res.error) {
  //         const data = res?.data;
  //         console.log(data, "Data ");
  //         setForm({
  //           ...form,
  //           name: data?.hall_no,
  //           des: data?.description,
  //           status: data?.status === Constants.GENERAL_STATUS.ACTIVE,
  //         });
  //       } else {
  //         SnackbarUtils.error(res?.message);
  //       }
  //     });
  //   }
  // }, [empId]);

  useEffect(() => {
    if (!isSidePanel) {
      handleReset();
    }
  }, [isSidePanel]);

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
        if (form?.booked_by || form?.booked_with) {
          setForm((prevForm) => ({
            ...prevForm,
            choose_date: "",
            choose_time: "",
            meeting_room: "",
          }));
        }
      }
    });
  }, [isSidePanel, form?.booked_by, form?.booked_with]);

  useEffect(() => {
    if (!isSidePanel) return;
    serviceCreateMeetingCallendarDate({ event_id: event_id }).then((res) => {
      if (!res?.error) {
        const data = res?.data;
        setSelectCalendarDate(data);
        if (form?.choose_date) {
          setForm({
            ...form,
            choose_time: "",
            meeting_room: "",
          });
        }
      }
    });
  }, [form?.choose_date, isSidePanel]);
  // console.log(form?.choose_date);
  useEffect(() => {
    if (!isSidePanel) return;
    if (!selectCalendarDate) return;
    serviceCreateMeetingCallendarTimeSlot({
      event_id: event_id,
      date: form?.choose_date?.date,
      booked_by: form?.booked_by?.id, // id of logged in user
      booked_with: form?.booked_with?.id, // id of selected user
    }).then((res) => {
      // page:1,
      if (!res?.error) {
        const data = res?.data;
        setSelectCalendarTime(data);
        if (form?.choose_time) {
          setForm({
            ...form,

            meeting_room: "",
          });
        }
      }
    });
  }, [form?.choose_date, isSidePanel, form?.choose_time]);

  useEffect(() => {
    if (!isSidePanel) return;
    if (!selectCalendarTime) return;
    serviceCreateMeetingCallendarRooms({
      event_id: event_id,
      start_time: form?.choose_time?.start_time,
      end_time: form?.choose_time?.end_time,
    }).then((res) => {
      // page:1,
      if (!res?.error) {
        const data = res?.data;
        setSelectCalendarRooms(data);
      }
    });
  }, [isSidePanel, form?.choose_time]);

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
  }, [form, isSubmitting, setIsSubmitting, empId, isSidePanel]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);

      return true;
    }
    submitToServer();
  }, [checkFormValidation, setErrorData, form, includeRef.current]);

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
      if (fieldName === "name") {
        t[fieldName] = text?.replace(/^\s+/, "");
      } else if (fieldName === "des") {
        t[fieldName] = text?.replace(/^\s+/, "");
      } else if (fieldName === "booked_by" || fieldName === "booked_with") {
        t[fieldName] = text;
      } else {
        t[fieldName] = text;
      }

      setForm(t);
      shouldRemoveError && removeError(fieldName);
    },
    [removeError, form, setForm, setResetValue]
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
    setErrorData({})
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
