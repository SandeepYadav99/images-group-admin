import { useCallback, useEffect, useState } from "react";
import historyUtils from "../../../../libs/history.utils";
import SnackbarUtils from "../../../../libs/SnackbarUtils";
import RouteName from "../../../../routes/Route.name";
import { serviceGetList } from "../../../../services/index.services";
import { useParams } from "react-router";
import { serviceUpdateEventGallery } from "../../../../services/EventGallery.service";
import {
  serviceAssociatedCommonList,
  serviceAssociatedSpeaker,
} from "../../../../services/EventSpeaker.service";

const initialForm = {
  album_id: [],
};
const useAssociateDialogHook = ({ isOpen, handleToggle, data }) => {
  const [form, setForm] = useState(
    JSON.parse(JSON.stringify({ ...initialForm }))
  );
  const [errorData, setErrorData] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [listData, setListData] = useState({
    SPEAKERS: [],
  });
  const [speakerList,setSpeakerList] = useState([])

  const { id } = useParams();
  useEffect(() => {
    if (data?.length > 0) {
      const value = data?.map((item) => ({
        id: item?.id,
        name: item?.s_name,
        image: item?.s_image,
        is_featured: item?.is_featured,
        is_recommended: item?.is_recommended,
      }));
      setForm({ ...form, album_id: [...value] });
    }
  }, [data]);

  useEffect(() => {
    const filteredSpeakers = [];

    listData?.SPEAKERS?.forEach((val) => {
      const exist = form?.album_id?.some((opt) => opt?.id === val?.id);
      if (!exist) {
        filteredSpeakers.push(val);
      }
      setSpeakerList(filteredSpeakers);
    });
  }, [form, listData]);


  const removeError = useCallback(
    (title) => {
      const temp = JSON.parse(JSON.stringify(errorData));
      temp[title] = false;
      setErrorData(temp);
    },
    [setErrorData, errorData]
  );

  useEffect(() => {
    serviceAssociatedCommonList({ list: ["SPEAKERS"], event_id: id }).then(
      (res) => {
        if (!res.error) {
          setListData(res.data);
        }
      }
    );
  }, []);

  const changeTextData = useCallback(
    (text, fieldName) => {
      let shouldRemoveError = true;
      const t = { ...form };
      if (fieldName === "album_id") {
        t[fieldName] = text.filter((item, index, self) => {
          return index === self.findIndex((i) => i.id === item.id);
        });
      } else {
        t[fieldName] = text;
      }
      setForm(t);
      shouldRemoveError && removeError(fieldName);
    },
    [removeError, form, setForm]
  );

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["album_id"];
    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
      } else if ([].indexOf(val) < 0) {
        delete errors[val];
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
      const alumId =
        form?.album_id?.length > 0
          ? form?.album_id?.map((item) => ({
              id: item?.id,
              is_featured: item?.is_featured,
              is_recommended: item?.is_recommended,
            }))
          : [];
      const UniqueValue = [...new Set(alumId)];
      console.log({ UniqueValue });
      const uniqueObj =
        UniqueValue?.length > 0
          ? UniqueValue?.map((item) => ({
              speaker_id: item?.id,
              is_featured: item?.is_featured,
              is_recommended: item?.is_recommended,
            }))
          : [];

      serviceUpdateEventGallery({
        event_id: id,
        data: uniqueObj,
      }).then((res) => {
        if (!res.error) {
          SnackbarUtils.success("Added Successfully");
          handleToggle();
          window.location?.reload();
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting, handleToggle]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    console.log("===?", form, errors);
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }
    submitToServer();
  }, [checkFormValidation, setErrorData, form, submitToServer]);

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
    isSubmitted,
    listData,
    speakerList,
  };
};

export default useAssociateDialogHook;
