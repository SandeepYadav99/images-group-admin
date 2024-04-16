import styles from "./Style.module.css";
import history from "../../../libs/history.utils";
import { ButtonBase, IconButton } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import useMeetingDetailHook from "./MeetingDetails.hook";
import StatusPill from "../../../components/Status/StatusPill.component";
import { Add, PostAdd, WidgetsTwoTone } from "@material-ui/icons";
import { fontSize } from "suneditor/src/plugins";
import PageBoxComponent from "../../../components/PageBox/PageBox.component";
import { useCallback, useMemo } from "react";
import Constants from "../../../config/constants";
import { useSelector } from "react-redux";
import { InfoOutlined } from "@material-ui/icons";
import FilterComponent from "../../../components/Filter/Filter.component";
import DataTables from "../../../Datatables/Datatable.table";
import SidePanelComponent from "../../../components/SidePanel/SidePanel.component";
import MeetingCreateView from "../MeetingMaster/MeetingMaster";

const MeetingDetails = ({ location }) => {
  const {
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
    handleCreateFed,
    handleUpdate,
    handleToggleSidePannel,
    isSidePanel,
    editData,
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

  const tableStructure = useMemo(() => {
    return [
      {
        key: "date",
        label: "DATE",
        sortable: false,
        render: (value, all) => <div>{all?.name}</div>,
      },
      {
        key: "slot",
        label: "SLOT",
        sortable: false,
        render: (temp, all) => <div>{all?.code}</div>,
      },
      {
        key: "duration",
        label: "DURATION",
        sortable: false,
        render: (value, all) => <div>{all?.total_slots}</div>,
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
        render: (value, all) => <div>{all?.total_slots}</div>,
      },
      {
        key: "booked_with",
        label: "BOOKED WITH",
        sortable: false,
        render: (temp, all) => <div>{all?.booked_slots}</div>,
      },
      {
        key: "ref_id",
        label: "REF ID",
        sortable: false,
        render: (temp, all) => <div>{all?.blocked_slots}</div>,
      },

      {
        key: "action",
        label: "Action",
        style: { width: "15%" },
        render: (temp, all) => (
          <div>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
              onClick={() => {
                handleUpdate(all);
              }}
            >
              <InfoOutlined fontSize={"small"} />
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
        <div>
          <ButtonBase className={"createBtn"} id={styles.bgColor}>
            {dataValue?.status}
          </ButtonBase>
        </div>
        <div className={styles.btnFlex}>
          <ButtonBase
            className={"createBtn"}
            id={styles.bgColor}
            onClick={handleToggleSidePannel}
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
            <ButtonBase className={"createBtn"}>
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
              <span className={styles.subh2}>Unvailable</span>
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
      <SidePanelComponent
        handleToggle={handleToggleSidePannel}
        title={"Add Meeting Room"}
        open={isSidePanel}
        side={"right"}
      >
        <MeetingCreateView
          handleToggleSidePannel={handleToggleSidePannel}
          isSidePanel={isSidePanel}
          empId={editData}
        />
      </SidePanelComponent>
    </>
  );
};

export default MeetingDetails;
