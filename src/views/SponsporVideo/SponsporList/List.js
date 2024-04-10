import React, { Component, useCallback, useEffect, useMemo } from "react";
import { IconButton, MenuItem, ButtonBase } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Add, InfoOutlined } from "@material-ui/icons";
import PageBox from "../../../components/PageBox/PageBox.component";
import SidePanelComponent from "../../../components/SidePanel/SidePanel.component";
import styles from "./List.module.css";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import FilterComponent from "../../../components/Filter/Filter.component";
import { Edit, RemoveRedEyeOutlined as ViewIcon } from "@material-ui/icons";
// import StatusPill from "../../../components/Status/StatusPill.component";
import useSponsporList from "./List.hook";
import StatusPill from "../../../components/Status/StatusPill.component";
// import AppUserCreateView from "../AppUserCreate/AppUserCreate.view";
import { Link } from "react-router-dom";
import RouteName from "../../../routes/Route.name";

const SponsporList = ({}) => {
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
  } = useSponsporList({});

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
        key: "file",
        label: "File Name",
        sortable: false,
        render: (temp, all) => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            <img
              src={all?.image}
              alt="image"
              style={{ height: "30px", width: "30px", borderRadius: "100%" }}
            />
            {all?.name}
          </div>
        ),
      },
      {
        key: "video",
        label: "video",
        sortable: true,
        render: (value, all) => <div>{all?.email}</div>,
      },

      {
        key: "status",
        label: "status",
        sortable: true,
        render: (temp, all) => <div>{all.contact}</div>,
      },
      {
        key: "user_id",
        label: "Action",
        render: (temp, all) => (
          <div>
            <Link to={RouteName.SPONSPOR_VIDE_CREATE + all.id}>
              <IconButton
                className={"tableActionBtn"}
                color="secondary"
                disabled={isCalling}
              >
              <Edit fontSize={"small"} />
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
      <PageBox>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.title}>Sponspor Video List</span>
            <div className={styles.newLine} />
          </div>
          <div>
            <ButtonBase
              onClick={handleToggleSidePannel}
              className={"createBtn"}
            >
              Create
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
      </PageBox>
    </div>
  );
};

export default SponsporList;
