import styles from "./Styles.module.css";
import { Close } from "@material-ui/icons";
import { ButtonBase, Dialog, MenuItem, Slide } from "@material-ui/core";
import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteDialog = ({
  isOpen,
  handleDialog,
  isSubmitting,
  handleConfirm,
  moduleName
}) => {
  return (
    <Dialog
      // fullWidth={true}
      maxWidth={"xs"}
      keepMounted
      TransitionComponent={Transition}
      open={isOpen}
      onClose={handleDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      // classes={{paper: classes.dialog}}
    >
      <div className={styles.InterviewPopUpWrapper}>
        <div className={styles.closeWrap}>
          <Close style={{ cursor: "pointer" }} onClick={handleDialog}></Close>
        </div>

        <div className={styles.loginSignupText}>
          <h1 className={styles.headingText}>Delete Request</h1>
          <div className={styles.newLine} />
        </div>
        <div>
          <p style={{ fontSize: ".87rem" }}>
            Are you sure you want to Delete this {moduleName} ?
          </p>
        </div>
        <div className={styles.confirmedWrapper}>
          <ButtonBase
            disabled={isSubmitting}
            className={styles.createBtn}
            onClick={handleConfirm}
          >
            CONFIRM
          </ButtonBase>
        </div>
      </div>
    </Dialog>
  );
};

export default DeleteDialog;
