import React, { useMemo } from "react";
import { ButtonBase, CircularProgress } from "@material-ui/core";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import useProductCategory from "./Create.hook";
import { ArrowBackIos, Visibility, VisibilityOff } from "@material-ui/icons";
import historyUtils from "../../../libs/history.utils";

const useStyles = makeStyles((theme) => ({
  iconBtnError: {
    color: theme.palette.error.dark,
  },
  deleteBtn: {
    color: "red",
    // borderBottom: '1px solid red'
  },
}));

const CustomParticipantView = ({
  handleToggleSidePannel,
  isSidePanel,
  empId,
  location,
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
  } = useProductCategory({
    handleToggleSidePannel,
    isSidePanel,
    empId,
    location,
  });

  const classes = useStyles();

  return (
    <div className={"plainPaper"}>
      <div>
        <ButtonBase onClick={() => historyUtils.goBack()}>
          <ArrowBackIos fontSize={"small"} />{" "}
          <span>
            <span className={styles.title}>{id ? "Update" : "Add"} Custom Participants Fields</span>
          </span>
        </ButtonBase>
      </div>
      <div className={styles.departmentWrap}>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.label}
              errorText={errorData?.label}
              label={"Name"}
              value={form?.label}
              onTextChange={(text) => {
                changeTextData(text, "label");
              }}
              onBlur={() => {
                onBlurHandler("label");
              }}
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
    </div>
  );
};

export default CustomParticipantView;
