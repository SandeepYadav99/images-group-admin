import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import {
  serviceCreateAward,
  serviceUpdateAward,
} from "../../../services/Award.servcice";
const initialForm = {
  contant: "",
  image: "",
};
const useUpdateAboutHook = ({ isSidePanel, aboutData, handleClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState("");
  const [form, setForm] = useState({ ...initialForm });

  const { id } = useParams();

  useEffect(() => {
    if (aboutData) {
      setForm({
        ...form,
        ...aboutData,
      });
      setImage(aboutData?.default_image ? aboutData?.default_image : "");
    }
  }, [aboutData]);
  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["contant"];
    // if (!id) {
    //   required.push("thumbnail");
    // }
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

  const submitToServer = useCallback(() => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      const fd = new FormData();
      fd.append("content", form?.contant);
      if (form?.image) {
        fd.append("image", form?.image);
      }
      fd.append("event_id", id);
      let req = serviceCreateAward;
      if (aboutData?.id) {
        fd.append("id", aboutData?.id);
        req = serviceUpdateAward;
      }

      req(fd).then((res) => {
        if (!res.error) {
          handleClose();
          // historyUtils.push("/business-list");
        } else {
          SnackbarUtils.success(res.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting, id, aboutData]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }
    setIsSubmitting(true);
    submitToServer();
  }, [checkFormValidation, setErrorData, form, id, aboutData]);

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
      if (fieldName === "contant") {
        t[fieldName] = text;
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

  useEffect(() => {
    if (!isSidePanel) {
      handleReset();
    }
  }, [isSidePanel]);

  return {
    form,
    handleSubmit,
    changeTextData,
    onBlurHandler,
    image,
  };
};

export default useUpdateAboutHook;