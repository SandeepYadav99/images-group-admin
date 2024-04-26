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



import File from "../../../../../components/FileComponent/FileComponent.component";

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
  exhibitorId
}) => {
  const handleChange = (e, fieldName) => {
    // const name = e?.target?.name;
    // const value = e?.target?.value;
if(fieldName){
  if (fieldName === "file_name") {
    changeData(index, { [fieldName]: e.target.value });
  } else {
    changeData(index, { [fieldName]: e });
  }

}
  };

  return (
    <div>
      <div className={styles.flexContainer}>
        <div className={styles.firstRow}>
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <TextField
                error={errors?.file_name}
                onChange={(e) => handleChange(e, "file_name")}
                value={data?.file_name}
                fullWidth={true}
                name={"file_name"}
                margin={"dense"}
                variant={"outlined"}
                label={"File Name"}
              />
              {/* <CustomTextField
              error={data?.fileName}
              // error={data?.fileName}
              label={"File Name"}
              value={data?.fileName}
              onTextChange={(text) => {
                handleChange( "fileName", text);
              }}
             
            /> */}
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
                value={data?.documentUpload || ""}
                placeholder={"Upload PDF"}
                onChange={(file) => {
                  if (file) {
                    handleChange(file, "documentUpload");
                  }
                }}
              />
                <div className={styles.inst} >
                  {exhibitorId && <a href={data?.document ?? " "} target="_blank" rel="noreferrer" >View File</a>}
               </div>
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
