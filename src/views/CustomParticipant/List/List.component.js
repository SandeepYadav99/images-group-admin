import React, { useCallback, useMemo } from "react";
import { IconButton, ButtonBase } from "@material-ui/core";
import { useSelector } from "react-redux";
import PageBox from "../../../components/PageBox/PageBox.component";
import { Add, BorderColor, Delete } from "@material-ui/icons";
import styles from "./Style.module.css";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import FilterComponent from "../../../components/Filter/Filter.component";
import useList from "./List.hook.js";
import StatusPill from "../../../components/Status/StatusPill.component";
import historyUtils from "../../../libs/history.utils.js";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import DeleteDialog from "../../Events/EventSchedule/EventScheduleList/component/DeletedDilog/DeletedDilog.js";

const CustomParticipantList = ({}) => {
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
    editCategory,
    handleCreateFed,
    isDeletedPopUp,
    toggleDeletedDialog,
    handleDeleteData,
  } = useList({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.custom_participant);

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
      // {
      //   key: "S.No",
      //   label: "S no",
      //   sortable: true,
      //   render: (value, all) => <div>{console.log(all)}{all?.sr_no}</div>,
      // },

      {
        key: "name",
        label: "Name",
        sortable: true,
        render: (temp, all) => <div>{all?.label}</div>,
      },
      {
        key: "key",
        label: "Custom Key",
        sortable: true,
        render: (temp, all) => <div>{all?.key}</div>,
      },
      // {
      //   key: "status",
      //   label: "STATUS",
      //   sortable: true,
      //   render: (temp, all) => <div>{<StatusPill status={all?.status} />}</div>,
      // },
      {
        key: "user_id",
        label: "Action",
        render: (temp, all) => (
          <div>
            <div>
              <IconButton
                className={"tableActionBtn"}
                color="secondary"
                disabled={isCalling}
                onClick={() => {
                  handleViewDetails(all);
                }}
              >
                <BorderColor fontSize={"small"} color="action" />
              </IconButton>
              <IconButton
                className={"tableActionBtn"}
                color="secondary"
                disabled={isCalling}
                onClick={() => {
                  toggleDeletedDialog(all);
                }}
              >
                <Delete fontSize={"small"} />
              </IconButton>
            </div>
          </div>
        ),
      },
    ];
  }, [
    handleViewDetails,
    handleEdit,
    isCalling,
    handleDeleteData,
    toggleDeletedDialog,
  ]);

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
          <ButtonBase onClick={() => historyUtils.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />
            <div>
              <span className={styles.title}>Custom Participants List</span>
              <div className={styles.newLine} />
            </div>
          </ButtonBase>
          <div className={styles.BtnWrapper}>
            <ButtonBase onClick={handleCreateFed} className={"createBtn"}>
              Create
              <Add fontSize={"small"} className={"plusIcon"}></Add>
            </ButtonBase>
          </div>
        </div>
        <DeleteDialog
          handleConfirm={handleDeleteData}
          handleDialog={toggleDeletedDialog}
          isOpen={isDeletedPopUp}
          helperTitle={"Delete Custom Participants"}
          des={
            "Are you sure you want to Delete this Custom Participants request?"
          }
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
      </PageBox>
    </div>
  );
};

export default CustomParticipantList;
