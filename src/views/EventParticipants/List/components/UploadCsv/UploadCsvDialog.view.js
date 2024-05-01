import React, { useCallback, useMemo, useState } from "react";
import {
  Button,
  ButtonBase,
  CircularProgress,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Close, Visibility, VisibilityOff } from "@material-ui/icons";
import Slide from "@material-ui/core/Slide";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import styles from "./Style.module.css";
import LogUtils from "../../../../../libs/LogUtils";
import { makeStyles } from "@material-ui/styles";
import useUploadCsvDialogHook from "./UploadCsvDialog.hook";
import File from "../../../../../components/FileComponent/FileComponent.component";
import CustomTextField from "../../../../../components/FormFields/TextField/TextField.component";
import CustomSwitch from "../../../../../components/FormFields/CustomSwitch";
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

const UploadCsvDialog = ({ isOpen, handleToggle, handleCsvUpload }) => {
  const classes = useStyles();
  const {
    changeTextData,
    errorData,
    form,
    handleSubmit,
    onBlurHandler,
    removeError,
    resData,
    isSubmitted,
    isSubmitting,
    isVerified,
    showPasswordCurrent,
    setShowPasswordCurrent,
    handleSampleDownload,
  } = useUploadCsvDialogHook({ isOpen, handleCsvUpload, handleToggle });
  const renderTable = useMemo(() => {
    if (resData.length === 0) return "Success";
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Sr. No.</TableCell>
              <TableCell align="right">Required Data</TableCell>
              <TableCell align="right">Lookup Fail</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resData.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row?.sr_no}
                </TableCell>
                <TableCell align="right">{row?.required?.join(", ")}</TableCell>
                <TableCell align="right">
                  {row?.lookup_err?.join(", ")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }, [resData]);

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
        <div className={"flex"}>
          <div className={styles.upperFlex}>Import CSV</div>
          <ButtonBase
            classes={{ root: classes.closeBtn }}
            onClick={handleToggle}
          >
            <Close />
          </ButtonBase>
        </div>
        <DialogContent>
          {/* <CustomSelectField
            isError={errorData?.participant_type}
            errorText={errorData?.participant_type}
            label={"Participants Type"}
            value={form?.participant_type ? form?.participant_type : ""}
            handleChange={(value) => {
              changeTextData(value, "participant_type");
            }}
          >
            <MenuItem value="Exhibitor">Exhibitor</MenuItem>
            <MenuItem value="Speaker	">Speaker</MenuItem>
            <MenuItem value="Award Presentation">Award Presentation</MenuItem>
            <MenuItem value="Innovators Club	">Innovators Club </MenuItem>
            <MenuItem value="Jury">Jury</MenuItem>
          </CustomSelectField> */}

          <File
            max_size={100 * 1024 * 1024}
            type={["csv"]}
            fullWidth={true}
            name="image"
            accept={"text/csv"}
            label=""
            default_image={form?.file ? form?.file : null}
            // user_image={form?.image}
            error={errorData?.file}
            // title={'image'}
            value={form?.file}
            // handleChange={this._handleFileChange}
            placeholder={"Csv File"}
            onChange={(file) => {
              LogUtils.log("file", file);
              if (file) {
                changeTextData(file, "file");
              }
            }}
          />
          {/* <CustomTextField
            type={showPasswordCurrent ? "text" : "password"}
            label={"Password"}
            value={form?.password}
            onTextChange={(text) => {
              changeTextData(text, "password");
            }}
            isError={errorData?.password}
            errorText={errorData?.password}
            onBlur={() => {
              onBlurHandler("password");
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPasswordCurrent(!showPasswordCurrent)}
                  >
                    {showPasswordCurrent ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          /> */}
          <div>
            <div className={"formFlex"}>
              <div className={"formGroup"}>
                <CustomSwitch
                  value={form?.is_active_email}
                  handleChange={() => {
                    changeTextData(!form?.is_active_email, "is_active_email");
                  }}
                  label={`Send Email to all new users`}
                />
              </div>
            </div>
            <div className={"formFlex"}>
              <div className={"formGroup"}>
                <CustomSwitch
                  value={form?.is_active_registration}
                  handleChange={() => {
                    changeTextData(
                      !form?.is_active_registration,
                      "is_active_registration"
                    );
                  }}
                  label={`Set Registration ID as password for new mobile user`}
                />
              </div>
            </div>
          </div>
        </DialogContent>

        {/*<DialogActions>*/}
        <div className={styles.printFlex}>
          <ButtonBase
            primary
            disabled={isSubmitting}
            onClick={handleSubmit}
            className={styles.btmBtn}
          >
            {isSubmitting ? <CircularProgress color="success" size="20px" /> :isVerified ? "Upload Csv" : "Verify Csv" }
          </ButtonBase>
        </div>
        <div className={styles.printFlex}>
          <ButtonBase
            primary
            disabled={true}
            onClick={handleSampleDownload}
            className={styles.disabledBtnReject}
          >
            Download Sample Template
          </ButtonBase>
        </div>
        {/*</DialogActions>*/}
        <div className={styles.tableCont}>{isSubmitted ? renderTable : ""}</div>
      </Dialog>
    </div>
  );
};

export default UploadCsvDialog;
