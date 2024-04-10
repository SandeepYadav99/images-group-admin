import { useCallback, useEffect, useState } from "react";
import SnackbarUtils from "../../../../../libs/SnackbarUtils";

import { useParams } from "react-router-dom";

const initialForm = {
  file: null,
  is_active_email: true,
  is_active_registration:true,
  participants_type:"",
};

const useUploadCsvDialogHook = ({
  orderId,
  isOpen,
  handleToggle,
  handleCsvUpload,
}) => {
  const [form, setForm] = useState(
    JSON.parse(JSON.stringify({ ...initialForm }))
  );
  const [errorData, setErrorData] = useState({});
  const [showPasswordCurrent, setShowPasswordCurrent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [resData, setResData] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (isOpen) {
      setForm({ ...initialForm });
      setResData([]);
      setIsSubmitted(false);
      setIsVerified(false);
      setErrorData({});
    }
  }, [isOpen]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["file"];
    required.forEach((val) => {
      if (!form?.[val]) {
        errors[val] = true;
      }
    });
    // if (isVerified) {
    //   // if (!form?.password) {
    //   //   errors["password"] = true;
    //   // } else {
    //   //   delete errors["password"];
    //   // }
    // }
    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });

    return errors;
  }, [form, errorData, isVerified, setIsVerified]);

  const handleSampleDownload = useCallback(() => {
    // serviceDownloadSampleCSv().then((res) => {
    //   if (!res.error) {
    //     const data = res.data?.file;
    //     window.open(data, "_blank");
    //   }
    // });
  }, []);

  const serviceParticipantImportFile =(params)=>{
  console.log(params)
  }

  const submitToServer = useCallback(() => {
    if (!isSubmitting) {
      setResData([]);
      setIsSubmitting(true);
      const fd = new FormData();
      //   Object.keys(form).forEach((key) => {
      //     fd.append(key, form[key]);
      //   });
      fd.append("file", form?.file);
      if (isVerified) {
        fd.append("send_email", form?.is_active_email);
        fd.append("is_default_password", form?.is_active_registration);
        fd.append("event_id", id);
      }
      let req = serviceParticipantImportFile
        
      // let req = 
      //  serviceParticipantImportFile

      req(fd).then((res) => {
        if (!res.error) {
          if (isVerified) {
            handleCsvUpload();
            handleToggle();
            SnackbarUtils.success("Employee Data Imported Successfully");
          }
          if (res?.data?.length === 0) {
            setIsVerified((e) => !e);
          }
          setIsSubmitted(true);
          setResData(res.data);
        }else{
          SnackbarUtils.error("Upload failed")
        }
        setIsSubmitting(false);
      });
    }
  }, [
    form,
    isSubmitting,
    setIsSubmitting,
    orderId,
    handleToggle,
    setIsSubmitting,
    setResData,
    handleCsvUpload,
    isVerified,
    setIsVerified,
    id,
  ]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const errors = checkFormValidation();
      if (Object.keys(errors).length > 0) {
        setErrorData(errors);
        return true;
      }
      submitToServer();
    },
    [
      checkFormValidation,
      setErrorData,
      form,
      submitToServer,
      id,
      isVerified,
      setIsVerified,
    ]
  );

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
      setIsVerified(false);
    },
    [removeError, form, setForm, setIsVerified]
  );

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
    resData,
    isSubmitted,
    isVerified,
    showPasswordCurrent,
    setShowPasswordCurrent,
    handleSampleDownload,
  };
};

export default useUploadCsvDialogHook;
