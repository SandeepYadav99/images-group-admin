import React from "react";
import { ButtonBase, CircularProgress, TextField } from "@material-ui/core";
import styles from "./Style.module.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import File from "../../../components/FileComponent/FileComponent.component";
import CustomSwitch from "../../../components/FormFields/CustomSwitch";
import historyUtils from "../../../libs/history.utils";
import { MenuItem } from "@material-ui/core";
import { useParams } from "react-router-dom";
import useMenuGraphicCreateHook from "./MenuGraphicCreateHook";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";
import { Autocomplete } from "@material-ui/lab";
import FEATURE_DATA from "../../../config/GraphicData";
function MenuGraphicCreate({ location }) {
  const {
    form,
    errorData,
    changeTextData,
    onBlurHandler,
    handleSubmit,
    isSubmitting,
    image,
    id,
    featureValue,
    employDetail
  } = useMenuGraphicCreateHook({ location });

  const params = useParams();

  return (
    <div className={styles.claimListWrapper}>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => historyUtils.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />
            <span className={"capitalize"}>
              <b>{params?.id ? "Edit" : "Add"} Menu Graphic File</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Menu Graphic Details</div>
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
              error={errorData?.thumbnail}
              value={form?.thumbnail}
              default_image={image ? image : null}
              onChange={(file) => {
                if (file) {
                  changeTextData(file, "thumbnail");
                }
              }}
            />
          </div>
          <div className={styles.lowerWrap}>
            <div className={"formFlex"}>
              <div className={"formGroup"}>
                 <CustomSelectField
                  // disabled={disabled?.member_id}
                  isError={errorData?.featureName}
                  errorText={errorData?.featureName}
                  label={"Feature Name"}
                  value={form?.featureName}
                  handleChange={(value) => {
                    changeTextData(value, "featureName");
                  }}
                >
                  {FEATURE_DATA?.map((feature) => {
                    return <MenuItem value={feature?.key}>{feature?.value}</MenuItem>;
                  })}
                </CustomSelectField> 
                {/* <Autocomplete
                    id="tags-outlined"
                    onChange={(e, value) => {
                      changeTextData(value, "featureName");
                    }}
                    // defaultValue={form?.chapter_ids || employDetail}
                    value={form?.featureName || []}
                    options={featureValue || []}
                    getOptionLabel={(option) => option?.name || employDetail}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Feature Name"
                        error={errorData?.featureName}
                      />
                    )}
                  /> */}
              </div>
            </div>
            <div className={"formFlex"}>
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
              label={`Active`}
            />
          </div>
        </div>

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
              "ADD"
            )}
          </ButtonBase>
        </div>
      </div>
    </div>
  );
}

export default MenuGraphicCreate;
