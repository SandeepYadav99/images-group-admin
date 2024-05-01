import React from "react";
import {
  Button,
  ButtonBase,
  CircularProgress,
  MenuItem,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";

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

const DeleteModal = ({ isOpen, handleToggle, handleSubmit }) => {
  const classes = useStyles();

  return (
    <div>
      <Dialog
        onBackdropClick={() => {}}
        keepMounted
        //  fullWidth={false}
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
              onClick={()=>handleToggle()}
            >
              <Close />
            </ButtonBase>
          </div>
          <div className={styles.headingWrapper}>
            {/* <div className={styles.heading}>Approve Request</div> */}

            <div className={styles.des}>Delete Confirmation</div>
            <div className={styles.newLine}></div>
          </div>

          <div className={styles.fieldWrapper}>
            Are you sure you want to delete this entry? This action can not be
            undone.
          </div>
          <div className={styles.printFlex}>
            <ButtonBase onClick={handleSubmit} className={styles.createBtn}>
              DELETE
            </ButtonBase>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default DeleteModal;
