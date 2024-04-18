import { useCallback, useEffect, useRef, useState } from "react";

import SnackbarUtils from "../../../libs/SnackbarUtils";
import { useParams } from "react-router";
import {
  serviceCreateExhibitors,
  serviceUpdateExhibitors,
  serviceExhibitorsList,
  serviceGetProductList,
  serviceGetExhibitorsDetails,
  debounceValidationList,
  servicesPartnerTypeList,
} from "../../../services/Exhibitor.service";
import historyUtils from "../../../libs/history.utils";
import { isEmail, validateUrl } from "../../../libs/RegexUtils";
import useDebounce from "../../../hooks/DebounceHook";
import Constants from "../../../config/constants";
import { useSelector } from "react-redux";

const initialForm = {
  company_logo: "",
  company_name: "",
  brand_name: "",
  product_groups: [],
  product_categories: [],
  // products: [],
  event_venue: "",
  event_stall: "",
  // zone_tag: [],
  partner_tag: "",
  primary_email: "",
  // primary_password: "",
  secondary_email: "",
  // secondary_password: "",
  company_perosn_name: "",
  conatct_person_designation: "",
  primary_conatct_number: "",
  other_conatct_number: "",
  company_address: "",
  website: "",
  // instagram_link: "",
  // facebook_link: "",
  // linkedin_link: "",
  // twitter_link: "",
  // company_brochure: "",
  // gallery_images: "",
  company_description: "",
  status: true,
  country_code: "",
  secondary_perosn_name: "",
  youtube_link: "",
  is_partner: false,
  hall_id: "",
  is_business_nature_other: false,
  business_nature_other: "",
  business_nature: [],
  state: "",
  country: "",
  zip_code: "",
  pavallian: "",
  featured: false,
  recommended: false,
  fb: "",
  linkedin: "",
  insta: "",
  youtube: "",
  documentUpload:"",
  fileName:"",
  title:"",
  url:"",
  images:""
};

const featureKey = {
  manufacturer: false,
  sole_agent: false,
  product_designer: false,
  publisher: false,
  exporter: false,
  whole_saler: false,
  merchants: false,
  // other: false,
};

