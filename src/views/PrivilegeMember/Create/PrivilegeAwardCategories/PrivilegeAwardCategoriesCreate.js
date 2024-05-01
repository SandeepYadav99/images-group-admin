import React from "react";

import styles from "./Style.module.css";

import { ButtonBase, CircularProgress } from "@material-ui/core";

import useAwardCategoriesCreate from "./PrivilegeAwardCategoriesCreateHook";
import File from "../../../../components/FileComponent/FileComponent.component";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";

const PrivilegeAwardCategoriesCreate = ({
  isSidePanel,
  handleToggleSidePannel,
  selectedData,
  awardId,
  handleCallDetail
}) => {
  const {
    form,
    changeTextData,
    errorData,
    onBlurHandler,
    handleSubmit,
    image,
    isSubmitting
  } = useAwardCategoriesCreate({
    isSidePanel,
    handleToggleSidePannel,
    selectedData,
    awardId,
    handleCallDetail
  });
  return (
    <div className={styles.updatAbout}>
      
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <CustomTextField
            isError={errorData?.title}
            errorText={errorData?.title}
            label={"Title"}
            value={form?.title}
            onTextChange={(text) => {
              changeTextData(text, "title");
            }}
            onBlur={() => {
              onBlurHandler("title");
            }}
          />
        </div>
      </div>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <CustomTextField
            isError={errorData?.description}
            errorText={errorData?.description}
            label={"Description"}
            value={form?.description}
            onTextChange={(text) => {
              changeTextData(text, "description");
            }}
            onBlur={() => {
              onBlurHandler("description");
            }}
            multiline
            rows={"3"}
          />
        </div>
      </div>
      <div className={styles.actionButton}>
        <ButtonBase className={styles.update_status} disabled={isSubmitting ? true : false}
        onClick={handleSubmit}>
        {isSubmitting ? <CircularProgress color="success" size="20px" /> : 
          'Add' } 
        </ButtonBase>
      </div>
    </div>
  );
};

export default PrivilegeAwardCategoriesCreate;
