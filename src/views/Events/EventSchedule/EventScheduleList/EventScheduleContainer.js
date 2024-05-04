import React, { useCallback, useMemo } from "react";
import { IconButton, ButtonBase } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Add, Clear, DoneAll, InfoOutlined, Link } from "@material-ui/icons";
import PageBox from "../../../../components/PageBox/PageBox.component";
import SidePanelComponent from "../../../../components/SidePanel/SidePanel.component";
import styles from "./Style.module.css";
// import DataTables from "../../../../Datatables/Datatable.table";
import Constants from "../../../../config/constants";
import FilterComponent from "../../../../components/Filter/Filter.component";
import { Edit, RemoveRedEyeOutlined as ViewIcon } from "@material-ui/icons";
import StatusPill from "../../../../components/Status/StatusPill.component";
import EventScheduleView from "../EventScheduleCreate/EventSchedule.view";
import useEventScheduleList from "./EventScheduleList.hook";
import DataTables from "../../../../Datatables/Datatables.table";
import historyUtils from "../../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import DeleteIcon from "../../../../assets/img/ic_delete.png";
import ScheduleDetail from "../ScheduleDetail/ScheduleDetail";
import UpdateStatusView from "./component/UpdateStatus/UpdateStatusView";
import DeleteDialog from "./component/DeletedDilog/DeletedDilog";
const EventScheduleContainer = ({}) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleEdit,
    handleFilterDataChange,
    handleSearchValueChange,
    handleViewDetails,
    editData,
    isSidePanel,
    isCalling,
    configFilter,
    isDeletedPopUp,
    toggleDeletedDialog,
    handleToggleSidePannel,
    isRejectPopUp,
    toggleRejectDialog,
    handleAddCategory,
    dataValue,
    handleDeleteData,
    handleScheduleDetail,
    isScheduleDetail,
    scheduleStatus,
    detailId,
    speakerId,
    toggleUpdateStatus,
    isUpdateStatus,
    id
  } = useEventScheduleList({});
  // console.log(editData, "Edit Data")
  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.eventSchedule);

  const UpperInfo = useCallback(
    (obj) => {
      if (obj) {
        return (
          <div className={styles.InfoWrap}>
            <div>
              {editData === undefined ? "Add New Schedule" : "Edit Schedule"}{" "}
            </div>
            <div className={styles.newLine}></div>
          </div>
        );
      }
      return null;
    },
    [editData]
  );

  const ScheduleDetailUperView = useCallback(
    (obj) => {
      if (obj) {
        return (
          <div className={styles.InfoWrap}>
            <div>Schedule Detail</div>
            <div className={styles.newLine}></div>
          </div>
        );
      }
      return null;
    },
    [editData]
  );

  const tableStructure = useMemo(() => {
    return [
      {
        key: "name",
        label: "NAME",
        sortable: true,
        render: (temp, all) => <div>{all?.eve_name}</div>,
      },
      {
        key: "description",
        label: "DESCRIPTION",
        sortable: false,
        render: (value, all) => (
          <div className={styles.desData}>{all?.eve_description}</div>
        ),
      },
      {
        key: "date",
        label: "DATE",
        sortable: true,
        render: (temp, all) => <div>{all?.date_text}</div>,
      },
      {
        key: "start time",
        label: "START TIME",
        sortable: false,
        render: (temp, all) => <div>{all.start_time_text}</div>,
      },
      {
        key: "end time",
        label: "END TIME",
        sortable: false,
        render: (temp, all) => <div>{all.end_time_text}</div>,
      },
      {
        key: "status",
        label: "STATUS",
        sortable: true,
        render: (temp, all) => (
          <div>
            {all.schedule_activity && (
              <StatusPill status={all.schedule_activity} />
            )}
          </div>
        ),
      },
      {
        key: "user_id",
        label: "Action",
        render: (temp, all) => (
          <div className={styles.actionButton}>
            {/* {all?.is_live ? (
              <IconButton
                className={"tableActionBtn"}
                color="secondary"
                disabled={isCalling}
                onClick={() => {
                  toggleRejectDialog("hide", all?.id);
                }}
              >
                <WifiTetheringIcon
                  style={{ color: "#E92828" }}
                  fontSize={"small"}
                />
                <span className={styles.make}>Hide Live</span>
              </IconButton>
            ) : (
              <IconButton
                className={"tableActionBtn"}
                color="secondary"
                disabled={isCalling}
                onClick={() => {
                  toggleRejectDialog("live", all?.id);
                }}
              >
                <WifiTetheringIcon
                  style={{ color: "#0BCF66" }}
                  fontSize={"small"}
                />
                <span className={styles.hide}>Make Live</span>
              </IconButton>
            )} */}
            {/* {all?.is_completed ? (
              <IconButton
                className={"tableActionBtn"}
                color="secondary"
                disabled={isCalling}
                onClick={() => {
                  toggleRecommended(all);
                }}
              >
                <div style={{ color: "#E92828" }}>
                  <Clear fontSize={"small"} />
                </div>
                <span className={styles.make}>UNCOMPLETED</span>
              </IconButton>
            ) : (
              <IconButton
                className={"tableActionBtn"}
                color="secondary"
                disabled={isCalling}
                onClick={() => {
                  toggleRecommended(all);
                }}
              >
                <div style={{ color: "#0BCF66" }}>
                  <DoneAll fontSize={"small"} />
                </div>
                <span className={styles.hide}>COMPLETED</span>
              </IconButton>
            )} */}
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
              onClick={() => {
                toggleUpdateStatus(all);
              }}
            >
              {/* <WifiTetheringIcon
                style={{ color: "#0BCF66" }}
                fontSize={"small"}
              /> */}
              <span className={styles.hide}>Update Status</span>
            </IconButton>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
              onClick={() => {
                handleToggleSidePannel(all);
              }}
            >
              <Edit fontSize={"small"} />
            </IconButton>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
              onClick={() => {
                toggleDeletedDialog(all);
              }}
            >
              <img
                src={DeleteIcon}
                height={"20px"}
                width={"20px"}
                style={{ border: "none !important" }}
                alt=""
              />
            </IconButton>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
              onClick={() => {
                handleScheduleDetail(all);
              }}
            >
              <InfoOutlined fontSize="small" />
            </IconButton>
          </div>
        ),
      },
    ];
  }, [handleViewDetails, handleEdit, isCalling, handleScheduleDetail]);

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
      count: allData?.length,
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
    <div>
      <PageBox>
        <div className={styles.headerContainer}>
          <ButtonBase onClick={() => historyUtils.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />
            <div>
              <span className={styles.title}>Event Schedule</span>
              <div className={styles.newLine} />
            </div>
          </ButtonBase>
          <div></div>
          <div className={styles.btnContainer}>
            <ButtonBase onClick={handleAddCategory} className={styles.download}>
              Add Category
            </ButtonBase>
            <ButtonBase
              onClick={handleToggleSidePannel}
              className={"createBtn"}
            >
              Add SCHEDULE
              <Add fontSize={"small"} className={"plusIcon"}></Add>
            </ButtonBase>
          </div>
        </div>
        {/* <LiveDialog
          handleConfirm={handleLiveApi}
          handleDialog={toggleRejectDialog}
          isOpen={isRejectPopUp}
          title={dataValue?.type === "hide" ? "Hide" : "Live"}
        /> */}
        <UpdateStatusView
          candidateId={speakerId}
          handleToggle={toggleUpdateStatus}
          isOpen={isUpdateStatus}
          scheduleStatus={scheduleStatus}
          event_id={id}
          // title={dataValue?.type === "hide" ? "Hide" : "Live"}
        />
        <div>
          <FilterComponent
            is_progress={isFetching}
            filters={configFilter}
            handleSearchValueChange={handleSearchValueChange}
            handleFilterDataChange={handleFilterDataChange}
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
        <SidePanelComponent
          handleToggle={handleToggleSidePannel}
          title={<UpperInfo />}
          open={isSidePanel}
          side={"right"}
        >
          <EventScheduleView
            handleToggleSidePannel={handleToggleSidePannel}
            isSidePanel={isSidePanel}
            empId={editData}
          />
        </SidePanelComponent>
        <SidePanelComponent
          handleToggle={handleScheduleDetail}
          title={<ScheduleDetailUperView />}
          open={isScheduleDetail}
          side={"right"}
        >
          <ScheduleDetail
            handleScheduleDetail={handleScheduleDetail}
            isScheduleDetail={isScheduleDetail}
            empId={detailId}
          />
        </SidePanelComponent>
      </PageBox>
      <DeleteDialog
        handleConfirm={handleDeleteData}
        handleDialog={toggleDeletedDialog}
        isOpen={isDeletedPopUp}
      />
    </div>
  );
};

export default EventScheduleContainer;
