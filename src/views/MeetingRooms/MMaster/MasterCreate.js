import { useRef } from "react";
import styles from "./Style.module.css";
import useMMasterCreate from "./Master.hook";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";
import { ButtonBase, CircularProgress, MenuItem } from "@material-ui/core";
import StandardForm from "./component/StandardForm";
import historyUtils from "../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";


const MMaster = () => {
  const slotDuration = ["30", "60", "90", "120", "150", "180"];

  const {
    form,
    changeTextData,
    onBlurHandler,
    handleSubmit,
    isLoading,
    isSubmitting,
    errorData,
    editData,
    declaration,
    setDeclaration,
    employeeDetails,
    travelRef,
    otherRef,
    isBond,
    isChecked,
    coRef,
    employees,
    amountDetail,
    handleCheckboxChange,
  } = useMMasterCreate({});

  return (
    <>
      <div className={styles.claimListWrapper}>
        <div className={styles.outerFlex}>
          <div>
            <ButtonBase onClick={() => historyUtils.goBack()}>
              <ArrowBackIosIcon fontSize={"small"} />
              <span className={"capitalize"}>
                <b> Meeting Master</b>
              </span>
            </ButtonBase>
            <div className={styles.newLine} />
          </div>
        </div>
      </div>
      <div className={styles.paper}>
        <span className={styles.heading}>Meeting Slot Details</span>
        <span className={styles.subTitle}>
          Please set the meeting rooms master availability slots to be show to
          users during which the meetings can be scheduled during the event.
        </span>
        <CustomSelectField
          isError={errorData?.duration}
          errorText={errorData?.duration}
          label={"Standard Duration"}
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
        <span className={styles.heading1}>
          Choose Standard Meeting Rules For Event
        </span>
        <StandardForm ref={otherRef} grade={employeeDetails?.grade?.code} />{" "}
      </div>
      <div className={styles.btnEndPosition}>
        <ButtonBase
          type={"button"}
          className={styles.createBtn}
          onClick={handleSubmit}
        >
          {isLoading ? (
            <CircularProgress color="success" size="20px" />
          ) : (
            "UPDATE"
          )}
        </ButtonBase>
      </div>
    </>
  );
};

export default MMaster;