const useExhibitorCreate = ({ location }) => {
  const [errorData, setErrorData] = useState({});
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [selectImages, setSelectImages] = useState([]);
  const [checked, setChecked] = useState(false);
  const [feature, setFeature] = useState({ ...featureKey });
  const [productListData, setProductListData] = useState([]);
  const ChildenRef = useRef(null);
  const ChildenRef1 = useRef(null);
  const [listData, setListData] = useState({
    PRODUCT_GROUP: [],
    PRODUCT_CATEGORY: [],
    HALLS: [],
  });
  const [pdf, setPdf] = useState("");
  const [secondary, setSecondary] = useState("");
  const [deatilsValue, setDetailsValue] = useState([]);
  const [partnerList, setPartnerList] = useState([]);
  const [textData, setTextData] = useState("");

  const { user } = useSelector((state) => state?.auth);

  const EventListManager = [
    "FIBERS_YARNS",
    "FABRICS",
    "APPAREL_FASHION",
    "HOME_TEXTILE",
    "HANDLOOM",
    "TECHNICAL_TEXTILE",
    "HANDICRAFTS_CARPETS",
    "INTELLIGENT_MANUFACTURING",
  ];

  useEffect(() => {
    serviceExhibitorsList({
      list: ["PRODUCT_CATEGORY", "PRODUCT_GROUP", "HALLS"],
    }).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);

  useEffect(() => {
    serviceGetProductList().then((res) => {
      if (!res.error) {
        setProductListData(res.data);
      }
    });
  }, []);

  const params = useParams();

  const empId = params?.id;

  const handleCheckedData = () => {
    setChecked(() => !checked);
  };

  const renderImages = (image) => {
    setSelectImages([...image]);
  };
  useEffect(() => {
    if (empId) {
      serviceGetExhibitorsDetails({ id: empId }).then((res) => {
        if (!res.error) {
          const data = res?.data?.details;
          const { business_nature } = data;
          const { hall , children} = data;
       
          // ChildenRef?.current?.setData(children);
          // setSelectImages(data?.gallery_images);
          setDetailsValue(business_nature);
          // setImage(data?.company_logo);
          setSecondary(data?.secondary_user_id);
          setForm({
            ...form,
            // products: data?.products,
            company_name: data?.company_name,
            product_groups: data?.product_groups,
            product_categories: data?.product_categories,
            event_venue: data?.event_venue,
            primary_email: data?.primary_email,
            // primary_password: data?.primary_password,
            company_perosn_name: data?.company_perosn_name,
            conatct_person_designation: data?.conatct_person_designation,
            primary_conatct_number: data?.primary_conatct_number,
            company_address: data?.company_address,
            country_code: data?.country_code,
            // instagram_link: data?.instagram_link,
            // youtube_link: data?.youtube_link,
            // linkedin_link: data?.linkedin_link,
            // facebook_link: data?.facebook_link,
            // twitter_link: data?.twitter_link,
            hall: data?.hall?.hall_no,
            // zone_tag: data?.zone_tag,
            event_stall: data?.event_stall,
            website: data?.website,
            secondary_perosn_name: data?.secondary_perosn_name,
            company_description: data?.company_description,
            brand_name: data?.brand_name,
            secondary_email: data?.secondary_email,
            other_conatct_number: data?.other_conatct_number,
            partner_tag: data?.partner_tag
              ? data?.partner_tag?.toUpperCase()
              : "",
            status: data?.status === Constants.GENERAL_STATUS.ACTIVE,
            is_partner: data?.is_partner,
            primary_user_id: data?.primary_user_id ? data.primary_user_id : "",
            hall_id: hall?.id,
            state: data?.state,
            country: data?.country,
            zip_code: data?.zip_code,
            business_nature_other: data?.business_nature_other,
            is_business_nature_other: data?.is_business_nature_other
              ? data?.is_business_nature_other
              : false,
            pavallian: data?.pavallian,
          });
          // setPdf(data?.company_brochure);
          setTextData(form?.business_nature_other);
          // setFeature({ ...feature, });
        } else {
          SnackbarUtils.error(res?.message);
        }
      });
    }
  }, [empId]);

  useEffect(() => {
    const updatedFeature = { ...feature };

    deatilsValue.forEach((value) => {
      if (value in feature) {
        updatedFeature[value] = true;
      }
    });
    setFeature(updatedFeature);
  }, [deatilsValue]);

  useEffect(() => {
    const updatedFeature = { ...feature };
    if (empId) {
      Object.keys(feature).forEach((key) => {
        if (deatilsValue.includes(feature[key])) {
          updatedFeature[key] = true;
        }
      });
      setFeature(updatedFeature);
    }
  }, [empId]);

  useEffect(() => {
    setForm((prevForm) => {
      const updatedForm = { ...prevForm };
      Object.keys(feature).forEach((key) => {
        if (
          feature[key] === true &&
          !updatedForm.business_nature.includes(key)
        ) {
          updatedForm.business_nature.push(key);
        } else if (feature[key] === false) {
          const index = updatedForm.business_nature.indexOf(key);
          if (index !== -1) {
            updatedForm.business_nature.splice(index, 1);
          }
        }
      });
      return updatedForm;
    });
  }, [feature]);

  const checkPhoneValidation = useCallback(() => {
    debounceValidationList({
      contact: form?.primary_conatct_number,
      country_code: form?.country_code,
      id: form?.primary_user_id,
    }).then((res) => {
      if (!res.error) {
        const errors = JSON.parse(JSON.stringify(errorData));
        if (res?.data?.is_exists) {
          errors["primary_conatct_number"] = "Phone Number Already Exists";
          setErrorData(errors);
        }
      }
    });
  }, [errorData, setErrorData, form]);

  useEffect(() => {
    if (!form?.is_partner) {
      setForm({
        ...form,
        partner_tag: "",
      });
    }
  }, [form?.is_partner]);

  // const checkEmailValidation = useCallback(() => {
  //   debounceValidationList({
  //     email: form?.primary_email,
  //     id: form?.primary_user_id,
  //   }).then((res) => {
  //     if (!res.error) {
  //       const errors = JSON.parse(JSON.stringify(errorData));
  //       if (res?.data?.is_exists) {
  //         errors["primary_email"] = "Primary Email Already Exists";
  //         setErrorData(errors);
  //       }
  //     }
  //   });
  // }, [errorData, setErrorData, form]);

  // const checkSecondaryEmailValidation = useCallback(() => {
  //   debounceValidationList({
  //     email: form?.secondary_email,
  //     id: secondary ? secondary : "",
  //   }).then((res) => {
  //     if (!res.error) {
  //       const errors = JSON.parse(JSON.stringify(errorData));
  //       if (res?.data?.is_exists) {
  //         errors["secondary_email"] = "Secondary Email Already Exists";
  //         setErrorData(errors);
  //       }
  //     }
  //   });
  // }, [errorData, setErrorData, form]);

  // useEffect(() => {
  //   if (form?.primary_email) {
  //     checkEmailValidation();
  //   }
  // }, [form?.primary_email]);

  useEffect(() => {
    if (!form?.is_business_nature_other) {
      if (form?.business_nature?.includes(form?.business_nature_other)) {
        const index = form?.business_nature.indexOf(
          form?.business_nature_other
        );
        form?.business_nature.splice(index, 1);
      }
      setForm({
        ...form,
        business_nature_other: "",
      });
    } else {
      if (textData !== form?.business_nature_other) {
        const index = form?.business_nature.indexOf(
          form?.business_nature_other
        );
        form?.business_nature.splice(index, 1);
      }
    }
  }, [form?.is_business_nature_other]);

  useEffect(() => {
    if (form?.primary_conatct_number) {
      checkPhoneValidation();
    }
  }, [form?.primary_conatct_number]);

  // useEffect(() => {
  //   if (form?.secondary_email) {
  //     checkSecondaryEmailValidation();
  //   }
  // }, [form?.secondary_email]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = [
      "company_name",
      "product_groups",
      "product_categories",
      "event_venue",
      "primary_email",
      "company_perosn_name",
      "conatct_person_designation",
      "primary_conatct_number",
      "company_address",
      "country_code",
      "fileName",
      "documentUpload",
      "title",
      "url",
      
    ];

    if (form?.is_partner) {
      required.push("partner_tag");
    } else {
      delete errors["partner_tag"];
    }
    if (!empId) {
      required.push("images");
    }
    required.forEach((val) => {
      if (form?.product_categories?.length === 0) {
        errors["product_categories"] = true;
      }
      if (form?.product_groups?.length === 0) {
        errors["product_groups"] = true;
      }
      if (!form?.[val]) {
        errors[val] = true;
      }
    });
    if (form?.primary_email && !isEmail(form?.primary_email)) {
      errors["primary_email"] = "Invalid email address ";
    }
    
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
    // if (
    //   form?.secondary_email?.length > 0 &&
    //   form?.primary_email === form?.secondary_email
    // ) {
    //   errors["secondary_email"] =
    //     "Primary Email Address & Secondary Email Address cannot be same ";
    // }
    if (form?.secondary_email && !isEmail(form?.secondary_email)) {
      errors["secondary_email"] = "Invalid email address ";
    }
    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });

    return errors;
  }, [form, errorData]);
  const submitToServer = useCallback(async () => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    const fd = new FormData();
    Object.keys(form).forEach((key) => {
      if (
        // key !== "company_logo",
        // key !== "gallery_images"
        // key !== "company_brochure"
        (key !== "business_nature_other", key !== "is_business_nature_other")
      ) {
        if (key === "status") {
          fd.append(key, form[key] ? "ACTIVE" : "INACTIVE");
        } else if (
          // key === "products" ||
          key === "product_categories" ||
          key === "product_groups" ||
          // key === "zone_tag" ||
          key === "related_to" ||
          key === "business_nature"
        ) {
          if (key === "business_nature") {
            let values = form[key];
            if (form?.is_business_nature_other) {
              if (!values.includes(form?.business_nature_other)) {
                values.push(form?.business_nature_other);
              }
            }
            fd.append(key, JSON.stringify(values));
          } else {
            fd.append(key, JSON.stringify(form[key]));
          }
        } else if (key === "partner_tag") {
          if (form?.is_partner) {
            fd.append(key, form?.partner_tag);
          }
        } else {
          fd.append(key, form[key]);
        }
      }
    });
    // if (form?.company_brochure) {
    //   fd.append("company_brochure", form?.company_brochure);
    // }

    fd.append("is_business_nature_other", form?.is_business_nature_other);

    // if(empId){
    //   if (form?.company_logo) {
    //     fd.append("company_logo", form?.company_logo);
    //   }
    // }

    // if (form?.gallery_images?.length > 0) {
    //   form?.gallery_images?.forEach((item) => {
    //     fd.append("gallery_images", item);
    //   });
    // }
    if (!form?.is_partner) {
      fd.append("partner_tag", "");
    }
    if (selectImages?.length > 0) {
      fd.append("remote_images", JSON.stringify(selectImages));
    }
    let req;
    if (empId) {
      fd.append("id", empId);
      req = serviceUpdateExhibitors(fd);
    } else {
      req = serviceCreateExhibitors(fd);
    }
    req.then((res) => {
      if (!res.error) {
        historyUtils.goBack();
      } else {
        SnackbarUtils.error(res.message);
      }
      setIsSubmitting(false);
    });
  }, [form, errorData, selectImages]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    const isIncludesValid = ChildenRef.current.isValid();
    const isIncludesValid1 = ChildenRef1.current.isValid();
    if (Object.keys(errors)?.length > 0 || !isIncludesValid  || !isIncludesValid1) {
      setErrorData(errors);
      return true;
    }
    await submitToServer();
  }, [checkFormValidation, setErrorData, form, selectImages]);

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
      if (fieldName === "company_name") {
        t[fieldName] = text;
      } else if (fieldName === "primary_email") {
        t[fieldName] = text;
      } else if (fieldName === "secondary_email") {
        t[fieldName] = text;
      }
      //  else if (fieldName === "products") {
      //   const newValues = text?.filter((item) => item.trim() !== "");
      //   const uniqueValues = text
      //     ? newValues?.filter(
      //         (item, index, self) =>
      //           self.findIndex(
      //             (t) => t.toLowerCase() === item.toLowerCase()
      //           ) === index
      //       )
      //     : [];

      //   if (uniqueValues.length <= 2) {
      //     t[fieldName] = uniqueValues;
      //   } else {
      //     SnackbarUtils.error("Maximum 2 products can be added");
      //   }
      // }
      // else if (fieldName === "is_partner") {
      //    if(fieldName === "partner_tag"){

      //    }
      // }
      else if (fieldName) {
        t[fieldName] = text;
      }
      setForm(t);
      shouldRemoveError && removeError(fieldName);
    },
    [removeError, form, setForm, checkPhoneValidation]
  );

  const onBlurHandler = useCallback(
    (type) => {
      if (form?.[type]) {
        changeTextData(form?.[type].trim(), type);
      }
    },
    [changeTextData, checkPhoneValidation]
  );

  const changeFeatureData = useCallback(
    (text, fieldName) => {
      const t = { ...feature };
      t[fieldName] = text;
      setFeature(t);
    },
    [feature, setFeature]
  );

  const handleDelete = useCallback(() => {}, []);

  const handleReset = useCallback(() => {
    setForm({ ...initialForm });
  }, [form, setForm]);



  useEffect(() => {
    servicesPartnerTypeList({
      list: ["SPONSOR_TYPE"],
      event_id: `${user?.event_id}`,
    })
      .then((res) => setPartnerList(res?.data?.SPONSOR_TYPE))
      .catch((res) => res.error);
  }, []);

  return {
    form,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    errorData,
    handleDelete,
    handleReset,
    image,
    selectImages,
    setSelectImages,
    renderImages,
    handleCheckedData,
    checked,
    listData,
    productListData,
    EventListManager,
    image,
    empId,
    pdf,
    changeFeatureData,
    feature,
    deatilsValue,
    partnerList,
    ChildenRef,
    renderImages,
   ChildenRef1
  };
};

export default useExhibitorCreate;
