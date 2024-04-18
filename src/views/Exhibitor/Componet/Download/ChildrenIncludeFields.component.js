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
  // const handleChange = (e) => {
  //   const name = e?.target?.name;
  //   const value = e?.target?.value;
    
  //   console.log({name, value})
  //   if (name === "fileName") {
  //     changeData(index,{['fileName'] : value})
  //   }else if(name === "documentUpload"){
  //     changeData(index, { ['documentUpload']: value });
  //   } else {
  //     changeData(index, { [name]: value });
  //   }
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log({name, value})
    changeData(index, { [name]: value });
  };
  
const changeTextData=(value,key)=>{
  changeData(index, { [key]: value });

}

console.log({data})
  return (
    <div>
      <div className={styles.flexContainer}>
        <div className={styles.firstRow}>
        
          <div className={"formFlex"}>
          <div className={"formGroup"}>
        
              <TextField
              error={errors?.fileName}
              onChange={handleChange}
              value={data?.fileName}
              fullWidth={true}
              name={"fileName"}
              margin={"dense"}
              variant={"outlined"}
              label={"File Name"}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <File
              max_size={10 * 1024 * 1024}
              type={["pdf", "doc", "docx"]}
              fullWidth={true}
               name="documentUpload"
              label="Upload PDF"
              accept={"application/pdf,application/msword"}
              error={errors?.documentUpload}
              value={data?.documentUpload}
              placeholder={"Upload PDF"}
             
              onChange={(file) => {
                console.log({file})
                handleChange({ target: { name: 'documentUpload', value: file }});
              }}
            />
          </div>
        </div>
          <div className={"textCenter"}>
            <ButtonBase
              className={styles.removeBtn}
              // label={this.props.index == 0 ? "+" : '-'}
              onClick={() => {
                handlePress(index == 2 ? "-" : "-", index);
              }}
            >
              {index == 0 ? "" : "Remove"}
            </ButtonBase>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildrenIncludeFields;
