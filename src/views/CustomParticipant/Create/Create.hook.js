import { useCallback, useEffect, useRef, useState } from "react";

import SnackbarUtils from "../../../libs/SnackbarUtils";
import Constants from "../../../config/constants";
import {
  serviceCreateCustomParticipant,
  serviceGetCustomParticipantDetails,
  serviceUpdateCustomParticipant,
} from "../../../services/CustomParticipant.service";
import historyUtils from "../../../libs/history.utils";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const initialForm = {
  label: "",
};

const useCustomParticipant = ({ location }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordCurrent, setShowPasswordCurrent] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [isEdit, setIsEdit] = useState(false);
  const includeRef = useRef(null);
  const { id: empId } = useParams();

  const eventID = location?.state?.eventID;

  useEffect(() => {
    if (empId) {
      serviceGetCustomParticipantDetails({ id: empId }).then((res) => {
        if (!res.error) {
          const data =
            res?.data?.details?.length > 0 ? res?.data?.details[0] : {};
          setForm({
            ...form,
            label: data?.label,
            // status: data?.status === Constants.GENERAL_STATUS.ACTIVE,
          });
        } else {
          SnackbarUtils.error(res?.message);
        }
      });
    }
  }, [empId]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["label"];
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

  const submitToServer = useCallback(() => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      const payloadData = {
        label: form?.label,
        event_id: eventID,
        // status: form?.status ? "ACTIVE" : "INACTIVE",
      };
      let req;
      if (empId) {
        req = serviceUpdateCustomParticipant({ ...payloadData, id: empId });
      } else {
        req = serviceCreateCustomParticipant(payloadData);
      }
      req.then((res) => {
        if (!res.error) {
          historyUtils.goBack();
        } else {
          SnackbarUtils.error(res.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting, empId, eventID]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }
    submitToServer();
  }, [checkFormValidation, setErrorData, form, eventID]);

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
      if (fieldName === "label") {
        t[fieldName] = text?.replace(/^\s+/, "");
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
    errorData,
    isEdit,
    handleDelete,
    includeRef,
    handleReset,
    empId,
    showPasswordCurrent,
    setShowPasswordCurrent,
  };
};

export default useCustomParticipant;
