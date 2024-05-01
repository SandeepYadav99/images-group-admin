import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import {
  isDate,
  isEmail,
  isInstagram,
  isValidSocialMedia,
  validateUrl,
} from "../../../libs/RegexUtils";
import { useParams } from "react-router";
import { serviceGetList } from "../../../services/Common.service";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import historyUtils from "../../../libs/history.utils";
import LogUtils from "../../../libs/LogUtils";
import {
  serviceCreateSponsporVideo,
  serviceGetSponsporVideoDetails,
  serviceUpdateSponsporVideo,
} from "../../../services/SponsporVideo.service";
import { useMemo } from "react";
import constants from "../../../config/constants";

function useVideoCreate({ location }) {
  const initialForm = {
    name: "",
    video: "",
    status: true,
    // image:""
  };
  const [form, setForm] = useState({ ...initialForm });
  const [img, setImg] = useState("");
  const [errorData, setErrorData] = useState({});
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage]=useState("")
  const [listData, setListData] = useState({
    SPONSOR_TYPE: [],
  });
  const [countryCode, setCountryCode] = useState("");
  const [selectVideos, setSelectVideos] = useState([]);
  const [videoData,setVideoData] = useState('')

  const renderVideo = (videos) => {
    setSelectVideos([...videos]);
  };

  
  const handleCountryCodeChange = (e) => {
    setCountryCode(e.target.value);
  };
  const [event, setEvent] = useState("");
  const selectedEventId = useMemo(() => {
    return location?.state?.eventId ? location?.state?.eventId : event;
  }, [location, event, setEvent]);

  useEffect(() => {
    serviceGetList(["SPONSOR_TYPE"], { event_id: selectedEventId }).then(
      (res) => {
        if (!res.error) {
          setListData(res.data);
        }
      }
    );
  }, [event]);

  useEffect(() => {
    if (id) {
      serviceGetSponsporVideoDetails({ id: id }).then((res) => {
        if (!res.error) {
          const data = res?.data;
          setVideoData(data?.video);
          // setImage(data?.image)
          setForm({
            name:data?.name,
            status: data?.status === constants.GENERAL_STATUS.ACTIVE,
            video:null
          })
        } else {
          SnackbarUtils.error(res?.message);
        }
      });
    }
  }, [id]);


  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["name"];

    if(!id){
      required.push(...["video"])
    }

    required.forEach((val) => {
      if (
        (!form?.[val] && parseInt(form?.[val]) != 0) ||
        (Array.isArray(form?.[val]) && form?.[val]?.length === 0)
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
          if(key !=="video"){
            if (key === "status") {
              fd.append(key, form[key] ? "ACTIVE" : "INACTIVE");
            }
            else {
              fd.append(key, form[key]);
            }
          }
        });
        if(form?.video){
          fd.append("video",form?.video)
        }
        fd.append("event_id", selectedEventId );
        let req;
        if (id) {
          fd.append("id",id);
          req = serviceUpdateSponsporVideo(fd);
        } else {
          req = serviceCreateSponsporVideo(fd);
        }
        req.then((res) => {
          if (!res.error) {
            historyUtils.goBack();
          } else {
            SnackbarUtils.error(res?.message);
          }
          setIsSubmitting(false);
        });
      }
    },
    [form, isSubmitting, setIsSubmitting]
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
      if (Object.keys(errors)?.length > 0) {
        setErrorData(errors);
        return true;
      }
      submitToServer(status);
    },
    [checkFormValidation, setErrorData, form, submitToServer]
  );

  return {
    form,
    errorData,
    listData,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isSubmitting,
    img,
    id,
    setImg,
    countryCode,
    handleCountryCodeChange,
    selectVideos,
    renderVideo,
    videoData,
    image
  };
}

export default useVideoCreate;
