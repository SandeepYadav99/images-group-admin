import styles from "./Style.module.css";
import { Close } from "@material-ui/icons";
import { ButtonBase, Dialog, MenuItem, Slide } from "@material-ui/core";
import React from "react";
import LogUtils from "../../../../libs/LogUtils";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const VideoDialog = ({
  isOpen,
  handleDialog,
  isSubmitting,
  handleConfirm,
    videoLink
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
          <h1 className={styles.headingText}>Media</h1>
          <div className={styles.newLine} />
          <br/>
        </div>
        <div>
          {videoLink && (<video style={{ width: "100%" }} autoPlay controls>
            <source src={videoLink} type="video/mp4" />
          </video>)}
        </div>
        {/*<div className={styles.confirmedWrapper}>*/}
        {/*  <ButtonBase*/}
        {/*    disabled={isSubmitting}*/}
        {/*    className={styles.createBtn}*/}
        {/*    onClick={handleConfirm}*/}
        {/*  >*/}
        {/*    CONFIRM*/}
        {/*  </ButtonBase>*/}
        {/*</div>*/}
      </div>
    </Dialog>
  );
};

export default VideoDialog;
