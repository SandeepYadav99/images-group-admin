import React, { useMemo } from "react";
import { TextField, ButtonBase, MenuItem } from "@material-ui/core";
import styles from "./Styles.module.css";
import LogUtils from "../../../../libs/LogUtils";
import CustomDateTimePicker from "../../../../components/FormFields/DatePicker/CustomDateTimePicker";
import CustomTimePicker from "../../../../components/FormFields/DatePicker/CustomTimePicker";
import CustomDatePicker from "../../../../components/FormFields/DatePicker/CustomDatePicker";

const Standard = ({ index, changeData, handlePress, data, errors }) => {

  const handleChange = (e, fieldName) => {
      changeData(index, { [fieldName]: e });
  };

  return (
    <div>
      <div className={styles.flexContainer}>
        <div className={styles.firstRow}>
          <div className={styles.flex1}>
            <CustomDatePicker
              clearable
              label={"Choose Date"}
              minDate={new Date()}
              onChange={(date) => {
                handleChange(date, "start_time");
              }}
              value={data?.start_time}
              isError={errors?.start_time}
            />
          </div>
        </div>
        <div className={styles.firstRow}>
          <div className={styles.flex12}>
            <CustomDateTimePicker
              clearable
              label={"Start Time"}
              minDate={new Date()}
              onChange={(date) => {
                handleChange(date, "start_time");
              }}
              value={data?.start_time}
              isError={errors?.start_time}
            />{" "}
          </div>
          <div className={styles.flex12}>
            <CustomDateTimePicker
              clearable
              label={"End Time"}
              minDate={new Date(data?.start_time)}
              onChange={(date) => {
                handleChange(date, "end_time");
              }}
              value={data?.end_time}
              isError={errors?.end_time}
            />{" "}
          </div>
        </div>

        <div className={styles.firstRow221}>
          <div className={"textCenter"}>
            <ButtonBase
              className={styles.removeBtn}
              onClick={() => {
                handlePress(index == 0 ? "-" : "-", index);
              }}
            >
              {index == 0 ? "Remove" : "Remove"}
            </ButtonBase>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Standard;
