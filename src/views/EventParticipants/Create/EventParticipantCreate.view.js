import React, { useMemo } from "react";
import { ButtonBase, CircularProgress, TextField } from "@material-ui/core";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import CustomSwitch from "../../../components/FormFields/CustomSwitch";
import useEventParticipantCreate from "./EventParticipantCreateHook";
import CustomAutoComplete from "../../../components/FormFields/AutoCompleteText/CustomAutoComplete";
import LogUtils from "../../../libs/LogUtils";
import CountryInputField from "../../../components/CountryInputField/CountryInputField";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";
import { MenuItem } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import CustomCountryFC from "../../../components/CountryFC/CustomCountryFC";
import { removeUnderScore } from "../../../helper/helper";

const useStyles = makeStyles((theme) => ({
  iconBtnError: {
    color: theme.palette.error.dark,
  },
  deleteBtn: {
    color: "red",
    // borderBottom: '1px solid red'
  },
}));

const EventParticipantCreateView = ({
  handleToggleSidePannel,
  isSidePanel,
  empId,
}) => {
  const {
    form,
    errorData,
    isSubmitting,
    isLoading,
    handleSubmit,
    removeError,
    onBlurHandler,
    changeTextData,
    id,
    showPasswordCurrent,
    setShowPasswordCurrent,
    listData,
    isContactInList,
    handleCountryCode,
    countryCode,
    DataSetName,
    participantList,
    handleParticipant
  } = useEventParticipantCreate({ handleToggleSidePannel, isSidePanel, empId });
  const classes = useStyles();

  const tagList = useMemo(()=>{
    const getList = listData?.PARTICIPANT_TYPE?.length > 0 ? listData?.PARTICIPANT_TYPE?.map((item)=>item?.key):[];
    return getList
  },[listData])
  
  return (
    <div className={styles.departmentWrap}>
      <div className="formFlex">
        <div className={"formGroup"}>
          <CustomCountryFC
            type="tel"
            isError={errorData?.contact}
            errorText={errorData?.contact}
            label={"Contact"}
            value={form?.contact}
            onTextChange={(text) => {
              changeTextData(text, "contact");
          }}
          onBlur={() => {
              onBlurHandler("contact");
          }}
          />
          {/* <div style={{ display: "flex", gap: "10px" }}>
            <CountryInputField
              countryCode={countryCode}
              handleCountryCodeChange={handleCountryCode}
            />
            <CustomTextField
              isError={errorData?.contact}
              errorText={errorData?.contact}
              label={"Contact"}
              value={form?.contact}
              onTextChange={(text) => {
                changeTextData(text, "contact");
              }}
              onBlur={() => {
                onBlurHandler("contact");
              }}
            />
          </div> */}
        </div>
      </div>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <CustomTextField
            isError={errorData?.name}
            errorText={errorData?.name}
            label={"Full Name"}
            value={form?.name}
            onTextChange={(text) => {
              changeTextData(text, "name");
            }}
            onBlur={() => {
              onBlurHandler("name");
            }}
            disabled={isContactInList}
          />
        </div>
      </div>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <CustomTextField
            isError={errorData?.title}
            errorText={errorData?.title}
            label={"Title/Designation"}
            value={form?.title}
            onTextChange={(text) => {
              changeTextData(text, "title");
            }}
            onBlur={() => {
              onBlurHandler("title");
            }}
            // disabled={isContactInList}
          />
        </div>
      </div>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <CustomTextField
            isError={errorData?.email}
            errorText={errorData?.email}
            label={"Email"}
            value={form?.email}
            onTextChange={(text) => {
              changeTextData(text, "email");
            }}
            onBlur={() => {
              onBlurHandler("email");
            }}
            disabled={isContactInList}
          />
        </div>
      </div>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <CustomTextField
            isError={errorData?.company_name}
            errorText={errorData?.company_name}
            label={"Company Name"}
            value={form?.company_name}
            onTextChange={(text) => {
              changeTextData(text, "company_name");
            }}
            onBlur={() => {
              onBlurHandler("company_name");
            }}
          />
        </div>
      </div>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <CustomTextField
            isError={errorData?.category}
            label={"Add Category "}
            value={form?.category}
            onTextChange={(text) => {
              changeTextData(text, "category");
            }}
            onBlur={() => {
              onBlurHandler("category");
            }}
            // disabled={isContactInList}
          />
        </div>
      </div>
      {/* <div className={"formFlex"}>
        <div className={"formGroup"}>
          <CustomTextField
            isError={errorData?.rref_id}
            errorText={errorData?.ref_id}
            label={"Ref Id"}
            value={form?.ref_id}
            onTextChange={(text) => {
              changeTextData(text, "ref_id");
            }}
            onBlur={() => {
              onBlurHandler("ref_id");
            }}
          />
        </div>
      </div> */}
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <Autocomplete
            multiple
            id="tags-outlined multipe_value"
            onChange={(e, value) => {
              changeTextData(value, "participant_type");
            }}
            getOptionLabel={(option) => removeUnderScore(option)}
            value={form?.participant_type}
            options={tagList ? tagList : []}
            defaultValue={form?.participant_type}
            error={errorData?.participant_type}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Participants Type"
                error={errorData?.participant_type}
              />
            )}
          />
        </div>
      </div>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <CustomSelectField
            isError={errorData?.is_awards}
            errorText={errorData?.is_awards}
            label={"Awards Access"}
            value={form?.is_awards ? form?.is_awards : ""}
            handleChange={(value) => {
              changeTextData(value, "is_awards");
            }}
          >
            <MenuItem value="YES">YES</MenuItem>
            <MenuItem value="NO">NO</MenuItem>
          </CustomSelectField>
        </div>
      </div>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <CustomSelectField
            isError={errorData?.is_lunch}
            errorText={errorData?.is_lunch}
            label={"Lunch Access"}
            value={form?.is_lunch ? form?.is_lunch : ""}
            handleChange={(value) => {
              changeTextData(value, "is_lunch");
            }}
            defaultValue={"NO"}
          >
            <MenuItem value="YES">YES</MenuItem>
            <MenuItem value="NO">NO</MenuItem>
          </CustomSelectField>
        </div>
      </div>
      {/* <div className={"formFlex"}> */}
        {participantList?.map((item, index) => (
          <div key={`part_${index}`}  className={"formGroup"}>
            <CustomSelectField
              label={item?.label}
              value={item?.value}
              handleChange={(value) => {
                handleParticipant(value, item?.key);
              }}
              defaultValue={"NO"}
            >
              <MenuItem value="YES">YES</MenuItem>
              <MenuItem value="NO">NO</MenuItem>
            </CustomSelectField>
          </div>
        ))}
      {/* </div> */}
      {/* <div className={"formFlex"}>
        <div className={"formGroup"}>
          <CustomSwitch
            value={form?.is_auto}
            handleChange={() => {
              changeTextData(!form?.is_auto, "is_auto");
            }}
            label={`Send email to all new users`}
          />
        </div>
      </div> */}
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <CustomSwitch
            value={form?.is_default_password}
            handleChange={() => {
              changeTextData(!form?.is_default_password, "is_default_password");
            }}
            label={`Set Registration ID as password for new mobile user`}
          />
        </div>
      </div>
      <div className={styles.btnCont}>
        <ButtonBase
          disabled={isSubmitting}
          type={"button"}
          onClick={handleSubmit}
          className={styles.createBtn}
        >
          {isSubmitting ? (
            <CircularProgress color="success" size="20px" />
          ) : empId ? (
            "Update"
          ) : (
            "Create"
          )}
        </ButtonBase>
      </div>
    </div>
  );
};

export default EventParticipantCreateView;
