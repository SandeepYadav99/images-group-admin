import React from "react";

import styles from "./Style.module.css";

import { ButtonBase } from "@material-ui/core";

import File from "../../../../components/FileComponent/FileComponent.component";

import usePreviousAwardeesCreateHook from "./PreviousAwardeesCreateHook";
import MultiFile from "../../../GalleryAlbum/Create/Component/FileComponent/FileMultiComponent.component";

const PreviousAwardeesCreate = ({ isSidePanel, handleToggleSidePannel }) => {
  const {
    form,
    changeTextData,
    errorData,
    onBlurHandler,
    handleSubmit,
    renderImages,
    selectImages,
  } = usePreviousAwardeesCreateHook({ isSidePanel, handleToggleSidePannel });
  return (
    <div className={styles.updatAbout}>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          {" "}
          {/* <MultiFile
              multiDef={selectImages ? selectImages : []}
              multiple
              max_size={10 * 1024 * 1024}
              type={["jpeg", "jpg", "png"]}
              fullWidth={true}
              name="od1"
              label="Upload Awardee Logo"
              accept={"image/*"}
              error={errorData?.images}
              value={form?.images}
              // bannerLabel="Upload Awardee Logo"
              // default_image={selectImages ? selectImages[0] : null}
              placeholder={"Upload Awardee Logo"}
              onChange={(file) => {
                if (file) {
                  changeTextData(file, "images");
                }
              }}
              DefChange={(img) => {
                if (img) {
                  renderImages(img);
                }
              }}
            /> */}
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
        <ButtonBase className={styles.update_status_New} onClick={handleSubmit}>
          Add New
        </ButtonBase>
        <ButtonBase className={styles.update_status} onClick={handleSubmit}>
          Add
        </ButtonBase>
      </div>
    </div>
  );
};

export default PreviousAwardeesCreate;
