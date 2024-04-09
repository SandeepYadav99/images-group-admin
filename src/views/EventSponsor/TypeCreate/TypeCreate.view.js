import React from "react";
import history from "../../../libs/history.utils";
import { Button, ButtonBase, CircularProgress } from "@material-ui/core";
import styles from "./Style.module.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import useTypeCreate from "./TypeCreate.hook";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import CustomSwitch from "../../../components/FormFields/CustomSwitch";
import { useParams } from "react-router-dom";

function TypeCreate({ location }) {
  const {
    form,
    errorData,
    listData,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isSubmitting,
    selectedEventId,
  } = useTypeCreate({ location });

  const params = useParams();
  return (
    <div className={styles.claimListWrapper}>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />
            <span className={"capitalize"}>
              <b> {params?.id ? "Edit" : "Add" } Partner type</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Partner type Details</div>
          </h4>
        </div>
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

      <div className={"plainPaper"}>
        <div className={styles.action_container}>
          <div style={{marginBlock:"20px"}}>
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
                  label={form?.status ? `Active` : "Inactive"}
                />
              </div>
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
    </div>
  );
}

export default TypeCreate;
