import React, { useCallback, useEffect, useMemo } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import historyUtils from "../../../libs/history.utils";
import constants from "../../../config/constants";
import RouteName from "../../../routes/Route.name";
import {
  serviceCreateInfoCenter,
  serviceGetInfoCenterDetails,
  serviceUpdateInfoCenter,
} from "../../../services/InfoCenter.service";
import { serviceGetPendingEventListDetails } from "../../../services/PendingEventList.service";
import { EventData } from "../../../helper/helper";
import {
  serviceCreateMenuGraphic,
  serviceDeleteMenuGraphicFeaturesList,
  serviceGetMenuGraphicDetails,
  serviceUpdateMenuGraphic,
} from "../../../services/MenuGraphic.service";
import { useLocation } from "react-router-dom";

function useMenuGraphicCreateHook() {
  const initialForm = {
    event_id: "",
    featureName: "",
    priority: "",
    file: "",
    thumbnail: "",
    status: true,
  };

  const location = useLocation();
  const selectedEventId = useMemo(() => {
    return location?.state?.event_id;
  }, [location]);
  console.log(selectedEventId, "Event ID");

  const { id } = useParams();
  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState("");

  const [featureValue, setfeatureValue] = useState([]);
  const [employeeDetail, setEmployeeDetail] = useState({});
  const [employDetail, setEmployeDetail] = useState();
  const eventKeys = [...EventData];
  console.log({ selectedEventId });

  useEffect(() => {
    let req = serviceGetPendingEventListDetails({ id: selectedEventId });
    req.then((data) => {
      setEmployeeDetail(data?.data?.details);
    });
  }, [id]);
  // useEffect(() => {
  //   serviceDeleteMenuGraphicFeaturesList({id:"65029c5bdf6918136df27e51"}).then((res)=>{
  //     if(!res.error){
  //       const data = res.data
  //       setEmployeeDetail(data);
  //     }
  //   })

  // }, [id])

  useEffect(() => {
    if (employeeDetail && eventKeys?.length > 0) {
      const feature = { ...employeeDetail?.features };
      let filteredValue = eventKeys.filter(
        (item) => feature[item?.key] !== undefined && feature[item?.key]
      );
      setfeatureValue(filteredValue);
    }
  }, [id, employeeDetail]);

  useEffect(() => {
    if (id) {
      serviceGetMenuGraphicDetails({ id: id }).then((res) => {
        if (!res.error) {
          const data = res?.data;
          setImage(data?.image);
          setEmployeDetail(data?.name);
          setForm({
            ...form,
            id: id,
            featureName: data?.name,
            priority: data?.priority,

            status: data?.status === constants.GENERAL_STATUS.ACTIVE,
          });
        } else {
          SnackbarUtils.error(res?.message);
        }
      });
    }
  }, [selectedEventId, id]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = [
      // "s_image",
      "featureName",
      // "file",
      "priority",
      // "thumbnail",
    ];

    if (!id) {
      required.push("thumbnail") && required.push("file");
    }

    required.forEach((val) => {
      if (
        (!form?.[val] && parseInt(form?.[val]) != 0) ||
        (Array.isArray(form?.[val]) && form?.[val]?.length === 0)
      ) {
        errors[val] = true;
      }
    });
    if (form?.file.size <= 5 * 1024 * 1024) {
      errors["file"] = false;
    }
    // else {
    //   SnackbarUtils.error("Maximum File Upload Size 5 MB");
    //   errors["file"] = true;
    // }

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

      if (fieldName === "featureName") {
        t[fieldName] = text;
      } else if (fieldName === "priority") {
        if (text >= 0) {
          t[fieldName] = text;
        }
      } else {
        t[fieldName] = text;
      }
      setForm(t);
      shouldRemoveError && removeError(fieldName);
    },
    [removeError, form, setForm]
  );
  console.log({ form });
  const submitToServer = useCallback(
    (status) => {
      if (!isSubmitting) {
        setIsSubmitting(true);
        const fd = new FormData();

        // for (const key in form) {
        //   if (form.hasOwnProperty(key)) {
        //     if (key === "status") {
        //       fd.append(key, form[key] ? "ACTIVE" : "INACTIVE");
        //     } else if (key === "event_id") {
        //       fd.append("event_id", selectedEventId);
        //     } else if (["thumbnail", "status", "event_id"].indexOf(key) < 0) {
        //       fd.append(key, form[key]);
        //     }
        //   }
        // }
        fd.append("name", form?.featureName?.name || employDetail);
        fd.append("priority", form?.priority);
        fd.append("status", form?.status === true ? "ACTIVE" : "INACTIVE");
        fd.append("event_id", selectedEventId);
        if (form?.thumbnail) {
          fd.append("image", form?.thumbnail);
        }
        if (id) {
          fd.append("id", id);
        }
        const req = id
          ? serviceUpdateMenuGraphic(fd)
          : serviceCreateMenuGraphic(fd);

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
    [form, isSubmitting, setIsSubmitting, id, selectedEventId]
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
        // return true;
      }
      submitToServer(status);
    },
    [checkFormValidation, setErrorData, form, submitToServer]
  );

  return {
    form,
    errorData,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isSubmitting,
    image,
    id,
    featureValue,
    employDetail,
  };
}

export default useMenuGraphicCreateHook;
