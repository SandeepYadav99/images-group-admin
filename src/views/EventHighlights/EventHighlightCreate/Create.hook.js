import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { serviceGetList } from "../../../services/Common.service";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import LogUtils from "../../../libs/LogUtils";
import {
  serviceCreateAlbumList,
  serviceGetAlbumDetails,
  serviceUpdateAlbumList,
} from "../../../services/GalleryAlbum.service";
import { isDate, isInvalidDateFormat } from "../../../libs/RegexUtils";
import historyUtils from "../../../libs/history.utils";
import constants from "../../../config/constants";

const useEventHighLightCreateHook = () => {
  const initialForm = {
    name: "",
    thumbnail: "",
    link:"",
    priority:"",
  
    status: true,

  };
  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [thumbnail, setThumbnail] = useState("");
 


  useEffect(() => {
    if (id) {
      serviceGetAlbumDetails({ id: id }).then((res) => {
        if (!res.error) {
          const data = res?.data?.details;
          setThumbnail(data?.thumbnail);
          setForm({
            ...form,
            name: data?.name,
            link:data?.link,
            priority:data?.priority,
            status: data?.status === constants.GENERAL_STATUS.ACTIVE,
          });
        } else {
          SnackbarUtils.error(res?.message);
        }
      });
    }
  }, [id]);



  const checkFormValidation = useCallback(() => {
    const errors = {};

    const requiredFields = [
      "name",
      "priority",
      
      ...(id ? [] : ["thumbnail"]),
    ];


    requiredFields.forEach((field) => {
      if (
        (!form?.[field] && parseInt(form?.[field]) !== 0) ||
        (Array.isArray(form?.[field]) && form?.[field]?.length === 0)
      ) {
        errors[field] = true;
      }

    });

    return errors;
  }, [form, id]);

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
        t[fieldName] = text;
      } else {
        t[fieldName] = text;
      }
      setForm(t);
      shouldRemoveError && removeError(fieldName);
    },
    [removeError, form, setForm]
  );

  const submitToServer = useCallback(
    (status) => {
      if (!isSubmitting) {
        setIsSubmitting(true);
        const fd = new FormData();

       

       

        Object.keys(form).forEach((key) => {
         
            if (key === "status") {
              fd.append(key, form[key] ? "ACTIVE" : "INACTIVE");
            }
             else {
              fd.append(key, form[key]);
            }
        });

        if (form?.thumbnail) {
          fd.append("thumbnail", form?.thumbnail);
        }

        if (id) {
          fd.append("id", id);
        }

       

        let req;
        if (id) {
          req = serviceUpdateAlbumList(fd);
        } else {
          req = serviceCreateAlbumList(fd);
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
    },
    [
      form,
      isSubmitting,
      setIsSubmitting,
      id,
    ]
  );

  const onBlurHandler = useCallback(
    (type) => {
      if (form?.[type]) {
        changeTextData(form?.[type].trim(), type);
      }
    },
    [changeTextData]
  );

  const handleSubmit = useCallback(
    async (status) => {
      const errors = checkFormValidation();
      LogUtils.log("errors==>", errors);
      if (Object.keys(errors)?.length > 0) {
        setErrorData(errors);
        return true;
      }
      submitToServer(status);
    },
    [
      setErrorData,
      form,
      submitToServer,
      checkFormValidation,
    ]
  );

  return {
    form,
    errorData,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isSubmitting,
    id,
    thumbnail,
    setThumbnail,
  };
};

export default useEventHighLightCreateHook;
