import React from "react";
import File from "../../../components/FileComponent/FileComponent.component";
import useUpdateAboutHook from "./PrivilegeUpdateAboutHook";
import styles from "./Style.module.css";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import { ButtonBase, CircularProgress } from "@material-ui/core";
import Slider from "react-slick";


const UpdateAbout = ({ isSidePanel, handleToggleSidePannel, aboutData ,handleClose }) => {
  const {
    form,
    changeTextData,
    errorData,
    onBlurHandler,
    handleSubmit,
    image,
    isSubmitting
  } = useUpdateAboutHook({ isSidePanel, handleToggleSidePannel, aboutData ,handleClose });
  return (
    <div className={styles.updatAbout}>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <File
            bannerLabel="Upload Event Logo"
            default_image={image ? image : ""}
            bannerLabelTrue="true"
            imageClass={styles.inputFileUploader}
            max_size={5 * 1024 * 1024}
            type={["png", "jpeg", "jpg"]}
             fullWidth={true}
            name="image"
            accept={"image/*"}
            label="Please Upload Image"
            // show_image={true}
            error={errorData?.image}
            value={form?.image}
            onChange={(file) => {
              if (file) {
                changeTextData(file, "image");
              }
            }}
          />
          <p className={styles.parameterText}>
            Upload Image in 16:9 ratio and less than 5mb
          </p>
        </div>
      </div>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <CustomTextField
            isError={errorData?.content}
            errorText={errorData?.content}
            label={"About Content"}
            value={form?.content}
            onTextChange={(text) => {
              changeTextData(text, "content");
            }}
            onBlur={() => {
              onBlurHandler("content");
            }}
            multiline
            rows={"4"}
          />
        </div>
      </div>
      <div className={styles.actionButton}>
        <ButtonBase className={styles.update_status} 
            disabled={isSubmitting ? true : false}
        onClick={handleSubmit}>
        {isSubmitting ? <CircularProgress color="success" size="20px" /> : 
          'UPDATE' } 
        </ButtonBase>
      </div>
    </div>
  );
};

export default UpdateAbout;
