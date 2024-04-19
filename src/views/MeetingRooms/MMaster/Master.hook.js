import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import React from "react";
import { useParams } from "react-router";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import historyUtils from "../../../libs/history.utils";
import {
  serviceCreateMMeeting,
  serviceMMeetingDetails,
} from "../../../services/MMeeting.service";

const initialForm = {
  event_id: "",
  duration: "",
  slots: [],
};

const useMMasterCreate = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isBond, setIsBond] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [declaration, setDeclaration] = useState(false);
  const [employeeDetails, setEmployeeDetails] = useState({});
  const travelRef = useRef(null);
  const otherRef = useRef(null);
  const coRef = useRef(null);
  const [isChecked, setIsChecked] = React.useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  const { id } = useParams();

  useEffect(() => {
    Promise.allSettled([serviceMMeetingDetails({ event_id: id })]).then(
      (promises) => {
        const empDetail = promises[0]?.value?.data;
        setEmployeeDetails(empDetail);
      }
    );
  }, []);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = [];
    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
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

  useEffect(()=>{
    if(id){
      serviceMMeetingDetails({event_id:id}).then((res)=>{
        const details = res?.data;
        setForm({
          duration:details?.duration,
          slots:details?.slots,
          event_id:details?.event_id,
        })
      })
    }
  },[id])

  const submitToServer = useCallback(
    () => {
      if (!isSubmitting) {
        setIsLoading(true);
        setIsSubmitting(true);
        
        const ExpensesData = otherRef.current.getData();

        let req = serviceCreateMMeeting;
        req({duration:form?.duration,slots:ExpensesData,event_id:`${id}`}).then((res) => {
          if (!res.error) {
            historyUtils.goBack();
          } else {
            SnackbarUtils.error(res?.message);
          }
          setIsLoading(false);
          setIsSubmitting(false);
        });
      }
    },
    [form, isSubmitting, setIsSubmitting, id, setIsChecked, isChecked],
    isBond,
    setIsBond
  );

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();

    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }
    submitToServer();
  }, [
    checkFormValidation,
    setErrorData,
    submitToServer,
    setIsChecked,
    isChecked,
    isBond,
    setIsBond,
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
      // LogUtils.log(text, fieldName);
      let shouldRemoveError = true;
      const t = { ...form };
      t[fieldName] = text;
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
    handleDelete,
    handleReset,
    declaration,
    setDeclaration,
    employeeDetails,
    travelRef,
    otherRef,
    isChecked,
    handleCheckboxChange,
    employees,
    isBond,
    coRef,
  };
};

export default useMMasterCreate;
