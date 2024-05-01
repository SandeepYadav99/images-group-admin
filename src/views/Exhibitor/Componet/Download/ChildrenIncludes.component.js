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
import Axios from "axios";
import Constants from "../../../../config/constants";


const TEMP_OBJ = {
  file_name: '',
  documentUpload: null,
 
};

const ChildrenIncludeForm = (
  {
    data,
    currency,
    listWarehouse,
    errorData: errorForm,
    downloads,
    changeTextData,
    updateInventory,
    vendorId,
    exhibitorId
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
      
      const updatedFields = downloads.map((download) => ({
        file_name: download.file_name || '', 
        // preview: download.documentUpload || null, 
      }));
      setFields(updatedFields);
    } else {
     
      setFields([JSON.parse(JSON.stringify(TEMP_OBJ))]);
    }
  }, [downloads]);

  // useEffect(() => {
    
  // }, [downloads]);

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



 console.log({fields})
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
        if(!val['file_name'] && !val["documentUpload"]) return;
       const required = [];
      // if(!exhibitorId){
      //   required.push("documentUpload")
      // }
      required?.forEach((key) => {
        if (!val[key]) {
          err[key] = true;
        }
      });
      if (Object.keys(err).length > 0) {
        errors[index] = err;
      }
    });
    setErrorData(errors);
    return !(Object.keys(errors).length > 0);
  };

  // useEffect(() => {
  //   // const fd = new FormData();
  //   // fd.append("files",)
  //   // serviceUpdateFileUpdate({})
  // }, [data]);

  useEffect(() => {
    if (downloads) {
      setFields(downloads);
    }
  }, [downloads]);

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
  const changeData = (index, data, dateValue) => {
    // const tempData = JSON.parse(JSON.stringify(fields));
    const tempData = [...fields];
    if (dateValue) {
      tempData.forEach((item) => (item.travel_date = ""));
    } else {
      tempData[index] = { ...tempData[index], ...data };
    }
    LogUtils.log("data", data);
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
        <div >
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
            exhibitorId={exhibitorId}
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
