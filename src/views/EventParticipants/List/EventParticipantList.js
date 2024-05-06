import React, { Component, useCallback, useEffect, useMemo } from "react";
import { IconButton, MenuItem, ButtonBase } from "@material-ui/core";
import classNames from "classnames";
import { connect, useSelector } from "react-redux";
import {
  Add,
  CloudDownload,
  CloudUpload,
} from "@material-ui/icons";
import PageBox from "../../../components/PageBox/PageBox.component";
import SidePanelComponent from "../../../components/SidePanel/SidePanel.component";
import styles from "./Style.module.css";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import FilterComponent from "../../../components/Filter/Filter.component";
import { Edit, RemoveRedEyeOutlined as ViewIcon } from "@material-ui/icons";
import useEventParticipantList from "./EventParticipantHook";
import StatusPill from "../../../components/Status/StatusPill.component";
import EventParticipantCreateView from "../Create/EventParticipantCreate.view";
import EventParticipantEditView from "../Edit/EventParticipantEdit.view";
import historyUtils from "../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import UploadCsvDialog from "./components/UploadCsv/UploadCsvDialog.view";

const EventParticipantList = ({}) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleEdit,
    handleFilterDataChange,
    handleSearchValueChange,
    handleSideToggle,
    handleViewDetails,
    editData,
    isSidePanel,
    handleCreate,
    isCalling,
    configFilter,
    warehouses,
    handleToggleSidePannel,
    handleToggleEditSidePannel,
    isEditSidePanel,
    toggleCsvDialog,
    handleDownloadCSV,
    isCsvDialog,
    handleCsvUpload,
  } = useEventParticipantList({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.eventParticipant);

  const UpperInfo = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.InfoWrap}>
          <div>Add Event Participants</div>
          <div className={styles.newLine}></div>
        </div>
      );
    }
    return null;
  }, []);

  const EditInfo = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.InfoWrap}>
          <div>Edit Event Participants</div>
          <div className={styles.newLine}></div>
        </div>
      );
    }
    return null;
  }, []);

  const tableStructure = useMemo(() => {
    return [
      {
        key: "name",
        label: "NAME",
        sortable: false,
        render: (temp, all) => <div>{all?.name}</div>,
      },
      {
        key: "email",
        label: "EMAIL",
        sortable: false,
        render: (value, all) => <div>{all?.email}</div>,
      },

      {
        key: "contact",
        label: "PHONE NUMBER",
        sortable: false,
        render: (temp, all) => <div>{all.contact}</div>,
      },
      // {
      //   key: "is_member",
      //   label: "MEMBER USER",
      //   sortable: false,
      //   render: (temp, all) => <div>{all.is_member ? "YES" : "NO"}</div>,
      // },
      {
        key: "reg_id",
        label: "REF ID",
        sortable: true,
        render: (temp, all) => <div>{all?.ref_id || all.reg_id }</div>,
      },
      {
        key: "user_id",
        label: "Action",
        render: (temp, all) => (
          <div>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
              onClick={() => {
                handleToggleEditSidePannel(all);
              }}
            >
              <Edit fontSize={"small"} />
            </IconButton>
          </div>
        ),
      },
    ];
  }, [handleViewDetails, handleEdit, isCalling, handleToggleEditSidePannel]);

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
    <div>
      <PageBox>
      <UploadCsvDialog
        isOpen={isCsvDialog}
        handleToggle={toggleCsvDialog}
        // handleCsvUpload={handleCsvUpload}
      />
        <div className={styles.headerContainer}>
          <ButtonBase onClick={() => historyUtils.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />
            <div>
              <span className={styles.title}>Event Participant List</span>
              <div className={styles.newLine} />
            </div>
          </ButtonBase>
          <div className={styles.btnWrapper}>
            <ButtonBase
              onClick={toggleCsvDialog}
              className={"createBtn"}
              id={styles.btnHideResponsive}
            >
              Upload
              <CloudUpload
                fontSize={"small"}
                className={"plusIcon"}
              ></CloudUpload>
            </ButtonBase>
            <div className={styles.eventButton}>
              <ButtonBase onClick={handleDownloadCSV} className={"createBtn"}>
                DOWNLOAD CSV
                <CloudDownload
                  fontSize={"small"}
                  className={"plusIcon"}
                ></CloudDownload>
              </ButtonBase>
              <ButtonBase
                onClick={handleToggleSidePannel}
                className={"createBtn"}
              >
                Create
                <Add fontSize={"small"} className={"plusIcon"}></Add>
              </ButtonBase>
            </div>
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
          title={<UpperInfo />}
          open={isSidePanel}
          side={"right"}
        >
          <EventParticipantCreateView
            handleToggleSidePannel={handleToggleSidePannel}
            isSidePanel={isSidePanel}
          />
        </SidePanelComponent>

        <SidePanelComponent
          handleToggle={handleToggleEditSidePannel}
          title={<EditInfo />}
          open={isEditSidePanel}
          side={"right"}
        >
          <EventParticipantEditView
            handleToggleSidePannel={handleToggleEditSidePannel}
            isSidePanel={isEditSidePanel}
            data={editData}
          />
        </SidePanelComponent>
      </PageBox>
    </div>
  );
};

export default EventParticipantList;
