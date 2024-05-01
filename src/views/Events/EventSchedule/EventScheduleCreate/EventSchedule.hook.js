/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { isAlphaNumChars, isSpace } from "../../../../libs/RegexUtils";
import useDebounce from "../../../../hooks/DebounceHook";
import SnackbarUtils from "../../../../libs/SnackbarUtils";
import Constants from "../../../../config/constants";
import {
  serviceCreateEventSchedule,
  serviceGetEventScheduleDetails,
  serviceGetEventSchedule,
  serviceUpdateEventSchedule,
} from "../../../../services/EventSchedule.service";
import { serviceGetList } from "../../../../services/Common.service";
import LogUtils from "../../../../libs/LogUtils";
import { useParams } from "react-router";
import { actionFetchEventSchedule } from "../../../../actions/EventSchedule.action";
import { useDispatch, useSelector } from "react-redux";
import { serviceAddCategoryList } from "../../../../services/AddCategory.service";
import { serviceExhibitorsList } from "../../../../services/Exhibitor.service";
import { TurnedInOutlined } from "@material-ui/icons";

const initialForm = {
  eve_name: "",
  // eve_title: "",
  eve_description: "",
  start_time: "",
  end_time: "",
  speakers: [],
  status: true,
  category: "",
  moderator: [],
  hall_no: "",
  venue: "",
  chairs: [],
  co_chairs: [],
  is_recommended: false,
  image: "",
  overview: "",
};

