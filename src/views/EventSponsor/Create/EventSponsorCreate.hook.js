import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import {
  isDate,
  isEmail,
  isInstagram,
  isNum,
  isValidSocialMedia,
  validateUrl,
} from "../../../libs/RegexUtils";
import { useParams } from "react-router";
import { serviceGetList } from "../../../services/Common.service";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import historyUtils from "../../../libs/history.utils";
import LogUtils from "../../../libs/LogUtils";
import {
  serviceCreateEventSponsor,
  serviceDetailsGetSponsorList,
  serviceGetEventSponsorDetails,
  serviceUpdateEventSponsor,
} from "../../../services/EventSponsor.service";
import nullImg from "../../../assets/img/null.png";
import { useMemo } from "react";
import { dataURLtoFile } from "../../../hooks/Helper";

function useEventSponsorCreate({ location }) {
  const initialForm = {
    name: "",
    web_url: "",
    img_url: "",
    priority: "",
    contact: "",
    type: "",
    twitter: "",
    company_profile: "",
    fb: "",
    linkedin: "",
    insta: "",
    youtube: "",
    status: true,
    is_featured: false,
    // country_code:"",
  };
  const [form, setForm] = useState({ ...initialForm });
  const [img, setImg] = useState("");
  const [errorData, setErrorData] = useState({});
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [listData, setListData] = useState({
    SPONSOR_TYPE: [],
  });
  const ChildenRef = useRef(null);
  const ChildenRef1 = useRef(null);
  const [countryCode, setCountryCode] = useState("91");
  const [downloads, setDownloads] = useState(null);
  const [downloadsDigitalBag, setDownloadsDigitalBag] = useState(null);
  const handleCountryCodeChange = useCallback(
    (e) => {
      setCountryCode(e.target.value);
    },
    [setCountryCode]
  );

  const [event, setEvent] = useState("");
  const selectedEventId = useMemo(() => {
    return location?.state?.eventId ? location?.state?.eventId : event;
  }, [location, event, setEvent]);

  const images = useMemo(() => {
    return img;
  }, [img]);
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
      serviceGetEventSponsorDetails({ id: id }).then((res) => {
        if (!res.error) {
          const data = res?.data;
          console.log("data", data);
          const fd = {};
          Object.keys({ ...initialForm }).forEach((key) => {
            if (key !== "img_url") {
              if (key === "type") {
                fd[key] = data["typeObj"]?._id;
              } else if (key === "status") {
                fd[key] = data[key] === "ACTIVE";
              } else if (key === "is_featured") {
                fd[key] = data[key] ? true : false;
              } else {
                fd[key] = data[key];
              }
            }
          });
          setEvent(data?.event_id);
          setForm({
            ...form,
            id: id,
            ...fd,
          });
          setDownloads(data?.downloads);
          setDownloadsDigitalBag(data?.digital_bags);

          setImg(data?.img_url);
          setCountryCode(data?.country_code);
        } else {
          SnackbarUtils.error(res?.message);
          historyUtils.goBack();
        }
      });
    }
  }, [id]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["name", "web_url", "priority", "contact", "type"];

    required.forEach((val) => {
      if (
        (!form?.[val] && parseInt(form?.[val]) != 0) ||
        (Array.isArray(form?.[val]) && form?.[val]?.length === 0)
      ) {
        errors[val] = true;
      }
    });

    if (form?.insta && !validateUrl(form?.insta)) {
      errors.insta = true;
      SnackbarUtils.error("Please Enter a Valid Instagram URL");
    }
    if (form?.fb && !validateUrl(form?.fb)) {
      errors.fb = true;
      SnackbarUtils.error("Please Enter a Valid Facebook URL");
    }
    if (form?.twitter && !validateUrl(form?.twitter)) {
      errors.twitter = true;
      SnackbarUtils.error("Please Enter a Valid Twitter URL");
    }
    if (form?.linkedin && !validateUrl(form?.linkedin)) {
      errors.linkedin = true;
      SnackbarUtils.error("Please Enter a Valid LinkedIn URL");
    }
    if (form?.youtube && !validateUrl(form?.youtube)) {
      errors.youtube = true;
      SnackbarUtils.error("Please Enter a Valid YouTube URL");
    }

    if (form?.email && !isEmail(form?.email)) {
      errors.email = true;
    }
    if (form?.web_url && !validateUrl(form?.web_url)) {
      errors.web_url = true;
      SnackbarUtils.error("Please Enter the Valid Url");
    }
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
      console.log(fieldName, text);
      let shouldRemoveError = true;
      const t = { ...form };
      if (fieldName === "name") {
        t[fieldName] = text;
      } else if (fieldName === "priority") {
        if (isNum(text)) {
          t[fieldName] = text;
        }
      } else if (fieldName === "contact") {
        if (text >= 0 && text?.length <= 10) {
          t[fieldName] = `${text}`;
        }
      } else {
        t[fieldName] = text;
      }
      setForm(t);
      shouldRemoveError && removeError(fieldName);
    },
    [removeError, form, setForm]
  );
  console.log({ images });
  const submitToServer = useCallback(
    (status) => {
      if (!isSubmitting) {
        setIsSubmitting(true);
        const fd = new FormData();

        Object.keys(form).forEach((key) => {
          LogUtils.log("key", key);
          if (key !== "img_url") {
            if (["member_users"].includes(key)) {
              fd.append(key, JSON.stringify(form[key]));
            } else if (key === "status") {
              fd.append("status", form[key] ? "ACTIVE" : "INACTIVE");
            } else if (key === "is_featured") {
              fd.append("is_featured", form?.is_featured ? true : false);
            } else {
              fd.append(key, form[key]);
            }
          }
        });
        if (countryCode) {
          fd.append("country_code", countryCode);
        }
        if (form?.img_url) {
          fd.append("img_url", form?.img_url);
        }
        console.log({ images , form});
        if (!images && !form?.img_url) {
          fd.append("is_image_removed", true);
        }
        if (selectedEventId) {
          fd.append("event_id", selectedEventId);
        }
        const ExpensesData = ChildenRef.current.getData();
        ExpensesData.forEach((val) => {
          console.log({ val });
          if (val?.documentUpload) {
            fd.append("download_documents", val?.documentUpload);
          }
        });
        fd.append("downloads", JSON.stringify(ExpensesData));

        const DigitalBag = ChildenRef1.current.getData();
        DigitalBag.forEach((val) => {
          if (val?.images) {
            fd.append("digital_bag_images", val?.images);
          }
        });
        fd.append("digital_bags", JSON.stringify(DigitalBag));
       
        let req;
        if (id) {
          req = serviceUpdateEventSponsor(fd);
        } else {
          req = serviceCreateEventSponsor(fd);
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
    [form, isSubmitting, setIsSubmitting, images, countryCode, setImg]
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
      const isIncludesValid = ChildenRef.current.isValid();
      const isIncludesValid1 = ChildenRef1.current.isValid();

      LogUtils.log("errors==>", errors);
      if (
        Object.keys(errors)?.length > 0 ||
        !isIncludesValid ||
        !isIncludesValid1
      ) {
        setErrorData(errors);

        return true;
      }
      submitToServer(status);
    },
    [
      checkFormValidation,
      setErrorData,
      form,
      submitToServer,
      images,
      countryCode,
      setImg,
    ]
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
    ChildenRef,
    ChildenRef1,
    downloads,
    downloadsDigitalBag,
    images,
  };
}

export default useEventSponsorCreate;
