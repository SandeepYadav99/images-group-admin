import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  isAlpha,
  isAlphaNum,
  isAlphaNumChars,
  isEmail,
  isNum,
  isSpace,
} from "../../../libs/RegexUtils";
import useDebounce from "../../../hooks/DebounceHook";
import historyUtils from "../../../libs/history.utils";
import {
  serviceEventParticipantCheck,
  serviceCreateEventParticipant,
  serviceGetEventParticipantDetails,
  serviceUpdateEventParticipant,
} from "../../../services/EventParticipant.service";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import Constants from "../../../config/constants";
import RouteName from "../../../routes/Route.name";
import { serviceUpdateAdminUserSearch } from "../../../services/AdminUser.service";
import LogUtils from "../../../libs/LogUtils";
import { serviceGetList } from "../../../services/Common.service";
import { useParams } from "react-router";
import { cleanContactNumber } from "../../../helper/helper";
import { serviceGetFullCustomParticipant } from "../../../services/CustomParticipant.service";

const initialForm = {
  name: "",
  // country_code: "91",
  contact: "",
  email: "",
  title: "",
  is_default_password: true,
  // reg_id: "",
  user_id: "",
  // is_auto: true,
  category: "",
  participant_type: [],
  company_name: "",
  is_awards: "NO",
  is_lunch: "NO",
};