const useEventScheduleHook = ({
  handleToggleSidePannel,
  isSidePanel,
  empId,
}) => {
  const [isLoading] = useState(false);
  const [showPasswordCurrent, setShowPasswordCurrent] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [isEdit] = useState(false);
  const includeRef = useRef(null);
  const { id } = useParams();
  const [thimbnel, setThimbnel] = useState("");
  const dispatch = useDispatch();
  const [listData, setListData] = useState({
    EVENT_SPEAKERS: [],
    SCHEDULE_CATEGORIES: [],
  });

  const [listDataValue, setListDataValue] = useState({
    HALLS: [],
  });

  const { user } = useSelector((state) => state?.auth);

  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    serviceGetList(["EVENT_SPEAKERS", "SCHEDULE_CATEGORIES"], {
      event_id: id,
    }).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);

  const params = useParams();

  const paylaod = {
    index: 1,
    row: null,
    order: null,
    query: "",
    query_data: null,
    event_id: `${user?.event_id}`,
  };

  useEffect(() => {
    serviceAddCategoryList(paylaod)
      ?.then((res) => setCategoryList(res?.data))
      .catch((res) => res.error);
  }, []);

  useEffect(() => {
    serviceExhibitorsList({ list: ["HALLS"] }).then((res) => {
      if (!res.error) {
        setListDataValue(res.data);
      }
    });
  }, []);

  useEffect(() => {
    if (empId) {
      serviceGetEventScheduleDetails({ id: empId }).then((res) => {
        if (!res.error) {
          const data = res?.data;

          const modifiedSpeaker = data?.speakers?.map((item) => ({
            id: item?.s_id,
            label: `${item?.s_name}  (${item?.s_company})`,
          }));
          const modifiedModerator = data?.moderator?.map((item) => ({
            id: item?.s_id,
            label: `${item?.s_name}  (${item?.s_company})`,
          }));

          const modifiedChairs = data?.chairs?.map((item) => ({
            id: item?.s_id,
            label: `${item?.s_name}  (${item?.s_company})`,
          }));

          const modifiedCoChairs = data?.co_chairs?.map((item) => ({
            id: item?.s_id,
            label: `${item?.s_name}  (${item?.s_company})`,
          }));
          // const categoryData = data?.category?.toUpperCase();
          // console.log(categoryData,"categoryData is here")
          setThimbnel(data?.image);
          setForm({
            ...form,
            id: data.id,
            eve_name: data?.eve_name,
            eve_description: data?.eve_description,
            category: data?.category,
            start_time: data?.start_date_time,
            end_time: data?.end_date_time,
            speakers: modifiedSpeaker,
            moderator: modifiedModerator,
            status: data?.status === Constants.GENERAL_STATUS.ACTIVE,
            hall_no: data?.hall_no,
            venue: data?.venue,
            chairs: modifiedChairs,
            co_chairs: modifiedCoChairs,
            is_recommended: data?.is_recommended,
            overview: data?.overview,
          });
        } else {
          SnackbarUtils.error(res?.message);
        }
      });
    }
  }, [empId]);

  useEffect(() => {
    if (!isSidePanel) {
      handleReset();
    }
  }, [isSidePanel]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = [
      "eve_name",
      // "eve_title",
      // "eve_description",
      "start_time",
      "end_time",
      "category",
      // "speakers",
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
    if (form?.start_time && form?.end_time) {
      const startDate = new Date(form?.start_time);
      const endDate = new Date(form?.end_time);
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);
      if (startDate.getTime() > endDate.getTime()) {
        SnackbarUtils.error(
          "End Time Date should not be Less than Start Time Date"
        );
        errors["start_time"] = true;
      }
    }
    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData]);

  const submitToServer = useCallback(() => {
    if (!isSubmitting) {
      setIsSubmitting(true);

      const fd = new FormData();

      const relatedId =
        Array.isArray(form?.speakers) && form?.speakers.length > 0
          ? form?.speakers.map((item) => item.id)
          : [];

      const moderatorId =
        Array.isArray(form?.moderator) && form?.moderator.length > 0
          ? form?.moderator.map((item) => item.id)
          : [];

      const chairsId =
        Array.isArray(form?.chairs) && form?.chairs.length > 0
          ? form?.chairs.map((item) => item.id)
          : [];

      const co_chairsId =
        Array.isArray(form?.co_chairs) && form?.co_chairs.length > 0
          ? form?.co_chairs.map((item) => item.id)
          : [];

      Object.keys(form).forEach((key) => {
        if (key === "status") {
          fd.append(key, form[key] ? "ACTIVE" : "INACTIVE");
        } else if (key === "moderator") {
          moderatorId.length > 0 && fd.append(key, moderatorId.join(","));
        } else if (key === "speakers") {
          if (relatedId) {
            relatedId.length > 0 && fd.append(key, relatedId.join(","));
          }
        } else if (key === "chairs") {
          if (chairsId) {
            chairsId.length > 0 && fd.append(key, chairsId.join(","));
          }
        } else if (key === "status") {
          fd.append(key, form?.status ? "ACTIVE" : "INACTIVE");
        } else if (key === "is_recommended") {
          fd.append(key, form?.is_recommended === true ? true : false);
        } else if (key === "co_chairs") {
          co_chairsId.length > 0 && fd.append(key, co_chairsId.join(","));
        } else {
          fd.append(key, form[key]);
        }
      });
      // if(empId){
      fd.append("event_id", id);
      // }
      let req;
      if (empId) {
        req = serviceUpdateEventSchedule;
      } else {
        req = serviceCreateEventSchedule;
      }
      req(fd).then((res) => {
        if (!res.error) {
          handleToggleSidePannel();

          window.location.reload();
        } else {
          SnackbarUtils.error(res.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting, empId, id]);

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
console.log(form?.chairs)
  const updateSpeakerList = useMemo(() => {
    return listData?.EVENT_SPEAKERS?.filter((val) => {
      if (
        form?.chairs.findIndex((chair) => chair.id === val?.id) >= 0 ||
        form?.speakers.findIndex((speaker) => speaker.id === val?.id) >= 0 ||
        form?.co_chairs.findIndex((co_chair) => co_chair.id === val?.id) >= 0 ||
        form?.moderator.findIndex((moderator) => moderator.id === val?.id) >= 0
      ) {
        return false;
      } else {
        return true;
      }
    });
  }, [
    listData?.EVENT_SPEAKERS,
    form?.chairs,
    form?.co_chairs,
    form?.moderator,
    form?.speakers,
    params?.id,
  ]);

  const changeTextData = useCallback(
    (text, fieldName) => {
      let shouldRemoveError = true;
      const t = { ...form };
      if (fieldName === "policy_title") {
        if (!text || (isAlphaNumChars(text) && text.toString().length <= 30)) {
          t[fieldName] = text;
        }
      } else if (fieldName === "code") {
        if (!text || (!isSpace(text) && isAlphaNumChars(text))) {
          t[fieldName] = text.toUpperCase();
        }
        shouldRemoveError = false;
      } else {
        t[fieldName] = text;
      }

      setForm(t);

      shouldRemoveError && removeError(fieldName);
    },
    [removeError, form, setForm]
  );

  const onBlurHandler = useCallback(
    (type) => {
      if (form?.[type]) {
        changeTextData(form?.[type].trim(), type);
      }
    },
    //checkCodeValidation as dependescy
    [changeTextData]
  );

  const handleDelete = useCallback(() => {}, []);

  const handleReset = useCallback(() => {
    setForm({ ...initialForm });
  }, [form]);

  return {
    form,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isLoading,
    isSubmitting,
    listData,
    errorData,
    isEdit,
    handleDelete,
    includeRef,
    handleReset,
    empId,
    showPasswordCurrent,
    setShowPasswordCurrent,
    categoryList,
    listDataValue,
    updateSpeakerList,
    thimbnel,
  };
};

export default useEventScheduleHook;
