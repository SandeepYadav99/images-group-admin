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
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import File from "../../../components/FileComponent/FileComponent.component";
import CustomSwitch from "../../../components/FormFields/CustomSwitch";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";
import { useParams } from "react-router-dom";
import useSplashScreenCreateHook from "./SplashScreenCreateHook";
import MultiFile from "../../GalleryAlbum/Create/Component/FileComponent/FileMultiComponent.component";

function SplashScreenCreate({ location }) {
  const {
    form,
    errorData,
    listData,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isSubmitting,
    image,
    setImage,
    isLinkDisabled,
    setIsLinkDisabled,
    selectVideos,
    renderVideo,
  } = useSplashScreenCreateHook({ location });

  const params = useParams();

  return (
    <div className={styles.claimListWrapper}>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />
            <span className={"capitalize"}>
              {params?.id ? (
                <b>Edit Splash Screen</b>
              ) : (
                <b>Add Splash Screen</b>
              )}
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Splash Screen Details</div>
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
              // disabled={isLinkDisabled}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.link}
              errorText={errorData?.link}
              label={"Link(optional)"}
              value={form?.link}
              onTextChange={(text) => {
                changeTextData(text, "link");
              }}
              onBlur={() => {
                onBlurHandler("link");
              }}
              // disabled={isLinkDisabled}
            />
          </div>
        </div>

        <div className={"formFlex"}>
          <div className={"formGroup"}>
            {/* {!image && ( */}

            <MultiFile
              multiDef={selectVideos ? selectVideos : []}
              max_size={5 * 1024 * 1024}
              type={["mp4","png", "jpeg", "jpg"]}
              fullWidth={true}
              name="od1"
              label="Upload"
              accept={"video/*"}
              error={errorData?.video}
              value={form?.video}
              placeholder={"Upload file"}
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
            {/* )} */}

            <div className={styles.inst}>
              <InfoOutlinedIcon />
              Recommended Resolution for splash screen video is 1920x1080p
            </div>
          </div>
          <div className={"formGroup"}></div>
        </div>
        {/* {image && <video src={image} className={styles.imgClass} />}
        {image && (
          <div className={styles.remove} onClick={() => setImage("")}>
            Remove
          </div>
        )} */}
      </div>
      <div className={"plainPaper"}>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomSwitch
              value={form?.status}
              handleChange={() => {
                changeTextData(!form?.status, "status");
              }}
              label={form?.status ? `Active` : `Inactive`}
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
            ) : (
              "ADD"
            )}
          </ButtonBase>
        </div>
      </div>
    </div>
  );
}

export default SplashScreenCreate;