const useEventParticipantCreate = ({
  handleToggleSidePannel,
  isSidePanel,
  empId,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordCurrent, setShowPasswordCurrent] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [participantList, setParticipantList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const includeRef = useRef(null);
  const codeDebouncer = useDebounce(form?.code, 500);
  const { id } = useParams();
  const [isContactInList, setIsContactInList] = useState(false);
  const [countryCode, setCountryCode] = useState();
  const [listData, setListData] = useState({
    MEMBERS: [],
    PARTICIPANT_TYPE:[]
  });

  const handleCountryCode = (e) => {
    setCountryCode(e.target.value);
  };

  useEffect(()=>{
    if(!isSidePanel){
      setForm({
        ...initialForm
      })
      setErrorData({})
    }
  },[isSidePanel])

  useEffect(() => {
    if (!countryCode) {
      setCountryCode("91");
    }
  });

  useEffect(() => {
    Promise.allSettled([
      serviceGetList(["MEMBERS","PARTICIPANT_TYPE"]),
      serviceGetFullCustomParticipant({ event_id: id }),
    ]).then((promises) => {
      const Values = promises[0]?.value?.data;
      const participant = promises[1]?.value?.data;
      setListData(Values);
      const participantvalues =
        participant?.length > 0
          ? participant?.map((item) => {
              return {
                key: item?.key,
                label: item?.label,
                value: item?.value ? item?.value : "NO",
              };
            })
          : [];
      setParticipantList([...participantvalues]);
    });
  }, [id]);

  // console.log("participant", participantList);

  useEffect(() => {
    if (empId) {
      serviceGetEventParticipantDetails({ id: empId }).then((res) => {
        if (!res.error) {
          const data = res?.data?.details;

          setForm({
            ...form,
            name: data?.name,
            status: data?.status === Constants.GENERAL_STATUS.ACTIVE,
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

  const checkCodeValidation = useCallback(() => {
    serviceUpdateAdminUserSearch({
      contact: cleanContactNumber(form?.contact),
      // contact: `91 ${form?.contact}`,
      id: empId ? empId : "",
      event_id: id,
    }).then((res) => {
      if (!res.error) {
        const data = res?.data;

        if (data?.full_contact === cleanContactNumber(form?.contact)) {
          setIsContactInList(true);
        }
        if (data?.contact) {
          const tForm = {
            ...initialForm,
            name: data?.name,
            contact: data?.full_contact,
            email: data?.email,
            title: data.designation,
            // reg_id: data?.reg_id,
            user_id: data?.id,
            category: data?.category,
            participant_type: data?.participant_type
              ? data?.participant_type
              : [],
            is_awards: data?.is_awards ? "YES" : "NO",
            is_lunch: data?.is_lunch ? "YES" : "NO",
            company_name: data?.company_name,
          };
          setForm(tForm);
          if (data?.custom_data?.length > 0) {
            if (participantList?.length > 0) {
              const updatedArr = participantList?.map((obj) => {
                const matchingObj = data?.custom_data?.find(
                  (item) => item?.key === obj?.key
                );
                return matchingObj ? matchingObj : obj;
              });
              setParticipantList([...updatedArr]);
            } else {
              setParticipantList([...data?.custom_data]);
            }
          }
        } else {
          if (data?.full_contact !== cleanContactNumber(form?.contact)) {
            setIsContactInList(false);
          }
          setForm({
            ...form,
            user_id: "",
          });
        }
      }
    });
  }, [
    form,
    setForm,
    isContactInList,
    setIsContactInList,
    empId,
    id,
    form?.contact,
    setParticipantList,
    participantList,
  ]);

  console.log("participantList", participantList);
  const DataSetName = [
    "EXHIBITOR",
    "SPEAKER",
    "AWARD_PRESENTATION",
    "INNOVATORS_CLUB",
    "JURY",
    "DELEGATE",
  ];

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = [
      "name",
      // "country_code",
      "contact",
      "email",
      // "reg_id",
      "title",
      "category",
      "participant_type",
      "company_name",
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
      if (form?.email && !isEmail(form?.email)) {
        errors["email"] = true;
      }
      // if (form?.contact) {
      //   const cleanCode = cleanContactNumber(form?.contact);
      //   const number = cleanCode?.split(" ")[1] ? cleanCode?.split(" ")[1] : "";
      //   if (!number || number?.length < 10) {
      //     errors["contact"] = true;
      //   }
      // }
    });
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
      let req;
      if (empId) {
        req = serviceUpdateEventParticipant({
          ...form,
          is_awards: form?.is_awards === "YES",
          is_lunch: form?.is_lunch === "YES",
          id: empId ? empId : "",
          event_id: id,
          custom_data: [...participantList],
        });
      } else {
        req = serviceCreateEventParticipant({
          ...form,
          contact: `${cleanContactNumber(form?.contact)}`,
          // contact: `${countryCode} ${form?.contact}`,
          category: form?.category,
          event_id: id,
          is_awards: form?.is_awards === "YES",
          is_lunch: form?.is_lunch === "YES",
          custom_data: [...participantList],
        });
      }
      req.then((res) => {
        if (!res.error) {
          // handleToggleSidePannel();
          historyUtils.goBack();
          window.location.reload();
        } else {
          SnackbarUtils.error(res.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [
    form,
    isSubmitting,
    setIsSubmitting,
    empId,
    id,
    participantList,
    setParticipantList,
  ]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    LogUtils.log("errors", errors);
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }
    submitToServer();
  }, [
    checkFormValidation,
    setErrorData,
    form,
    participantList,
    setParticipantList,
  ]);

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
        if (!text || (isAlphaNumChars(text) && text.toString().length <= 50)) {
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
    [removeError, form, setForm, id, empId]
  );

  const onBlurHandler = useCallback(
    (type) => {
      if (form?.[type]) {
        changeTextData(form?.[type].trim(), type);
      }
      if (type === "contact") {
        checkCodeValidation();
      }
    },
    [changeTextData, checkCodeValidation, form?.contact, empId]
  );

  const handleDelete = useCallback(() => {}, []);

  const handleReset = useCallback(() => {
    setForm({ ...initialForm });
  }, [form, setForm, isContactInList]);

  const handleParticipant = useCallback(
    (text, fieldName) => {
      const t = [...participantList];
      const updatedList = [...participantList]?.map((item) => {
        if (item?.key === fieldName) {
          return { ...item, value: text };
        }
        return item;
      });
      setParticipantList(updatedList);
    },
    [participantList, setParticipantList]
  );

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
    listData,
    isContactInList,
    countryCode,
    handleCountryCode,
    DataSetName,
    participantList,
    handleParticipant,
  };
};

export default useEventParticipantCreate;
