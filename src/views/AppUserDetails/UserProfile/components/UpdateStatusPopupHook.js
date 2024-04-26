import { useCallback, useEffect, useState } from "react";
import SnackbarUtils from "../../../../libs/SnackbarUtils";
import { serviceUpdateUserStatus } from "../../../../services/AppUser.service";
import { actionDetailAppUser } from "../../../../actions/AppUser.action";
import { useDispatch, useSelector } from "react-redux";

const initialForm = {
  status: "",
};
const useUpdateStatusPopupHook = ({ isOpen, handleToggle, candidateId }) => {
  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.App_User);

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
    let required = ["status"];
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

      // const fd = new FormData();
      // fd.append("id", candidateId);
      // fd.append("status", form?.status);
     
      const updatedData={
        id:candidateId,
        status:form?.status
      }
      serviceUpdateUserStatus(updatedData).then((res) => {
        if (!res.error) {
          SnackbarUtils.success("Status updated successfully");
          handleToggle();
          // window.location.reload()
          dispatch(actionDetailAppUser({ id: candidateId }));
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

export default useUpdateStatusPopupHook;
