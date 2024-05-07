import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import { useParams } from "react-router-dom";
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
import { isEmail, isNum, validateUrl } from "../../../libs/RegexUtils";
import Constants from "../../../config/constants";
import { useSelector } from "react-redux";
import { capitalizeFirstLetter } from "../../../hooks/CapsLetter";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
const initialForm = {
  company_logo: "",
  company_name: "",
  brand_name: "",
  is_participant: "NO",
  product_categories: [],
  // products: [],
  products: [],
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
  country_code: "91",
  contact: "",
  country_code1: "91",
  secondary_perosn_name: "",
  youtube_link: "",
  is_partner: false,
  hall_id: "",
  is_business_nature_other: false,
  business_nature_other: "",
  business_nature: [],
  state: "",
  country: "",
  // country1: "",
  zip_code: "",
  pavallian: "",
  featured: false,
  recommended: false,
  facebook_link: "",
  linkedin_link: "",
  instagram_link: "",

  twitter_link: "",
  is_featured: false,
  is_recommended: false,
  show_profile: false,
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

const useExhibitorCreate = ({  }) => {
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
  const [downloads, setDownloads] = useState(null);
 const location = useLocation()
  const [downloadsDigitalBag, setDownloadsDigitalBag] = useState(null);
  const [listData, setListData] = useState({
    PRODUCT_GROUP: [],
    PRODUCT_CATEGORY: [],
    HALLS: [],
    PRODUCT_TAGS: [],
  });
  const [pdf, setPdf] = useState("");
  const [secondary, setSecondary] = useState("");
  const [deatilsValue, setDetailsValue] = useState([]);
  const [partnerList, setPartnerList] = useState([]);
  const [textData, setTextData] = useState("");

  const { user } = useSelector((state) => state?.auth);
  const [categoryLists, setCategoryLists] = useState(null);

  const selectedEventId = useMemo(() => {
    return location?.state?.eventID?.id;
  }, [location]);

  useEffect(() => {
    // if (!isSidePanel) return;
    // serviceSearchCategory().then((res) => {
    //   if (!res.error) {
    //     setCategoryLists(res?.data);
    //   }
    // });
  }, [form?.assigned_to]);

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
      list: ["PRODUCT_CATEGORY", "PRODUCT_GROUP", "HALLS", "PRODUCT_TAGS"],
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
  // const event_id = params?.event_id;
  

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
          const { business_nature, downloads, digital_bags, hall } = data;
          if (downloads?.length > 0) {
            ChildenRef?.current?.setData(downloads);
          }
          if (digital_bags?.length > 0) {
            ChildenRef1?.current?.setData(digital_bags);
          }
          // setSelectImages(data?.gallery_images);
          setDetailsValue(business_nature);
          setImage(data?.company_logo);
          setSecondary(data?.secondary_user_id);
          setForm({
            ...form,
            products: data?.products,
            company_name: data?.company_name,
            // product_groups: data?.product_groups,
            product_categories: data?.product_categories,
            event_venue: data?.event_venue,
            primary_email: data?.primary_email,
            // primary_password: data?.primary_password,
            company_perosn_name: data?.company_perosn_name,
            conatct_person_designation: data?.conatct_person_designation,
            primary_conatct_number: data?.primary_conatct_number,
            company_address: data?.company_address,
            country_code: data?.country_code,
            is_participant: data?.is_participant ? "YES" : "NO",
            contact: data?.contact,
            is_recommended: data?.is_recommended,
            show_profile: data?.show_profile ? true : false,
            country: data?.country,
            pavallian: data?.pavallian,
            instagram_link: data?.instagram_link,
            youtube_link: data?.youtube_link,
            linkedin_link: data?.linkedin_link,
            facebook_link: data?.facebook_link,
            twitter_link: data?.twitter_link,
            hall: data?.hall?.hall_no,
            // zone_tag: data?.zone_tag,
            partner_tag:
              data?.partner_tag === "gold partner"
                ? data?.partner_tag
                : capitalizeFirstLetter(data?.partner_tag),
            country_code1: data?.country_code1,
            event_stall: data?.event_stall,
            website: data?.website,
            secondary_perosn_name: data?.secondary_perosn_name,
            company_description: data?.company_description,
            brand_name: data?.brand_name,
            secondary_email: data?.secondary_email,
            other_conatct_number: data?.other_conatct_number,
            // partner_tag: data?.partner_tag
            //   ? data?.partner_tag?.toUpperCase()
            //   : "",
            status: data?.status === Constants.GENERAL_STATUS.ACTIVE,
            is_partner: data?.is_partner,
            primary_user_id: data?.primary_user_id ? data.primary_user_id : "",
            hall_id: hall?.id,
            state: data?.state,
            is_featured: data?.is_featured,

            zip_code: data?.zip_code,
            business_nature_other: data?.business_nature_other,
            is_business_nature_other: data?.is_business_nature_other
              ? data?.is_business_nature_other
              : false,
          });
          setDownloads(data?.downloads);
          setDownloadsDigitalBag(data?.digital_bags);
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
      // "company_logo",
      "company_name",
      // "product_groups",
      // "product_categories",
      // // "event_venue",
      // "primary_email",
      // "company_perosn_name",
      // "conatct_person_designation",
      // "primary_conatct_number",
      // "company_address",
      // "country_code",
      // "fileName",
      // "documentUpload",
      // "title",
      // "url",
    ];

    // if (form?.is_partner) {
    //   required.push("partner_tag");
    // } else {
    //   delete errors["partner_tag"];
    // }
    if (!empId) {
      required.push("company_logo");
    }
    required.forEach((val) => {
      // if (form?.product_categories?.length === 0) {
      //   errors["product_categories"] = true;
      // }
      // if (form?.product_groups?.length === 0) {
      //   errors["product_groups"] = true;
      // }
      if (!form?.[val]) {
        errors[val] = true;
      }
    });
    if (
      form?.contact &&
      (!isNum(form?.contact) || form?.contact?.length !== 10)
    ) {
      errors["contact"] = true;
    }
    if (
      form?.primary_conatct_number &&
      (!isNum(form?.primary_conatct_number) ||
        form?.primary_conatct_number?.length !== 10)
    ) {
      errors["primary_conatct_number"] = true;
    }
    if (form?.primary_email && !isEmail(form?.primary_email)) {
      errors["primary_email"] = "Invalid email address ";
    }

    if (form?.instagram_link && !validateUrl(form?.instagram_link)) {
      errors.instagram_link = true;
      SnackbarUtils.error("Please Enter a Valid Instagram URL");
    }
    if (form?.facebook_link && !validateUrl(form?.facebook_link)) {
      errors.facebook_link = true;
      SnackbarUtils.error("Please Enter a Valid Facebook URL");
    }
    if (form?.twitter_link && !validateUrl(form?.twitter_link)) {
      errors.twitter_link = true;
      SnackbarUtils.error("Please Enter a Valid Twitter URL");
    }
    if (form?.linkedin_link && !validateUrl(form?.linkedin_link)) {
      errors.linkedin_link = true;
      SnackbarUtils.error("Please Enter a Valid LinkedIn URL");
    }
    if (form?.youtube_link && !validateUrl(form?.youtube_link)) {
      errors.youtube_link = true;
      SnackbarUtils.error("Please Enter a Valid YouTube URL");
    }

    if (form?.email && !isEmail(form?.email)) {
      errors.email = true;
    }
    if (form?.website && !validateUrl(form?.website)) {
      errors.website = true;
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
    const industryID =
      Array.isArray(form?.products) && form?.products?.length > 0
        ? form?.products?.map((item) => item) // item.id || item._id
        : [];
    Object.keys(form).forEach((key) => {
      if (
        // key !== "company_logo",
        // key !== "gallery_images"
        // key !== "company_brochure"
        (key !== "business_nature_other",
        key !== "is_business_nature_other",
        key !== "show_profile")
      ) {
        if (key === "status") {
          fd.append(key, form[key] ? "ACTIVE" : "INACTIVE");
        } else if (
          //  key === "products" ||
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
        } else if (key === "products") {
          industryID.length > 0 && fd.append(key, industryID.join(","));
        } else if (key === "partner_tag") {
          if (form?.is_partner) {
            fd.append(key, capitalizeFirstLetter(form?.partner_tag));
          }
        } else if (key === "is_participant") {
          fd.append("is_participant", form?.is_participant === "YES");
          fd.append("is_featured", form?.is_featured ? true : false);
          fd.append("show_profile", form?.show_profile ? true : false);
        } else if (key === "is_featured") {
          delete form[key];
        } else {
          fd.append(key, form[key]);
        }
      }
    });

    const ExpensesData = ChildenRef.current.getData();
    if (ExpensesData?.length > 0 && ExpensesData[0]?.file_name) {
      fd.append("downloads", JSON.stringify(ExpensesData));
    }
    const DigitalBag = ChildenRef1.current.getData();
    if (DigitalBag?.length > 0 && DigitalBag[0]?.title) {
      fd.append("digital_bags", JSON.stringify(DigitalBag));
    }

    fd.append("event_id", selectedEventId);
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
  }, [form, errorData, selectImages, checkFormValidation, selectedEventId]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    const isIncludesValid = ChildenRef.current.isValid();
    const isIncludesValid1 = ChildenRef1.current.isValid();

    if (
      Object.keys(errors).length > 0 ||
      !isIncludesValid ||
      !isIncludesValid1
    ) {
      setErrorData(errors);

      return;
    }

    await submitToServer();
  }, [checkFormValidation, setErrorData, submitToServer, selectedEventId]);

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
      } else if (fieldName === "is_participant") {
        if (text === "YES") {
          t["is_featured"] = false;
        } else if (text === "NO") {
          t["show_profile"] = false;
        }
        t[fieldName] = text;
      } else if (fieldName === "product_categories") {
        // console.log({text})
        // t[fieldName] = text;
        const newValues = text?.filter((item) => item !== "");

        const uniqueValues = newValues
          ? newValues.filter(
              (item, index, self) =>
                self?.findIndex(
                  (t) => t?.name?.toLowerCase() === item?.name?.toLowerCase()
                ) === index
            )
          : [];

        if (uniqueValues.length <= 2) {
          t[fieldName] = uniqueValues;
        } else {
          SnackbarUtils.error("Maximum 2 products can be added");
        }
      } else if (fieldName === "products") {
        const newValues = text?.filter((item) => item.trim() !== "");
        const uniqueValues = text
          ? newValues?.filter(
              (item, index, self) =>
                self.findIndex(
                  (t) => t.toLowerCase() === item.toLowerCase()
                ) === index
            )
          : [];

        if (uniqueValues.length <= 2) {
          t[fieldName] = uniqueValues;
        } else {
          SnackbarUtils.error("Maximum 2 product offered added");
        }
      } else if (
        fieldName === "contact" ||
        fieldName === "primary_conatct_number"
      ) {
        if (isNum(text) && text.toString().length <= 10) {
          t[fieldName] = text;
        }
      }

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

    empId,
    pdf,
    changeFeatureData,
    feature,
    deatilsValue,
    partnerList,
    ChildenRef,
    renderImages,
    ChildenRef1,
    downloads,
    downloadsDigitalBag,
    isSubmitting,
    categoryLists,
  };
};

export default useExhibitorCreate;
