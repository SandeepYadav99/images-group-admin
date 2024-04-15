import React, { useCallback, useMemo } from "react";
import { IconButton, ButtonBase } from "@material-ui/core";
import { useSelector } from "react-redux";
import PageBox from "../../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import FilterComponent from "../../../components/Filter/Filter.component";
import StatusPill from "../../../components/Status/StatusPill.component";
import { Add, Edit } from "@material-ui/icons";

import historyUtils from "../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import useMenuGraphicHook from "./MenuGraphicHook";
import ListHeader from "../../../components/ListPageHeader/ListHeader";

const MenuGraphic = ({}) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleEdit,
    handleSearchValueChange,
    handleViewDetails,
    isCalling,
    handleCreateFed,
    handleViewUpdate,
  } = useMenuGraphicHook({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.InfoCenter);

  const renderFirstCell = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.firstCellFlex}>
          <img src={obj?.banner} alt="BannerImg" />
          <div className={styles.productName}>{obj?.name}</div>
        </div>
      );
    }
    return null;
  }, []);

  const tableStructure = useMemo(() => {
    return [
      {
        key: "feature_name",
        label: "Feature name",
        sortable: true,
        render: (temp, all) => (
          <div className={styles.firstCellFlex}>
            <img src={all?.thumbnail} alt="" className={styles.driverImgCont} />
          </div>
        ),
      },
      {
        key: "image",
        label: "IMAGE",
        sortable: false,
        render: (value, all) => <div>{all?.name}</div>,
      },

      {
        key: "priority",
        label: "PRIORITY",
        sortable: false,
        render: (temp, all) => <div>{all?.priority}</div>,
      },

      {
        key: "status",
        label: "STATUS",
        sortable: true,
        render: (temp, all) => <div>{<StatusPill status={all?.status} />}</div>,
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
                handleViewUpdate(all);
              }}
            >
              <Edit fontSize={"small"} />
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
        <ListHeader
          title={"Menu Graphic"}
          handleCreateFed={handleCreateFed}
          actionTitle={"ADD NEW"}
          isFetching={isFetching}
          handleFilterDataChange={"handleFilterDataChange"}
          handleSearchValueChange={handleSearchValueChange}
          arrowIcon="true"
        />

        <br />
        <div style={{ width: "100%" }}>
          <DataTables
            {...tableData.datatable}
            {...tableData.datatableFunctions}
          />
        </div>
      </PageBox>
    </>
  );
};

export default MenuGraphic;
