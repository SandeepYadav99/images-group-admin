import React from "react";
import styles from "./Style.module.css";
import { ButtonBase, CircularProgress } from "@material-ui/core";
import File from "../../../../components/FileComponent/FileComponent.component";
import usePreviousAwardeesCreateHook from "./PreviousAwardeesCreateHook";

const PreviousAwardeesCreate = ({
  isSidePanel,
  handleToggleSidePannel,
  awardId,
  handleCallDetail,
}) => {
  const {
    form,
    changeTextData,
    errorData,
    handleSubmit,
    isSubmitting
  } = usePreviousAwardeesCreateHook({
    isSidePanel,
    handleToggleSidePannel,
    awardId,
    handleCallDetail,
  });
  return (
    <div className={styles.updatAbout}>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <File
            bannerLabel="Upload Member Logo"
            // default_image={logo ? logo : ""}
            bannerimg="true"
            imageClass={styles.inputFileUploader}
            max_size={5 * 1024 * 1024}
            type={["png", "jpeg", "jpg"]}
            // fullWidth={true}
            name="image"
            accept={"image/*"}
            label="Upload Awardee Logo"
            //  show_image={true}
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

export default PreviousAwardeesCreate;
