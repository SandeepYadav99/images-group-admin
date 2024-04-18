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
import MultiFile from "../../../GalleryAlbum/Create/Component/FileComponent/FileMultiComponent.component";

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
  const [selectImages, setSelectImages] = useState([]);
const changeTextData=(value,key)=>{
  changeData(index, { [key]: value });

}
const renderImages = (image) => {
  setSelectImages([...image]);
};

  return (
    <div>
      <div className={styles.flexContainer}>
        <div className={styles.firstRow}>
        <div className={styles.cont}>
            <div className={"formFlex"}>
          <div className={"formGroup"}>
           
               <File
              // imageClass={styles.inputFileUploader}
              max_size={5 * 1024 * 1024}
              type={["png", "jpeg", "jpg"]}
              fullWidth={true}
              name="document"
              accept={"image/*"}
              // default_image={image ? image : null}
              label="Upload  Image"
              show_image={true}
              error={errors?.images}
              value={data?.images}
              // onChange={(file) => {
              //   if (file) {
              //     changeTextData(file, "images");
              //   }
              // }}
              onTextChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.lowerWrap}>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errors?.title}
              errorText={errors?.title}
              label={"Title"}
              value={data?.title}
              onTextChange={handleChange}
              // onBlur={() => {
              //   onBlurHandler("title");
              // }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errors?.url}
              errorText={errors?.url}
              label={"URL"}
              value={data?.url}
              onTextChange={handleChange}
              // onBlur={() => {
              //   onBlurHandler("url");
              // }}
            />
          </div>
        </div>
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
