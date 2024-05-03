import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  isAlpha,
  isAlphaNum,
  isAlphaNumChars,
  isEmail,
  isNum,
  isSpace,
} from "../../../../libs/RegexUtils";

import SnackbarUtils from "../../../../libs/SnackbarUtils";
import Constants from "../../../../config/constants";
import { useParams } from "react-router-dom";
import {
  serviceCreateDuplicateAPi,
  serviceCreateMeetingRoomList,
  serviceIsExistApi,
  serviceUpdateMeetingRoomList,
} from "../../../../services/MeetingRoom.service";
import { serviceGetMeetingRoomSlottListDetails } from "../../../../services/MeetingSlots.service";
import useDebounce from "../../../../hooks/DebounceHook";

const initialForm = {
  name: "",
  code: "",
  is_active: true,
};

const useDuplicate = ({
  handleToggleSidePannel,
  isSidePanel,
  empId,
  detailsData,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordCurrent, setShowPasswordCurrent] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [isEdit, setIsEdit] = useState(false);
  const includeRef = useRef(null);
  const [isRejectPopUp, setIsRejectPopUp] = useState(false);
  const [dataValue, setDataValue] = useState({});
  const [isExist,setIsExist] = useState(false);
  const codeDebouncer = useDebounce(form?.code, 500);


  const params = useParams();

  useEffect(() => {
    if (!isSidePanel) {
      handleReset();
    }
  }, [isSidePanel]);

  useEffect(() => {
    if (detailsData) {
      setForm({
        ...form,
        name: detailsData?.name,
        code: detailsData?.code,
      });
    }
  }, [detailsData]);


  useEffect(()=>{
    serviceIsExistApi({
      event_id:params?.id,
      code:form?.code,
    }).then((res)=>{
      setIsExist(res?.data?.is_exists)
    })
  },[form?.code])

  const checkCodeValidation = useCallback(() => {
    serviceIsExistApi({
      event_id: params?.id,
      code: form?.code,
    }).then((res) => {
      const errors = {...errorData};
      if (res.data.is_exists) {
        errors["code"] = true;
      } else {
        delete errors.code;
      }
      setErrorData(errors);
    });
  }, [form?.code, errorData]);

  useEffect(() => {
    if (codeDebouncer) {
      checkCodeValidation();
    }
  }, [codeDebouncer]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["name", "code"];

    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
      }
    });
    if(isExist){
      errors["code"] = true ;
      SnackbarUtils.error("Room Code Already Exist")
    }
    else {
      errors["code"] = false;
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

      const updatePayload = {
        ...form,
        event_id: detailsData?.event_id,
        room_id:params?.id,
      };
      let req;

      req = serviceCreateDuplicateAPi(updatePayload);

      req.then((res) => {
        if (!res.error) {
          handleToggleSidePannel();
          window.location.reload();
        } else {
          SnackbarUtils.error(res.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting, empId]);

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
        if (!text || (isAlphaNumChars(text) && text.toString().length <= 30)) {
          t[fieldName] = text;
        }
      } else if (fieldName === "code") {
        if (!text || (!isSpace(text) && isAlphaNum(text))) {
          t[fieldName] = text;
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
    [changeTextData]
  );

  const handleReset = useCallback(() => {
    setForm({ ...initialForm });
  }, [form]);

  const toggleRejectDialog = useCallback(
    (obj) => {
      setIsRejectPopUp((e) => !e);
      setDataValue({ ...obj });
    },
    [isRejectPopUp, setDataValue]
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
    includeRef,
    handleReset,
    empId,
    showPasswordCurrent,
    setShowPasswordCurrent,
    isRejectPopUp,
    setIsRejectPopUp,
    toggleRejectDialog,
  };
};

export default useDuplicate;
