import React from "react";
import { ButtonBase, CircularProgress } from "@material-ui/core";
import styles from "./Style.module.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import File from "../../../components/FileComponent/FileComponent.component";
import CustomSwitch from "../../../components/FormFields/CustomSwitch";

import historyUtils from "../../../libs/history.utils";

import useSpeakerMasterCreate from "./SpeakerMasterCreateHook";
import CustomCheckbox from "../../../components/FormFields/CustomCheckbox";

function SpeakerMasterCreate({ location }) {
  const {
    form,
    errorData,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isSubmitting,
    descriptionRef,
    images,
    setImage,
    speaker,
    id,
    setRemoveImage
  } = useSpeakerMasterCreate({ location });

  return (
    <div className={styles.claimListWrapper}>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => historyUtils.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />
            <span className={"capitalize"}>
              <b> {id ? "Edit" : "Add"} Speaker Master</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Speaker Master Details</div>
          </h4>
        </div>
        <div className={styles.cont}>
          <div>
            <File
              // imageClass={styles.inputFileUploader}
              max_size={5 * 1024 * 1024}
              type={["png", "jpeg", "jpg"]}
              fullWidth={true}
              name="document"
              accept={"image/*"}
              label="Please Upload Image"
              show_image={true}
              error={errorData?.s_image}
              value={form?.s_image}
              default_image={images ? images : null}
              onChange={(file) => {
                if (file) {
                  changeTextData(file, "s_image");
                }
              }}
            />
            {images && (
              <div
                className={styles.remove}
                style={{ cursor: "pointer" }}
                onClick={() => {setImage(""); setRemoveImage(null)}}
              >
                Remove
              </div>
            )}
          </div>
          <div></div>
          <div className={styles.lowerWrap}>
            <div className={"formFlex"}>
              <div className={"formGroup"}>
                <CustomTextField
                  isError={errorData?.s_name}
                  errorText={errorData?.s_name}
                  label={"Name"}
                  value={form?.s_name}
                  onTextChange={(text) => {
                    changeTextData(text, "s_name");
                  }}
                  onBlur={() => {
                    onBlurHandler("s_name");
                  }}
                />
              </div>
            </div>
            <div className={"formFlex"}>
              <div className={"formGroup"}>
                <CustomTextField
                  isError={errorData?.s_designation}
                  errorText={errorData?.s_designation}
                  label={"DESIGNATION"}
                  value={form?.s_designation}
                  onTextChange={(text) => {
                    changeTextData(text, "s_designation");
                  }}
                  onBlur={() => {
                    onBlurHandler("s_designation");
                  }}
                />
              </div>
              <div className={"formGroup"}>
                <CustomTextField
                  isError={errorData?.s_company}
                  errorText={errorData?.s_company}
                  label={"COMPANY"}
                  value={form?.s_company}
                  onTextChange={(text) => {
                    changeTextData(text, "s_company");
                  }}
                  onBlur={() => {
                    onBlurHandler("s_company");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={""}>
          <div className={"headerFlex"}>
            {/* <h4 className={""}>
              <div className={"heading"}>DESCRIPTION</div>
            </h4> */}
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.s_description}
              errorText={errorData?.s_description}
              label={"DESCRIPTION"}
              value={form?.s_description}
              onTextChange={(text) => {
                changeTextData(text, "s_description");
              }}
              onBlur={() => {
                onBlurHandler("s_description");
              }}
            />
          </div>
        </div>
        <div className={""}>
          <div className={"headerFlex"}>
            {/* <h4 className={""}>
              <div className={"heading"}>DESCRIPTION</div>
            </h4> */}
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.priority}
              errorText={errorData?.priority}
              label={"Priority"}
           
              value={form?.priority}
              onTextChange={(text) => {
                changeTextData(text, "priority");
              }}
              onBlur={() => {
                onBlurHandler("priority");
              }}
            />
          </div>
        </div>
        <div className={"headerFlex"}>
        <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.linkedin_link}
              errorText={errorData?.linkedin_link}
              label={"Linkedin Link "}
              value={form?.linkedin_link}
              onTextChange={(text) => {
                changeTextData(text, "linkedin_link");
              }}
              onBlur={() => {
                onBlurHandler("linkedin_link");
              }}
            />
          </div>
        </div> 
      </div>
      <div className={"plainPaper"}>
        {/* <div style={{ display: "flex", marginTop: "10px", gap: "10px" }}>
          <input type="checkbox" value={speaker} />{" "}
          <span>
            <b>Is Moderator</b>
          </span>
        </div> */}
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Status</div>
          </h4>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomSwitch
              value={form?.s_status}
              handleChange={() => {
                changeTextData(!form?.s_status, "s_status");
              }}
              label={form?.s_status ? "Active" : "Inactive"}
            />
          </div>
        </div>
        {/* <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomCheckbox
              color={"primary"}
              handleChange={(text) => {
                changeTextData(!form?.is_recommended, "is_recommended");
              }}
              label={"Recommended"}
              checked={form?.is_recommended}
            />
          </div>
        </div> */}
        <div className={styles.btnWrappepr}>
          <ButtonBase
            disabled={isSubmitting ? true : false}
            type={"button"}
            className={styles.createBtn}
            onClick={() => handleSubmit("PENDING")}
          >
            {isSubmitting ? (
              <CircularProgress color="success" size="20px" />
            ) : (
              "Update"
            )}
          </ButtonBase>
        </div>
      </div>
    </div>
  );
}

export default SpeakerMasterCreate;
