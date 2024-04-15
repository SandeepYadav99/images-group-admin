import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import historyUtils from "../../../libs/history.utils";
import LogUtils from "../../../libs/LogUtils";
import {
  serviceCreateEventBanner,
  serviceGetEventBannerDetails,
  serviceUpdateEventBanner,
} from "../../../services/EventBanner.service";
import { useMemo } from "react";
import { validateUrl } from "../../../libs/RegexUtils";
import {
  serviceCreateSplashScreen,
  serviceGetSplashScreenDetails,
  serviceUpdateSplashScreen,
} from "../../../services/SplashScreen.service";

function useSplashScreenCreateHook({ location }) {
  const initialForm = {
    name: "",
    event_id: "",
    video: null,
    link: "",
    status: true,
  };
  const [form, setForm] = useState({ ...initialForm });
  const [image, setImage] = useState("");
  const [errorData, setErrorData] = useState({});
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLinkDisabled, setIsLinkDisabled] = useState(false);
  const selectedEventId = useMemo(() => {
    return location?.state?.eventId;
  }, [location]);
  const [selectVideos, setSelectVideos] = useState([]);
console.log(selectVideos, "Videos")
  const renderVideo = (videos) => {
    console.log(videos, "Videos")
    setSelectVideos([...videos]);
  };
  useEffect(() => {
    if (id) {
      serviceGetSplashScreenDetails({ id: id }).then((res) => {
        if (!res.error) {
          const data = res?.data?.details;
          setForm({
            ...form,
            id: id,
            name: data?.name,

            link: data?.link,
            status: data?.status === "ACTIVE" ? "ACTIVE" : "INACTIVE",
          });
          setImage(data?.video);
        } else {
          SnackbarUtils.error(res?.message);
          historyUtils.goBack();
        }
      });
    }
  }, [id]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["link", "name"];

    if (!id) {
      required.push("video");
    }
    // if (!image) {
    //   required.push("image");
    // }

    required.forEach((val) => {
      if (
        (!form?.[val] && parseInt(form?.[val]) !== 0) ||
        (Array.isArray(form?.[val]) && form?.[val]?.length === 0)
      ) {
        errors[val] = true;
      }
    });
    if (form?.link && !validateUrl(form?.link)) {
      errors.link = true;
      SnackbarUtils.error("Please Enter the Valid Link");
    }

    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData, image, setImage]);

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
        t[fieldName] = text.trimStart();
      } else {
        t[fieldName] = text;
      }
      setForm(t);
      shouldRemoveError && removeError(fieldName);
    },
    [removeError, form, setForm]
  );
  console.log(form, "FORM");
  const submitToServer = useCallback(() => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      const fd = new FormData();

      console.log(form, "Key");
      // Object.keys(form).forEach((key) => {
      //   LogUtils.log("key", key);
      //   if (key !== "image") {
      //     if (key === "status") {
      //       fd.append(key, form[key] ? "ACTIVE" : "INACTIVE");
      //     } else {
      //       fd.append(key, form[key]);
      //     }
      //   }
      // });

      const SPEAKER_KEY = {
        name: "name",
        // video: "video",
        link: "link",
      
        // status: "status",
      };
      for (const key in form) {
        if (SPEAKER_KEY.hasOwnProperty(key)) {
          fd.append(SPEAKER_KEY[key], form[key]);
        }
      }
      fd.append("event_id", "65029c5bdf6918136df27e51")
      fd.append("id", id)
      if (form?.status) {
        fd.append("status", form?.status ? "ACTIVE" : "INACTIVE");
      }
      if (form?.video) {
        fd.append("video", form?.video);
      }

      // if (selectedEventId) {
      //   fd.append("event_id", selectedEventId);
      // }

      let req;
      if (id) {
        req = serviceUpdateSplashScreen;
      } else {
        req = serviceCreateSplashScreen;
      }
      req(fd).then((res) => {
        if (!res.error) {
          historyUtils.goBack();
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting, selectedEventId]);

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
      console.log("yha");
      submitToServer();
    },
    [checkFormValidation, setErrorData, form, submitToServer, selectedEventId]
  );

  console.log("form", form);
  return {
    form,
    errorData,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isSubmitting,
    image,
    setImage,
    isLinkDisabled,
    setIsLinkDisabled,
    renderVideo,
    selectVideos,
  };
}

export default useSplashScreenCreateHook;
