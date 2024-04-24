import React from "react";
import styles from "./Style.module.css";
import { ButtonBase } from "@material-ui/core";
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
            bannerLabel="Upload Awardee Logo"
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
        {/* <ButtonBase className={styles.update_status_New} onClick={handleSubmit}>
          Add New
        </ButtonBase> */}
        <ButtonBase className={styles.update_status} onClick={handleSubmit}>
          Add
        </ButtonBase>
      </div>
    </div>
  );
};

export default PreviousAwardeesCreate;
