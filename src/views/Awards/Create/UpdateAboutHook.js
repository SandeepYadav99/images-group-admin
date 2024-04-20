
import  { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router';

import { serviceCreateBusinessList, serviceUpdateBusinessList } from '../../../services/BusinessGreeting.service';
import historyUtils from '../../../libs/history.utils';
import SnackbarUtils from '../../../libs/SnackbarUtils';
const initialForm ={
  about:""
}
const useUpdateAboutHook = ({isSidePanel}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState("");
  const [form, setForm] = useState({ ...initialForm });
 

  const { id } = useParams();

  const [selectImages, setSelectImages] = useState([]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["about"];
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
  
      let req = serviceCreateBusinessList;
      if (id) {
        req = serviceUpdateBusinessList;
      }

      req(fd).then((res) => {
        if (!res.error) {
          historyUtils.push("/business-list");
        } else {
          SnackbarUtils.success(res.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting, id, selectImages]);


  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }
    setIsSubmitting(true);
    submitToServer();
  }, [checkFormValidation, setErrorData, form,selectImages]);

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
      if (fieldName === "about") {
     
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

  return{
    form,
    handleSubmit,
    changeTextData,
    onBlurHandler
  }
}

export default useUpdateAboutHook