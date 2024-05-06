import React, { useMemo } from "react";
import { IconButton, ButtonBase } from "@material-ui/core";
import { useSelector } from "react-redux";
import PageBox from "../../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import FilterComponent from "../../../components/Filter/Filter.component";
import useParticipantType from "./List.hook";
import { Add, BorderColor, InfoOutlined } from "@material-ui/icons";
import { capitalizeFirstLetter } from "../../../hooks/CapsLetter";
import StatusPill from "../../../components/Status/StatusPill.component";

const ParticipantList = ({}) => {
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
  } = useParticipantType({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.participant_type);

  const tableStructure = useMemo(() => {
    return [
      {
        key: "key",
        label: "Key",
        sortable: true,
        render: (value, all) => <div>{all?.key}</div>,
      },
      {
        key: "participant_type",
        label: "Participant Type",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.message}>{all?.type}</div>
        ),
      },
      {
        key: "created",
        label: "CREATED ON",
        sortable: false,
        render: (temp, all) => <div>{all?.createdAtText}</div>,
      },
      {
        key: "Status",
        label: "Status",
        sortable: false,
        render: (temp, all) => (
          <div>{<StatusPill status={all.status} />}</div>
        ),
      },
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
            </div>
          </div>
        )
      },
    ];
  }, [handleViewDetails, handleEdit, isCalling, capitalizeFirstLetter]);

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
            <span className={styles.title}>Participant Type</span>
            <div className={styles.newLine} />
          </div>
          <div className={styles.BtnWrapper}>
            <ButtonBase onClick={handleCreateFed} className={"createBtn"}>
              Create
              <Add fontSize={"small"} className={"plusIcon"}></Add>
            </ButtonBase>
          </div>
        </div>

        <div style={{ width: "90%" }}>
          <FilterComponent
            is_progress={isFetching}
            filters={[]}
            handleSearchValueChange={handleSearchValueChange}
            handleFilterDataChange={handleFilterDataChange}
          />
        </div>
        <div>
          <br />
          <div style={{ width: "100%" }}>
            <DataTables
              {...tableData.datatable}
              {...tableData.datatableFunctions}
            />
          </div>
        </div>
      </PageBox>
    </>
  );
};

export default ParticipantList;
