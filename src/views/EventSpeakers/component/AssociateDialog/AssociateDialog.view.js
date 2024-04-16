import React, { useEffect, useState } from "react";
import { Button, ButtonBase, TextField } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import { Autocomplete } from "@material-ui/lab";
import useAssociateDialogHook from "./AssociateDialog.hook";
import { serviceAssociatedSpeaker } from "../../../../services/EventSpeaker.service";
import { useParams } from "react-router-dom";

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

const AssociateDialog = ({ isOpen, handleToggle, candidateId, data }) => {
  const classes = useStyles();
  const {
    changeTextData,
    errorData,
    form,
    handleSubmit,
    onBlurHandler,
    listData,
  } = useAssociateDialogHook({ isOpen, handleToggle, candidateId, data });

  console.log(listData?.SPEAKERS,"HELLO IT IS HERE");

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
            <div className={styles.heading}>Associate Speakers</div>
            <div className={styles.newLine}></div>
          </div>

          <div className={styles.fieldWrapper}>
            <div>
              <Autocomplete
                multiple
                id="tags-outlined"
                onChange={(e, value) => {
                  changeTextData(value, "album_id");
                }}
                value={form?.album_id}
                options={listData?.SPEAKERS? listData?.SPEAKERS : []}
                getOptionLabel={(option) => option.name}
                defaultValue={form?.album_id}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Speakers"
                    error={errorData?.album_id}
                  />
                )}
              />
            </div>
            <div className={styles.lower}>
              {console.log(form?.album_id,"Album id is here")}
              {form?.album_id?.length > 0 &&
                form?.album_id?.map((item) => (
                  <div className={styles.firstCellFlex}>
                    <img src={item?.image} alt="BannerImg" />
                    <div className={styles.productName}>{item?.name}</div>
                  </div>
                ))}
            </div>
          </div>

          <div className={styles.printFlex}>
            <ButtonBase onClick={handleSubmit} className={styles.createBtn}>
              Add Speakers
            </ButtonBase>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default AssociateDialog;
