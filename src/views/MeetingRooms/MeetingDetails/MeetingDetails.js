import styles from "./Style.module.css";
import history from "../../../libs/history.utils";
import {
  ButtonBase,
  CircularProgress,
  Dialog,
  IconButton,
  MenuItem,
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import useMeetingDetailHook from "./MeetingDetails.hook";
import StatusPill from "../../../components/Status/StatusPill.component";
import { Add } from "@material-ui/icons";
import PageBoxComponent from "../../../components/PageBox/PageBox.component";
import { useCallback, useMemo } from "react";
import Constants from "../../../config/constants";
import { useSelector } from "react-redux";
import { InfoOutlined } from "@material-ui/icons";
import FilterComponent from "../../../components/Filter/Filter.component";
import DataTables from "../../../Datatables/Datatable.table";
import SidePanelComponent from "../../../components/SidePanel/SidePanel.component";
import MeetingCreateView from "../MeetingMaster/MeetingMaster";
import DateRangeView from "./DateRangeCreate/DateRange";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";
import UpdateIconData from "../../../assets/ImageGroup/ic_update.png";
import DuplicateView from "./DuplicateRoom/Duplicate.view";

const MeetingDetails = ({ location }) => {
  const {
    form,
    errorData,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isSubmitting,
    dataValue,
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleEdit,
    handleFilterDataChange,
    handleSearchValueChange,
    handleViewDetails,
    isCalling,
    configFilter,
    handleToggleSidePannel,
    isSidePanel,
    editData,
    handleOpenDateRange,
    dateRange,
    event,
    popupOpen,
    handleOpenPopUp,
    handleClosePopUp,
    handleOpenDuplicate,
    duplicate,
  } = useMeetingDetailHook({ location });

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.meeting_room);

  const renderFirstCell = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.firstCellFlex}>
          <a href={obj?.image} target="_blank">
            <img
              src={obj?.image}
              alt="imagetext"
              style={{ height: "50px", width: "50px" }}
            />
          </a>
          <div className={styles.productName}>{obj?.name}</div>
        </div>
      );
    }
    return null;
  }, []);

  const UpdateStatusPopUp = ({ open, onClick }) => {
    console.log(isSubmitting, "isSubmitting is here ");
    return (
      <Dialog
        open={open}
        aria-labelledby="dialog-title"
        sx={{ width: "auto", padding: "20px" }}
      >
        <div className={styles.dialogTitle} onClick={onClick}>
          <div></div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span>Update Status</span>
            <div className={styles.newLine}></div>
          </div>
          <div
            onClick={onClick}
            style={{ fontSize: "24px" }}
            className={styles.crossIconArea}
          >
            x
          </div>
        </div>
        <div className={styles.commentArea}>
          <CustomSelectField
            isError={errorData?.status}
            errorText={errorData?.status}
            label={"Choose Status"}
            value={form?.status ? form?.status : ""}
            handleChange={(value) => {
              changeTextData(value, "status");
            }}
          >
            <MenuItem value="AVAILABLE">AVAILABLE</MenuItem>
            <MenuItem value="BOOKED">BOOKED</MenuItem>
            <MenuItem value="BLOCKED">BLOCKED</MenuItem>
            <MenuItem value="UNAVAILABLE">UNAVAILABLE</MenuItem>
          </CustomSelectField>
        </div>
        <div className={styles.btnCenterContainer}>
          {isSubmitting ? (
            <CircularProgress color="success" size="20px" />
          ) : (
            <ButtonBase
              disabled={isSubmitting ? true : false}
              type={"button"}
              className={styles.createBtn}
              onClick={handleSubmit}
            >
              UPDATE
            </ButtonBase>
          )}
        </div>
      </Dialog>
    );
  };

  const tableStructure = useMemo(() => {
    return [
      {
        key: "date",
        label: "DATE",
        sortable: false,
        render: (value, all) => <div>{all?.slotDate}</div>,
      },
      {
        key: "slot",
        label: "SLOT",
        sortable: false,
        render: (temp, all) => <div>{all?.slotTime}</div>,
      },
      {
        key: "duration",
        label: "DURATION",
        sortable: false,
        render: (value, all) => <div>{all?.durationText}</div>,
      },
      {
        key: "status",
        label: "STATUS",
        sortable: false,
        render: (temp, all) => <div>{<StatusPill status={all?.status} />}</div>,
      },
      {
        key: "booked_by",
        label: "BOOKED BY",
        sortable: false,
        render: (value, all) => (
          <div className={styles.bookedBy}>
            {/* <img
              src={all?.bookedBy?.image && all.bookedBy?.image}
              style={{ height: "30px", width: "30px", borderRadius: "10px" }}
            /> */}
            <b>{all?.bookedBy?.name ? all?.bookedBy?.name : "--"}</b>
            <span className={styles.textBookedBy}>
              {all?.bookedBy?.company_name ? all?.bookedBy?.company_name : "--"}
            </span>
          </div>
        ),
      },
      {
        key: "booked_with",
        label: "BOOKED WITH",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.bookedBy}>
            <b>{all?.bookedWith?.name ? all?.bookedWith?.name : "--"}</b>
            <span className={styles.textBookedBy}>
              {all?.bookedWith?.company_name
                ? all?.bookedWith?.company_name
                : "--"}
            </span>
          </div>
        ),
      },
      {
        key: "ref_id",
        label: "REF ID",
        sortable: false,
        render: (temp, all) => <div>{all?.ref_id}</div>,
      },

      {
        key: "action",
        label: "Action",
        style: { width: "15%" },
        render: (temp, all) => (
          <div>
            <IconButton
              className={"tableActionBtn"}
              id={styles.iconBorder}
              color="secondary"
              disabled={isCalling}
              onClick={() => {
                handleOpenPopUp(all);
              }}
            >
              <img src={UpdateIconData} alt="text" />
              Update Status
            </IconButton>
          </div>
        ),
      },
    ];
  }, [renderFirstCell, handleViewDetails, handleEdit, isCalling]);

  const tableData = useMemo(() => {
    const datatableFunctions = {
      onSortOrderChange: handleSortOrderChange,
      onPageChange: handlePageChange,
      onRowSizeChange: handleRowSize,
    };

    const datatable = {
      ...Constants.DATATABLE_PROPERTIES,
      columns: tableStructure,
      data: data,
      count: allData.length,
      page: currentPage,
    };

    return { datatableFunctions, datatable };
  }, [
    allData,
    tableStructure,
    handleSortOrderChange,
    handlePageChange,
    handleRowSize,
    data,
    currentPage,
  ]);

  return (
    <>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />
            <span className={"capitalize"}>
              <b>Meeting Room Detail</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>{" "}
      <div className={styles.paperData}>
        <div className={styles.roomName}>
          <span className={styles.name}>{dataValue?.name}</span>
          <span className={styles.code}>{dataValue?.code}</span>
        </div>
        <div>{<StatusPill status={dataValue?.status} />}</div>
        <div className={styles.btnFlex}>
          <ButtonBase
            className={"createBtn"}
            id={styles.bgColor}
            onClick={handleOpenDuplicate}
          >
            DUPLICATE
          </ButtonBase>
          <ButtonBase
            className={"createBtn"}
            id={styles.bgColor}
            onClick={handleToggleSidePannel}
          >
            UPDATE INFORMATION
          </ButtonBase>
        </div>
      </div>
      <br />
      <PageBoxComponent>
        <div className={styles.headerContainer}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <span className={styles.title}>Schedule</span>
            <div className={styles.newLine} />
          </div>
          <div>
            <ButtonBase className={"createBtn"} onClick={handleOpenDateRange}>
              ADD DATE RANGE
              <Add fontSize={"small"} className={"plusIcon"}></Add>
            </ButtonBase>
          </div>
        </div>
        <div>
          <div className={styles.sectionData}>
            <div className={styles.headingText}>
              <span className={styles.h2}>{dataValue?.total_slots}</span>
              <span className={styles.subh2}>Total Slots</span>
            </div>
            <div className={styles.headingText}>
              <span className={styles.h2}>{dataValue?.unavailable_slots}</span>
              <span className={styles.subh2}>UnAvailable</span>
            </div>
            <div className={styles.headingText}>
              <span className={styles.h2}>{dataValue?.blocked_slots}</span>
              <span className={styles.subh2}>Blocked</span>
            </div>
            <div className={styles.headingText}>
              <span className={styles.h2}>{dataValue?.booked_slots}</span>
              <span className={styles.subh2}>Booked</span>
            </div>
            <div className={styles.headingText}>
              <span className={styles.h2}>{dataValue?.available_slots}</span>
              <span className={styles.subh2}>Available</span>
            </div>
          </div>
          <FilterComponent
            is_progress={isFetching}
            filters={configFilter}
            handleSearchValueChange={handleSearchValueChange}
            handleFilterDataChange={handleFilterDataChange}
            searchHide={styles.hideSearch}
            marginSearchAtTop={styles.marginSearchAtTop}
          />
          <div>
            <br />
            <div style={{ width: "100%" }}>
              <DataTables
                {...tableData.datatable}
                {...tableData.datatableFunctions}
              />
            </div>
          </div>
        </div>
      </PageBoxComponent>
      <UpdateStatusPopUp open={popupOpen} onClick={handleClosePopUp} />
      <SidePanelComponent
        handleToggle={handleToggleSidePannel}
        title={"Update Meeting Room Details"}
        open={isSidePanel}
        side={"right"}
      >
        <MeetingCreateView
          handleToggleSidePannel={handleToggleSidePannel}
          isSidePanel={isSidePanel}
          empId={editData}
          detailsData={dataValue}
        />
      </SidePanelComponent>
      <SidePanelComponent
        handleToggle={handleOpenDateRange}
        title={"Add Data Range"}
        open={dateRange}
        side={"right"}
      >
        <DateRangeView
          handleToggleSidePannel={handleOpenDateRange}
          isSidePanel={dateRange}
          empId={editData}
          eventIdData={event}
          dataValueId={dataValue}
        />
      </SidePanelComponent>
      <SidePanelComponent
        handleToggle={handleOpenDuplicate}
        title={"Add Meeting Room"}
        open={duplicate}
        side={"right"}
      >
        <DuplicateView
          handleToggleSidePannel={handleOpenDuplicate}
          isSidePanel={duplicate}
          empId={editData}
          eventIdData={event}
          detailsData={dataValue}
        />
      </SidePanelComponent>
    </>
  );
};

export default MeetingDetails;
