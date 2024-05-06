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

import {
  serviceAdminUserCheck,
  serviceAdminUserCheckExist,
  serviceCreateAdminUser,
  serviceGetAdminUserDetails,
  serviceUpdateAdminUser,
  serviceUpdateAdminUserSearch,
} from "../../../services/AdminUser.service";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import Constants from "../../../config/constants";
import { getCountryCode } from "../../../libs/general.utils";
import { cleanContactNumber } from "../../../helper/helper";
const initialForm = {
  name: "",
  contact: "",
  email: "",
  password: "",
  type: "ADMIN",
  role: "",
  country_code: "",
  status: true,
};

const useAdminCreate = ({ handleToggleSidePannel, isSidePanel, empId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordCurrent, setShowPasswordCurrent] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [isEdit, setIsEdit] = useState(false);
  const includeRef = useRef(null);
  const [isRejectPopUp, setIsRejectPopUp] = useState(false);
  const [dataValue, setDataValue] = useState({});
  const [countryCode, setCountryCode] = useState();
  const [contactErr, setContactErr] = useState();
  const codeDebouncer = useDebounce(form?.contact, 500);
  const emailDebouncer = useDebounce(form?.email, 900);
  useEffect(() => {
    setContactErr(empId);
  }, [empId, form?.contact]);

  const handleCountryCode = (e) => {
    setCountryCode(e.target.value);
  };

  useEffect(() => {
    if (!countryCode) {
      setCountryCode("91");
    }
  }, []);

  useEffect(() => {
    if (empId) {
      serviceGetAdminUserDetails({ id: empId }).then((res) => {
        if (!res.error) {
          const data = res?.data?.details;
          const contactSplit = data?.full_contact?.split(" ");
          const countryCode = getCountryCode(contactSplit[0]);
          setForm({
            ...form,
            name: data?.name,
            contact: data?.full_contact,
            email: data?.email,
            country_code: countryCode,
            role: data?.role,
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

  useEffect(() => {
    const temp = form?.contact?.split(" ");
    if (temp[1]?.replace("-","")?.length === 10) {
      serviceUpdateAdminUserSearch({
        contact: `${cleanContactNumber(form?.contact)}`,
      })?.then((res) => {
        const response = res?.data;
        const contactSplit = response?.full_contact?.split(" ");
        const countryCode = getCountryCode(contactSplit[0]);
        
        setContactErr(response?.id);
        setForm({
          ...form,
          name: response?.name,
          contact: response?.full_contact,
          email: response?.email,
          role: response?.role,
          status: response?.status === Constants.GENERAL_STATUS.ACTIVE,
          country_code: countryCode,
        });
      });
    } else if (temp[1]?.length < 10) {
      setContactErr("");
      setForm({
        ...form,
        contact:form?.contact,
      });
    }
  }, [form?.contact]);

 

 
  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    const temp = form?.contact?.split(" ");
    let required = [
      "name",
      // "country_code",
      "contact",
      "email",
      // "password",
      // "type",
      "role",
      // "image",
    ];
    if (!empId || !contactErr) {
      required?.push("password");
    }
    if (empId || contactErr) {
      const indexData = required?.indexOf("password");
      required.splice(indexData, 1);
    }
    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
      } else if (["code"].indexOf(val) < 0) {
        delete errors[val];
      } else if (["contact"].indexOf(val) < 0) {
        delete errors[val];
      }
      if (form?.email && !isEmail(form?.email)) {
        errors["email"] = true;
      }
    });
    if (temp[1]?.replace("-", "")?.length < 10) {
      errors["contact"] = true;
    }
    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData, contactErr]);

  const submitToServer = useCallback(() => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      const fd = new FormData();
      Object.keys(form).forEach((key) => {
        if (key === "status") {
          fd.append(key, form[key] ? "ACTIVE" : "INACTIVE");
        } else if (key === "contact") {
          fd.append(key, cleanContactNumber(form?.contact));
        } else {
          fd.append(key, form[key]);
        }
      });
      fd.delete("country_code");

      // if (empId && contactErr) {
      //   fd.delete("password");
      //   // fd.delete("country_code");
      //   fd.append("id", empId);
      // }
      if (contactErr) {
        fd.delete("password");
        fd.append("id", contactErr);
      }
      let req;

      if (contactErr) {
        req = serviceUpdateAdminUser(fd);
      } else {
        req = serviceCreateAdminUser(fd);
      }

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
    
      console.log('Form has validation errors:', errorData);
      // return true;
    }
     await submitToServer();
  }, [checkFormValidation,  form, includeRef.current, errorData]);
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
        if (!text || (!isSpace(text) && isAlphaNumChars(text))) {
          t[fieldName] = text.toUpperCase();
        }
        shouldRemoveError = false;
      } else if (fieldName === "contact") {
        // if (text >= 0 && text?.length <= 10) {
        t[fieldName] = text;
        // }
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
     setErrorData({});
  }, [form]);

  const toggleRejectDialog = useCallback(
    (obj) => {
      setIsRejectPopUp((e) => !e);
      setDataValue({ ...obj });
      // handleSubmit()
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
    handleDelete,
    includeRef,
    handleReset,
    empId,
    showPasswordCurrent,
    setShowPasswordCurrent,
    isRejectPopUp,
    setIsRejectPopUp,
    handleCountryCode,
    countryCode,
    toggleRejectDialog,
    contactErr
  };
};

export default useAdminCreate;
