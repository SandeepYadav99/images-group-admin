import React from "react";
import { Button, ButtonBase, MenuItem } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";


import useAssociatedEventPopUp from "./AssociatedEventPopUpHook";
import CustomSelectField from "../../../../../components/FormFields/SelectField/SelectField.component";

const useStyles = makeStyles((theme) => ({
  flex: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    color: "blue",
    textDecoration: "underline",
  },
  textField: {
    width: "100%",
  },
  closeBtn: {
    position: "absolute",
    right: "10px",
    top: "10px",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AssociatedEventPopUp = ({ isOpen, handleToggle, candidateId }) => {
  const classes = useStyles();
  const {
    changeTextData,
    errorData,
    form,
    handleSubmit,
    onBlurHandler,
    listData,
  } = useAssociatedEventPopUp({ isOpen, handleToggle, candidateId });

  return (
    <div>
      <Dialog
        onBackdropClick={() => {}}
        keepMounted
        fullWidth={true}
        maxWidth={"sm"}
        TransitionComponent={Transition}
        open={isOpen}
        onClose={() => {}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className={styles.resetPasswordWrapper}>
          <div className={styles.resetWrapper}>
            <ButtonBase
              classes={{ root: classes.closeBtn }}
              onClick={handleToggle}
            >
              <Close />
            </ButtonBase>
          </div>
          <div className={styles.headingWrapper}>
            {/* <div className={styles.heading}>Approve Request</div>
            <div className={styles.newLine}></div> */}
            <div className={styles.des}>Please confirm status</div>
          </div>

          <div className={styles.fieldWrapper}>
            <div>
              <CustomSelectField
                isError={errorData?.status}
                errorText={errorData?.status}
                label={"Select Status"}
                value={form?.status}
                handleChange={(value) => {
                  changeTextData(value, "status");
                }}
              >
                <MenuItem value="IN_PERSON">Active</MenuItem>
                <MenuItem value="TELEPHONIC">InActive</MenuItem>
              </CustomSelectField>
            </div>
          </div>
          <div className={styles.printFlex}>
            <ButtonBase onClick={handleSubmit} className={styles.createBtn}>
              Confirm
            </ButtonBase>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default AssociatedEventPopUp;
