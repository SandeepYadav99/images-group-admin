import { useCallback, useEffect, useState } from "react";
import { serviceAcceptLeadMemberList } from "../../../../../services/LeadMemberList.service";
import SnackbarUtils from "../../../../../libs/SnackbarUtils";


// import { serviceGetNewEmployeeReject } from "../../../../services/NewEmployeeList.service";

const initialForm = {
  status: "",
};
const useAssociatedEventPopUp = ({ isOpen, handleToggle, candidateId }) => {
  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    if (isOpen) {
      setForm({ ...initialForm });
      setErrorData({});
    }
  }, [isOpen]);

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

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["member_id"];
    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
      } else if ([].indexOf(val) < 0) {
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
      serviceAcceptLeadMemberList({
        lead_id: candidateId?.id,
        member_id: form?.member_id?.id,
      }).then((res) => {
        if (!res.error) {
          SnackbarUtils.success("Request Accepted");
          handleToggle();
          window.location?.reload();
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting, handleToggle]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();

    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }
    submitToServer();
  }, [checkFormValidation, setErrorData, form, submitToServer]);

  const onBlurHandler = useCallback(
    (type) => {
      if (form?.[type]) {
        changeTextData(form?.[type].trim(), type);
      }
    },
    [changeTextData]
  );

  return {
    form,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    errorData,
    isSubmitting,
  
  };
};

export default useAssociatedEventPopUp;
