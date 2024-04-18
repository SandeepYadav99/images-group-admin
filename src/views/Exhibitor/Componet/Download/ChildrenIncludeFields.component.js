/**
 * Created by charnjeetelectrovese@gmail.com on 5/13/2020.
 */

import React, { useCallback, useState } from "react";
import {
  TextField,
  ButtonBase,
  InputAdornment,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import styles from "./style.module.css";
import { isAlpha, isNum } from "../../../../libs/RegexUtils";
import CustomSelectField from "../../../../components/FormFields/SelectField/SelectField.component";
import {
  AddCircle as AddIcon,
  Info as EditIcon,
  RemoveCircleOutline as RemoveIcon,
} from "@material-ui/icons";
import CustomAutoComplete from "../../../../components/FormFields/AutoCompleteText/CustomAutoComplete";
import LogUtils from "../../../../libs/LogUtils";
import CustomDatePicker from "../../../../components/FormFields/DatePicker/CustomDatePicker";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";
import File from "../../../../components/FileComponent/FileComponent.component";

const useStyles = {
  toggleDiv: {
    maxWidth: 300,
    marginTop: 40,
    marginBottom: 5,
  },
  toggleLabel: {
    color: "black",
    fontWeight: 100,
  },
  buttons: {
    marginTop: 30,
    float: "right",
  },
  saveButton: {
    marginLeft: 5,
  },
};

const ChildrenIncludeFields = ({
  index,
  changeData,
  variants,
  handlePress,
  data,
  errors,
  onBlur,
  currency,
  listWarehouse,
}) => {
  const handleChange = (e) => {
    const name = e?.target?.name;
    const value = e?.target?.value;
    if (name === "fileName") {
      changeData(index,{['fileName'] : value})
    } else {
      changeData(index, { [name]: value });
    }
  };
const changeTextData=(value,key)=>{
  changeData(index, { [key]: value });

}
  return (
    <div>
      <div className={styles.flexContainer}>
        <div className={styles.firstRow}>
          {/* <div className={styles.flex1}>
            <TextField
              error={errors?.name}
              onChange={handleChange}
              value={data?.name}
              fullWidth={true}
              name={"name"}
              margin={"dense"}
              variant={"outlined"}
              label={"Child Name"}
            />
          </div> */}
          <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errors?.fileName}
              errorText={errors?.fileName}
              label={"File Name"}
              value={data?.fileName}
              onTextChange={handleChange}
              // onBlur={() => {
              //   onBlurHandler("fileName");
              // }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <File
              max_size={10 * 1024 * 1024}
              type={["pdf", "doc", "docx"]}
              fullWidth={true}
              // name="od1"
              label="Upload PDF"
              accept={"application/pdf,application/msword"}
              error={errors?.documentUpload}
              value={data?.documentUpload}
              placeholder={"Upload PDF"}
              onTextChange={handleChange}
            />
          </div>
        </div>
          <div className={"textCenter"}>
            <ButtonBase
              className={styles.removeBtn}
              // label={this.props.index == 0 ? "+" : '-'}
              onClick={() => {
                handlePress(index == 0 ? "-" : "-", index);
              }}
            >
              {index == 0 ? "Remove" : "Remove"}
            </ButtonBase>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildrenIncludeFields;
