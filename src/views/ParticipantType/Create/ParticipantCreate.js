import React, { useMemo } from "react";
import { ButtonBase, CircularProgress } from "@material-ui/core";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import { ArrowBackIos, Visibility, VisibilityOff } from "@material-ui/icons";
import historyUtils from "../../../libs/history.utils";
import useParticipantTypeCreate from "./Create.hook";
import CustomSwitch from "../../../components/FormFields/CustomSwitch";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  iconBtnError: {
    color: theme.palette.error.dark,
  },
  deleteBtn: {
    color: "red",
    // borderBottom: '1px solid red'
  },
}));

const ParticipantTypeCreate = ({
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
  } = useParticipantTypeCreate({
    handleToggleSidePannel,
    isSidePanel,
    empId,
    location,
  });

  const classes = useStyles();

  const params = useParams();

  return (
    <div className={"plainPaper"}>
      <div>
        <ButtonBase onClick={() => historyUtils.goBack()}>
          <ArrowBackIos fontSize={"small"} />{" "}
          <span>
            <span className={styles.title}>
              {params?.id ? "Update" : "Add"} Participants Type
            </span>
          </span>
        </ButtonBase>
      </div>
      <div className={styles.departmentWrap}>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.type}
              errorText={errorData?.type}
              label={"Type"}
              value={form?.type}
              onTextChange={(text) => {
                changeTextData(text, "type");
              }}
              onBlur={() => {
                onBlurHandler("type");
              }}
            />
          </div>
        </div>
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

export default ParticipantTypeCreate;
