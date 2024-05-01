/**
 * Created by charnjeetelectrovese@gmail.com on 5/13/2020.
 */
import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback,
  useMemo,
} from "react";
import IncludeFields from "./ChildrenIncludeFields.component";
import styles from "./style.module.css";
import { Button, ButtonBase, IconButton, MenuItem } from "@material-ui/core";
import LogUtils from "../../../../libs/LogUtils";
import { Add } from "@material-ui/icons";
import { useParams } from "react-router";
import ChildrenIncludeFields from "./ChildrenIncludeFields.component";
import { validateUrl } from "../../../../libs/RegexUtils";
import SnackbarUtils from "../../../../libs/SnackbarUtils";

const TEMP_OBJ = {
  title: "",
  url: "",
  images: null,
  
};

const ChildrenIncludeForm = (
  {
    data,
    currency,
    listWarehouse,
    errorData: errorForm,
    form,
    changeTextData,
    updateInventory,
    vendorId,
    empId,
    downloads,
    exhibitorId,
  },
  ref
) => {
  const [fields, setFields] = useState([JSON.parse(JSON.stringify(TEMP_OBJ))]);
  const [errorData, setErrorData] = useState({});
  const [variants, setVariants] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    let sku = 0;
    let qty = 0;
    fields.forEach((val) => {
      sku++;
      if (val.quantity && !isNaN(val.quantity)) {
        qty += parseInt(val.quantity);
        // console.log("><>",qty)
      }
    });
    // updateInventory(sku, qty);
  }, [fields]);

  useEffect(() => {
    if (downloads && downloads.length > 0) {
      const updatedFields = downloads?.map((download) => ({
        title: download.title,
        url: download.url,
        thumbnail: download?.thumbnail || "",
      }));
      setFields(updatedFields);
    } else {
      setFields([JSON.parse(JSON.stringify(TEMP_OBJ))]);
    }
  }, [downloads]);
  useImperativeHandle(ref, () => ({
    isValid() {
      return validateData();
    },
    setData(data) {
      setFields([...data]);
    },
    resetData() {
      setFields([JSON.parse(JSON.stringify(TEMP_OBJ))]);
    },
    // getData() {
    //   fields.forEach((obj) => {
    //     if (obj.hasOwnProperty("employee_id")) {
    //       delete obj.employee_id;
    //     }
    //     if (obj.hasOwnProperty("_id")) {
    //       delete obj._id;
    //     }
    //   });
    // return JSON.parse(JSON.stringify(fields));
    // },
    getData() {
      return fields;
    },
  }));

  const getState = () => {
    return fields;
  };

  const validateData = (index, type) => {
    const errors = {};
    // if (type) {
    //     if (errorData[index]) {
    //         errorData[index][type] = false;
    //     }
    //     setErrorData(errorData);
    //     return false;
    // }
    fields.forEach((val, index) => {
      const err =
        index in errorData ? JSON.parse(JSON.stringify(errorData[index])) : {};
      // const required = ["title", "url",  ...(exhibitorId ? [] : ["images"])];
      const required = [];
      required?.forEach((key) => {
        if (!val[key]) {
          err[key] = true;
        }
      });
      if (val.url && !validateUrl(val.url)) {
        err.url = true;
        SnackbarUtils.error("Please Enter the Valid Url");
      }
      if (Object.keys(err).length > 0) {
        errors[index] = err;
      }
    });
    setErrorData(errors);
    return !(Object.keys(errors).length > 0);
  };

  useEffect(() => {
    if (data) {
      setFields(data);
    }
  }, [data]);

  const isValid = () => {
    return validateData();
  };

  const checkExists = useCallback(async (index, key, value) => {}, []);

  const removeErrors = useCallback(
    (index, key) => {
      const errors = JSON.parse(JSON.stringify(errorData));
      if (errors[index] != undefined) {
        if (Array.isArray(key)) {
          key.forEach((k) => {
            delete errors[index][k];
          });
        } else {
          delete errors[index][key];
        }
        setErrorData(errors);
      }
    },
    [setErrorData, errorData]
  );

  // const changeData = (index, data) => {
  //   const tempData = JSON.parse(JSON.stringify(fields));
  //   tempData[index] = { ...tempData[index], ...data };

  //   setFields(tempData);
  //   const errArr = [];
  //   Object.keys(data).forEach((key) => {
  //     errArr.push(key);
  //   });
  //   removeErrors(index, errArr);
  // };
 console.log({fields})
  const changeData = (index, data, dateValue) => {
    console.log(data, dateValue)
    // const tempData = JSON.parse(JSON.stringify(fields));
    const tempData = [...fields];
    if (dateValue) {
      tempData.forEach((item) => (item.travel_date = ""));
    } else {
      tempData[index] = { ...tempData[index], ...data };
    }
    console.log({tempData, data})
    setFields(tempData);
    const errArr = [];
    Object.keys(data).forEach((key) => {
      errArr.push(key);
    });
    removeErrors(index, errArr);
  };

  const onBlur = useCallback(
    (index, key, value) => {
      if (key === "vendor_code" || key === "ean") {
        if (value) {
          // checkExists(index, key, value);
        }
      }
    },
    [checkExists]
  );
  const handlePress = async (type, index = 0) => {
    LogUtils.log("type", type, index);
    const oldState = [...fields];
    if (type == "ADDITION") {
      oldState.push(JSON.parse(JSON.stringify(TEMP_OBJ)));
    } else {
      if (oldState.length === 1) {
        return true;
      }
      oldState.splice(index, 1);
    }
    LogUtils.log("oldState", oldState);
    setFields(oldState);
    // validateData();
  };

  const renderFields = useMemo(() => {
    return fields.map((val, index) => {
      const tempFilters = variants.filter((variant) => {
        const index = fields.findIndex((val) => val?.sku?.sku === variant?.sku);
        return index < 0;
      });
      return (
        <div>
          <ChildrenIncludeFields
            variants={tempFilters}
            listWarehouse={listWarehouse}
            currency={currency}
            validateData={validateData}
            errors={index in errorData ? errorData[index] : null}
            changeData={changeData}
            handlePress={handlePress}
            data={val}
            index={index}
            onBlur={onBlur}

            // exhibitorId={exhibitorId}
          />
        </div>
      );
    });
  }, [
    variants,
    errorData,
    listWarehouse,
    currency,
    validateData,
    changeData,
    handlePress,
    onBlur,
    fields,
  ]);

  return (
    <>
      {renderFields}

      <div>
        <ButtonBase
          className={styles.addition}
          label={"+"}
          onClick={() => {
            handlePress("ADDITION", 0);
          }}
        >
          <Add fontSize={"small"} /> <span>Add More</span>
        </ButtonBase>
      </div>
      {/*</div>*/}
    </>
  );
};

export default forwardRef(ChildrenIncludeForm);
