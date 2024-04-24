import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";

import SnackbarUtils from "../../../../libs/SnackbarUtils";
import {
  serviceCreateAwardCategory,
  serviceUpdateAwardCategory,
} from "../../../../services/Award.servcice";

const initialForm = {
  description: "",
  image: "",
  title: "",
};
const useAwardCategoriesCreate = ({ isSidePanel, selectedData, awardId ,handleCallDetail}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState("");
  const [form, setForm] = useState({ ...initialForm });
 
  
  useEffect(() => {
    if (selectedData?.id) {
      setForm({
        ...form,
        title: selectedData?.title,
        description: selectedData?.description,
      });
      setImage(selectedData?.image);
    }
  }, [selectedData]);

  const { id } = useParams();

  const [selectImages, setSelectImages] = useState([]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["description"];
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
      fd.append("description", form?.description);
      fd.append("title", form?.title);
      if (form?.image) {
        fd.append("image", form?.image);
      }
      if (awardId) {
        fd.append("award_id", awardId);
      }
      if(selectedData?.id){
        fd.append("id",selectedData?.id)
      }
      let req = serviceCreateAwardCategory;
      if (selectedData?.id) {
        req = serviceUpdateAwardCategory;
      }
      req(fd).then((res) => {
        if (!res.error) {
          handleCallDetail()
        } else {
          SnackbarUtils.success(res.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting, id, selectedData, awardId]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }
    setIsSubmitting(true);
    submitToServer();
  }, [checkFormValidation, setErrorData, form, selectedData, awardId]);

  const removeError = useCallback(
    (title) => {
      const temp = JSON.parse(JSON.stringify(errorData));
      temp[title] = false;
      setErrorData(temp);
    },
    [setErrorData, errorData]
  );
  const renderImages = (image) => {
    setSelectImages([...image]);
  };

  const changeTextData = useCallback(
    (text, fieldName) => {
      let shouldRemoveError = true;
      const t = { ...form };
      if (fieldName === "description") {
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
    errorData
  };
};

export default useAwardCategoriesCreate;
