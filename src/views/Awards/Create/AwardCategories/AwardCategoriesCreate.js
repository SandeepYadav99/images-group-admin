import React from "react";

import styles from "./Style.module.css";

import { ButtonBase } from "@material-ui/core";

import useAwardCategoriesCreate from "./AwardCategoriesCreateHook";
import File from "../../../../components/FileComponent/FileComponent.component";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";

const AwardCategoriesCreate = ({ isSidePanel, handleToggleSidePannel }) => {
  const { form, changeTextData, errorData, onBlurHandler, handleSubmit } =
  useAwardCategoriesCreate({ isSidePanel, handleToggleSidePannel });
  return (
    <div className={styles.updatAbout}>
      <div className={"formFlex"}>
        <div className={"formGroup"} >
          {" "}
          <div style={{display:"flex", justifyContent:"center"}}>
          <File
            bannerLabel="Upload Event Logo"
            // default_image={logo ? logo : ""}

            imageClass={styles.inputFileUploader}
            max_size={5 * 1024 * 1024}
            type={["png", "jpeg", "jpg"]}
            // fullWidth={true}
            name="image"
            accept={"image/*"}
            label=" Upload Image"
            // show_image={true}
            error={errorData?.image}
            value={form?.image}
            onChange={(file) => {
              if (file) {
                changeTextData(file, "image");
              }
            }}
          />
        </div>
        </div>
      </div>
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
            isError={errorData?.about}
            errorText={errorData?.about}
            label={"About Content"}
            value={form?.about}
            onTextChange={(text) => {
              changeTextData(text, "about");
            }}
            onBlur={() => {
              onBlurHandler("about");
            }}
            multiline
            rows={"3"}
          />
        </div>
      </div>
      <div className={styles.actionButton}>
        <ButtonBase className={styles.update_status} onClick={handleSubmit}>
          Add
        </ButtonBase>
      </div>
    </div>
  );
};

export default AwardCategoriesCreate;
