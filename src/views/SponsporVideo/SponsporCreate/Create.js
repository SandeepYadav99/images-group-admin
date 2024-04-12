import React from "react";
import history from "../../../libs/history.utils";
import {
  Button,
  ButtonBase,
  CircularProgress,
  MenuItem,
} from "@material-ui/core";
import styles from "./Style.module.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import useVideoCreate from "./Create.hook.js";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import File from "../../../components/FileComponent/FileComponent.component";
import CustomSwitch from "../../../components/FormFields/CustomSwitch";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";
import CountryInputField from "../../../components/CountryInputField/CountryInputField.js";
import MultiFile from "../../GalleryAlbum/Create/Component/FileComponent/FileMultiComponent.component.js";

function VideoSponsporCreate({ location }) {
  const {
    form,
    errorData,
    listData,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isSubmitting,
    img,
    id,
    setImg,
    countryCode,
    handleCountryCodeChange,
    selectVideos,
    renderVideo,
    videoData,
  } = useVideoCreate({ location });

  
  return (
    <div className={styles.claimListWrapper}>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />
            <span className={"capitalize"}>
              {id ? <b>Edit Video Sponspor</b> : <b>Add Video Sponspor</b>}
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Video Sponspor Details</div>
          </h4>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.name}
              errorText={errorData?.name}
              label={"File Name"}
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
            <MultiFile
              multiDef={selectVideos ? selectVideos : []}
              max_size={10 * 1024 * 1024}
              type={["mp4"]}
              fullWidth={true}
              name="od1"
              label="Upload"
              accept={"video/*"}
              error={errorData?.video}
              value={form?.video}
              placeholder={"Upload Video"}
              default_image={videoData ? videoData : null}

              onChange={(file) => {
                if (file) {
                  changeTextData(file, "video");
                }
              }}
              DefChange={(video) => {
                if (video) {
                  renderVideo(video);
                }
              }}
            />
            {
              videoData ? <a href={videoData} target="_blank">Preview</a> :""
            }
          </div>
        </div>
      </div>
      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Status</div>
          </h4>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomSwitch
              value={form?.status}
              handleChange={() => {
                changeTextData(!form?.status, "status");
              }}
              label={form?.status ? `Active` : "Inactive"}
            />
          </div>
        </div>

        <div className={styles.btnWrappepr}>
          <ButtonBase
            disabled={isSubmitting ? true : false}
            type={"button"}
            className={styles.createBtn}
            onClick={handleSubmit}
          >
            {isSubmitting ? (
              <CircularProgress color="success" size="20px" />
            ) : id ? (
              "UPDATE"
            ) : (
              "Save"
            )}
          </ButtonBase>
        </div>
      </div>
    </div>
  );
}

export default VideoSponsporCreate;
