import React, { Component, useCallback, useEffect, useMemo } from "react";
import {
  Button,
  Paper,
  Checkbox,
  IconButton,
  MenuItem,
  ButtonBase,
  Menu,
} from "@material-ui/core";
import { connect, useSelector } from "react-redux";
import PageBox from "../../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import FilterComponent from "../../../components/Filter/Filter.component";
import StatusPill from "../../../components/Status/StatusPill.component";
import { Add, Edit, InfoOutlined } from "@material-ui/icons";
import useMeetingList from "./MeetingList.hook";
import { useHistory } from "react-router-dom";
import SidePanelComponent from "../../../components/SidePanel/SidePanel.component";
import MeetingCreateView from "../MeetingMaster/MeetingMaster";

const MeetingList = ({}) => {
  const {
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
    location,
    handleToggleSidePannel,
    isSidePanel,
    editData,
    handleMeetingMaster
    } = useMeetingList({ location });

  const history = useHistory();

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
        key: "name",
        label: "Name",
        sortable: false,
        render: (value, all) => <div>{all?.name}</div>,
      },
      {
        key: "code",
        label: "Code",
        sortable: false,
        render: (temp, all) => <div>{all?.code}</div>,
      },
      {
        key: "status",
        label: "STATUS",
        sortable: false,
        render: (temp, all) => <div>{<StatusPill status={all?.status} />}</div>,
      },
      {
        key: "total_slot",
        label: "TOTAL SLOTS",
        sortable: false,
        render: (value, all) => <div>{all?.total_slots}</div>,
      },
      {
        key: "booked_slot",
        label: "BOOKED SLOT",
        sortable: false,
        render: (temp, all) => <div>{all?.booked_slots}</div>,
      },
      {
        key: "blocked_slot",
        label: "BLOCKED SLOT",
        sortable: false,
        render: (temp, all) => <div>{all?.blocked_slots}</div>,
      },
      {
        key: "available_slot",
        label: "AVAILABLE SLOTS",
        sortable: false,
        render: (temp, all) => <div>{all?.available_slots}</div>,
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
      <PageBox>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.title}>Meeting Rooms</span>
            <div className={styles.newLine} />
          </div>
          <div className={styles.BtnWrapper}>
            <ButtonBase className={"createBtn"} id={styles.bgColor} onClick={handleMeetingMaster}>
              MEETING MASTER{" "}
            </ButtonBase>
            <ButtonBase
              onClick={handleToggleSidePannel}
              className={"createBtn"}
            >
              ADD MEETING ROOM{" "}
              <Add fontSize={"small"} className={"plusIcon"}></Add>
            </ButtonBase>
          </div>
        </div>

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
      </PageBox>
    </>
  );
};

export default MeetingList;
