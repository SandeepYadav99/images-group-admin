import React from "react";
import { ButtonBase, CircularProgress, TextField } from "@material-ui/core";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import CustomSwitch from "../../../components/FormFields/CustomSwitch";
import useMeetingsCalendarCreateHook from "./MeetingsCalendarCreateHook";
import { Autocomplete } from "@material-ui/lab";
import { Clear, Search } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  iconBtnError: {
    color: theme.palette.error.dark,
  },
  deleteBtn: {
    color: "red",
    // borderBottom: '1px solid red'
  },
}));

const MeetingsCalendarCreate = ({
  handleToggleSidePannel,
  isSidePanel,
  empId,
}) => {
  const {
    form,
    errorData,
    isSubmitting,
    isLoading,
    handleSubmit,
    selectCalendarBookWith,
    selectCalendarRooms,
    changeTextData,
    id,
    selectCalendarTime,
    selectCalendarDate,
  } = useMeetingsCalendarCreateHook({
    handleToggleSidePannel,
    isSidePanel,
    empId,
  });

  const classes = useStyles();

  return (
    <div className={"plainPaper"}>
      {/* <div style={{}}>
        <ButtonBase onClick={() => historyUtils.goBack()}>
          <ArrowBackIos fontSize={"small"} />{" "}
          <span>
            <span className={styles.title}>Product Category</span>
          </span>
        </ButtonBase>
      </div> */}
      <div className={styles.departmentWrap}>
      <div className={"formFlex"}>
          <div className={"formGroup"}>
            <Autocomplete
              id="tags-outlined"
              onChange={(e, value) => {
                changeTextData(value, "booked_by");
              }}
              value={form.booked_by || []}
              options={[]} // filteredTask ||
              getOptionLabel={(option) => option?.title}
              defaultValue={form?.booked_by || []}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Booked By"
                  error={errorData?.booked_by}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {form?.booked_by ? (
                          <Clear
                            onClick={() =>
                              changeTextData(null, "booked_by")
                            }
                            style={{ cursor: "pointer" }}
                          />
                        ) : null}
                        <Search
                          style={{ marginRight: -20, cursor: "pointer" }}
                        />
                      </>
                    ),
                  }}
                />
              )}
               disableClearable
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <Autocomplete
              id="tags-outlined"
              onChange={(e, value) => {
                changeTextData(value, "booked_with");
              }}
              value={form.booked_with || []}
              options={selectCalendarBookWith || []} // filteredTask ||
              getOptionLabel={(option) => option?.title}
              defaultValue={form?.booked_with || []}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Booked With"
                  error={errorData?.booked_with}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {form?.booked_with ? (
                          <Clear
                            onClick={() =>
                              changeTextData(null, "booked_with")
                            }
                            style={{ cursor: "pointer" }}
                          />
                        ) : null}
                        <Search
                          style={{ marginRight: -20, cursor: "pointer" }}
                        />
                      </>
                    ),
                  }}
                />
              )}
               disableClearable
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <Autocomplete
              id="tags-outlined"
              onChange={(e, value) => {
                changeTextData(value, "choose_date");
              }}
              value={form?.choose_date || []}
              options={selectCalendarDate || []}
              getOptionLabel={(option) => option?.dateText || ""}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Choose Date"
                  error={errorData?.choose_date}
                />
              )}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <Autocomplete
              id="tags-outlined"
              onChange={(e, value) => {
                changeTextData(value, "choose_time");
              }}
              value={form?.choose_time || []}
              options={selectCalendarTime || []}
              getOptionLabel={(option) => option?.slotText || ""}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Choose Time"
                  error={errorData?.choose_time}
                />
              )}
            />
          </div>
        </div>
      
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <Autocomplete
              id="tags-outlined"
              onChange={(e, value) => {
                changeTextData(value, "meeting_room");
              }}
              value={form?.meeting_room || []}
              options={selectCalendarRooms || []}
              getOptionLabel={(option) => option?.room_name || ""}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Meeting Room"
                  error={errorData?.meeting_room}
                />
              )}
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
            {/* {isSubmitting ? (
              <CircularProgress color="success" size="20px" />
            ) : empId ? (
              "AUTO CONFIRM"
            ) : ( */}
              AUTO CONFIRM
            {/* )} */}
          </ButtonBase>
        </div>
      </div>
    </div>
  );
};

export default MeetingsCalendarCreate;
