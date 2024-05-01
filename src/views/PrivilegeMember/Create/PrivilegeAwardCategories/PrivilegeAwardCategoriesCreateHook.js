import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";

import SnackbarUtils from "../../../../libs/SnackbarUtils";
import {
  serviceCreateAwardCategory,
  serviceUpdateAwardCategory,
} from "../../../../services/Award.servcice";
import {
  serviceCreateMemberCategory,
  serviceUpdateMemberCategory,
} from "../../../../services/PrivilegeMember.services";

const initialForm = {
  description: "",
  title: "",
};
const useAwardCategoriesCreate = ({
  isSidePanel,
  selectedData,
  awardId,
  handleCallDetail,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState("");
  const [form, setForm] = useState({ ...initialForm });
  const [selectImages, setSelectImages] = useState([]);

  useEffect(() => {
    if (!isSidePanel) {
      setErrorData({});
      setForm({ ...initialForm });
      setImage(null);
    }
  }, [isSidePanel]);

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

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["description", "title"];

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

      const payloadData = {
        description: form?.description,
        title: form?.title,
        privilaged_member_id: awardId,
      };

      const payloadUpdate = {
        description: form?.description,
        title: form?.title,
        privilaged_member_id: awardId,
        id: selectedData?.id,
      };

      let req;
      if (selectedData?.id) {
        req = serviceUpdateMemberCategory(payloadUpdate);
      } else {
        req = serviceCreateMemberCategory(payloadData);
      }
      req.then((res) => {
        if (!res.error) {
          handleCallDetail();
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
    // setIsSubmitting(true);
    submitToServer();
  }, [
    checkFormValidation,
    setErrorData,
    form,
    selectedData,
    awardId,
    isSubmitting,
    setIsSubmitting,
  ]);

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
    errorData,
    isSubmitting,
  };
};

export default useAwardCategoriesCreate;
