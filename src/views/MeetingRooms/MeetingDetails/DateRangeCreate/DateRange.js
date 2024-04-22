import React, { useMemo } from "react";
import { ButtonBase, CircularProgress, MenuItem } from "@material-ui/core";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";
import CustomSelectField from "../../../../components/FormFields/SelectField/SelectField.component";
import CustomSwitch from "../../../../components/FormFields/CustomSwitch";
import useDateRange from "./DateRange.hook";
import CustomDateTimePicker from "../../../../components/FormFields/DatePicker/CustomDateTimePicker";

const useStyles = makeStyles((theme) => ({
  iconBtnError: {
    color: theme.palette.error.dark,
  },
  deleteBtn: {
    color: "red",
  },
}));

const DateRangeView = ({
  handleToggleSidePannel,
  isSidePanel,
  empId,
  eventIdData,
}) => {
  const {
    form,
    errorData,
    isSubmitting,
    handleSubmit,
    onBlurHandler,
    changeTextData,
    slotDuration,
  } = useDateRange({ handleToggleSidePannel, isSidePanel, empId, eventIdData });

  const classes = useStyles();


  return (
    <div className={styles.departmentWrap}>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <CustomDateTimePicker
            clearable
            label={"Available From"}
            minDate={new Date()}
            onChange={(date) => {
              changeTextData(date, "start_date");
            }}
            value={form?.start_date}
            isError={errorData?.start_date}
          />
        </div>
      </div>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <CustomDateTimePicker
            clearable
            label={"Available Till"}
            minDate={new Date()}
            onChange={(date) => {
              changeTextData(date, "end_date");
            }}
            value={form?.end_date}
            isError={errorData?.end_date}
          />
        </div>
      </div>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <CustomSelectField
            isError={errorData?.duration}
            errorText={errorData?.duration}
            label={"Durations"}
            value={form?.duration ? form?.duration : ""}
            handleChange={(value) => {
              changeTextData(value, "duration");
            }}
          >
            {slotDuration?.map((value, i) => {
              return (
                <MenuItem key={i} value={value}>
                  {value}
                </MenuItem>
              );
            })}
          </CustomSelectField>
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
          ) : (
            "AUTO CREATE SLOTS"
          )}
        </ButtonBase>
      </div>
    </div>
  );
};

export default DateRangeView;
