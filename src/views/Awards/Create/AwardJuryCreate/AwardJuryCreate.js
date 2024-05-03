import React from "react";
import styles from "./Style.module.css";
import { ButtonBase, CircularProgress } from "@material-ui/core";
import File from "../../../../components/FileComponent/FileComponent.component";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";
import useAwardJuryCreateHook from "./AwardJuryCreateHook";

const AwardJuryCreate = ({
  isSidePanel,
  handleToggleSidePannel,
  awardId,
  handleCallDetail,
}) => {
  const { form, changeTextData, errorData, onBlurHandler, handleSubmit,isSubmitting } =
    useAwardJuryCreateHook({
      isSidePanel,
      handleToggleSidePannel,
      awardId,
      handleCallDetail,
    });
  return (
    <div className={styles.updatAbout}>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          {" "}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <File
              bannerLabel="Upload jury photo"
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
            isError={errorData?.name}
            errorText={errorData?.name}
            label={"Person Name"}
            value={form?.name}
            onTextChange={(text) => {
              changeTextData(text, "name");
            }}
            onBlur={() => {
              onBlurHandler("name");
            }}
          />
        </div>
      </div>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <CustomTextField
            isError={errorData?.designation}
            errorText={errorData?.designation}
            label={"Designation"}
            value={form?.designation}
            onTextChange={(text) => {
              changeTextData(text, "designation");
            }}
            onBlur={() => {
              onBlurHandler("designation");
            }}
          />
        </div>
      </div>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <CustomTextField
            isError={errorData?.company}
            errorText={errorData?.company}
            label={"Company"}
            value={form?.company}
            onTextChange={(text) => {
              changeTextData(text, "company");
            }}
            onBlur={() => {
              onBlurHandler("company");
            }}
            // multiline
            // rows={"3"}
          />
        </div>
      </div>
      <div className={styles.actionButton}>
        <ButtonBase className={styles.update_status}   disabled={isSubmitting ? true : false}
        onClick={handleSubmit}>
        {isSubmitting ? <CircularProgress color="success" size="20px" /> : 
          'UPDATE' } 
        </ButtonBase>
      </div>
    </div>
  );
};

export default AwardJuryCreate;
