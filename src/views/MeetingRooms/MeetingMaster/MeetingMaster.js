import React, { useMemo } from "react";
import {
  Button,
  ButtonBase,
  CircularProgress,
  IconButton,
  InputAdornment,
  MenuItem,
} from "@material-ui/core";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";
import CustomSwitch from "../../../components/FormFields/CustomSwitch";
import useMeetingCreate from "./MeetingMaster.hook";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import country_code from "../../../assets/country_code.json";

const useStyles = makeStyles((theme) => ({
  iconBtnError: {
    color: theme.palette.error.dark,
  },
  deleteBtn: {
    color: "red",
  },
}));

const MeetingCreateView = ({ handleToggleSidePannel, isSidePanel, empId }) => {
  const {
    form,
    errorData,
    isSubmitting,
    handleSubmit,
    onBlurHandler,
    changeTextData,
  } = useMeetingCreate({ handleToggleSidePannel, isSidePanel, empId });

  const classes = useStyles();

  return (
    <div className={styles.departmentWrap}>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <CustomTextField
            isError={errorData?.name}
            errorText={errorData?.name}
            label={"Meeting Room Name"}
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
            isError={errorData?.code}
            errorText={errorData?.code}
            label={"Meeting Room Code"}
            value={form?.code}
            onTextChange={(text) => {
              changeTextData(text, "code");
            }}
            onBlur={() => {
              onBlurHandler("code");
            }}
          />
        </div>
      </div>
      
      <div className={"headerFlex"}>
        <h4 className={"infoTitle"}>
          <div className={"heading"}>Status</div>
        </h4>
      </div>

      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <CustomSwitch
            value={form?.is_active}
            handleChange={() => {
              changeTextData(!form?.is_active, "is_active");
            }}
            label={`Active`}
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

export default MeetingCreateView;
