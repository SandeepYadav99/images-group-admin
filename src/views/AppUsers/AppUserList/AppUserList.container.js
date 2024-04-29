import React, { Component, useCallback, useEffect, useMemo } from "react";
import { IconButton, MenuItem, ButtonBase } from "@material-ui/core";
import { useSelector } from "react-redux";
import { CloudDownload, CloudUpload, InfoOutlined } from "@material-ui/icons";
import PageBox from "../../../components/PageBox/PageBox.component";
import SidePanelComponent from "../../../components/SidePanel/SidePanel.component";
import styles from "./Style.module.css";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import FilterComponent from "../../../components/Filter/Filter.component";
import { Edit, RemoveRedEyeOutlined as ViewIcon } from "@material-ui/icons";
// import StatusPill from "../../../components/Status/StatusPill.component";
import useAppUserList from "./AppUserListHook.js";
import StatusPill from "../../../components/Status/StatusPill.component";
import AppUserCreateView from "../AppUserCreate/AppUserCreate.view";
import { Link } from "react-router-dom";
import RouteName from "../../../routes/Route.name";
import UploadCsvDialog from "./UploadCsvDialog/UploadCsvDialog.js";
import { capitalizeFirstLetter } from "../../../hooks/CapsLetter.js";

const AppUserList = ({}) => {
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
  } = useAppUserList({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.App_User);

  const UpperInfo = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.InfoWrap}>
          <div>Add Admin Users</div>
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
        label: "User Name",
        sortable: false,
        render: (temp, all) => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyItems: "center",
              gap: "8px",
            }}
          >
            <img
              src={all?.image}
              alt="image"
              style={{ height: "30px", width: "30px", borderRadius: "100%" }}
            />
            {capitalizeFirstLetter(all?.name)}
          </div>
        ),
      },
      {
        key: "email",
        label: "email",
        sortable: false,
        render: (value, all) => (
          <div className={styles.limitCharector}>{all?.email}</div>
        ),
      },

      {
        key: "contact",
        label: "PHONE NUMBER",
        sortable: false,
        render: (temp, all) => (
          <div  className={styles.gaps}>
            <div>{all?.country_code}</div> <div>{all.contact.split(" ")}</div>
          </div>
        ),
      },
      {
        key: "company",
        label: "COMPANY",
        sortable: false,
        render: (temp, all) => <div>{all.company_name}</div>,
      },
      // {
      //   key: "memberuser",
      //   label: "is Member User",
      //   sortable: false,
      //   render: (temp, all) => <div>{all.is_member ? "Yes" : "No"}</div>,
      // },
      // {
      //   key: "flagged",
      //   label: "is Flagged",
      //   sortable: false,
      //   render: (temp, all) => <div>{all.is_flagged ? "Yes" : "No"}</div>,
      // },
      {
        key: "status",
        label: "STATUS",
        sortable: false,
        render: (temp, all) => <div>{<StatusPill status={all.status} />}</div>,
      },
      {
        key: "user_id",
        label: "Action",
        render: (temp, all) => (
          <div>
            <Link to={RouteName.USER_PROFILE + all.id}>
              <IconButton
                className={"tableActionBtn"}
                color="secondary"
                disabled={isCalling}
              >
                <InfoOutlined fontSize={"small"} />
              </IconButton>
            </Link>
          </div>
        ),
      },
    ];
  }, [handleViewDetails, handleEdit, isCalling]);

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
      <UploadCsvDialog
        isOpen={isCsvDialog}
        handleToggle={toggleCsvDialog}
        handleCsvUpload={handleCsvUpload}
      />
      <PageBox>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.title}>App Users List</span>
            <div className={styles.newLine} />
          </div>
          <div className={styles.btnWrapper}>
            {/* <ButtonBase
              onClick={toggleCsvDialog}
              className={"createBtn"}
              id={styles.btnHideResponsive}
            >
              Upload
              <CloudUpload
                fontSize={"small"}
                className={"plusIcon"}
              ></CloudUpload>
            </ButtonBase> */}
            <div className={styles.eventButton}>
              <ButtonBase onClick={handleDownloadCSV} className={"createBtn"}>
                DOWNLOAD 
                <CloudDownload
                  fontSize={"small"}
                  className={"plusIcon"}
                ></CloudDownload>
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
          <AppUserCreateView
            handleToggleSidePannel={handleToggleSidePannel}
            isSidePanel={isSidePanel}
            empId={editData}
          />
        </SidePanelComponent>
      </PageBox>
    </div>
  );
};

export default AppUserList;
