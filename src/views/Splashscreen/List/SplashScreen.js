import React, { Component, useCallback, useEffect, useMemo } from "react";
import { IconButton, ButtonBase } from "@material-ui/core";
import classNames from "classnames";
import { connect, useSelector } from "react-redux";
import PageBox from "../../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import FilterComponent from "../../../components/Filter/Filter.component";
import { Add, Edit, InfoOutlined } from "@material-ui/icons";
import StatusPill from "../../../components/Status/StatusPill.component";
import history from "../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import useSplashScreenHook from "./SplashScreenHook";
import ListHeader from "../../../components/ListPageHeader/ListHeader";
import VideoDialog from "./Component/VideoDialog";

const SplashScreen = ({}) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleEdit,
    handleFilterDataChange,
    handleSearchValueChange,
    handleCreateFed,
    isCalling,
    configFilter,
    handleViewUpdate,
    isVideoModal,
    toggleVideoModal,
  } = useSplashScreenHook({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.SplashScreen);

  const renderStatus = useCallback((status) => {
    return (
      <StatusPill
        status={status}
        style={status === "PROCESSED" && { background: "#ceece2" }}
      />
    );
  }, []);

  const renderFirstCell = useCallback((obj) => {
    if (obj) {
      return (
        <>
        {
          obj?.video ?  <div
          className={styles.firstCellFlex}
          onClick={() => {
            toggleVideoModal(obj?.video);
          }}
        >
          {obj?.video?.includes("mp4") ? (
            <video
              crossOrigin="anonymous"
              src={obj?.video}
              className={styles.video}
            />
          ) : (
            <img src={obj?.video} className={styles.video} />
          )}
        </div> :
        <div>No Media</div>
        }
        </>
       
      );
    }
    return null;
  }, []);

  const formatUrl = useCallback((url) => {
    if (url && !url.startsWith("http://") && !url.startsWith("https://")) {
      return "http://" + url;
    }
    return url;
  }, []);

  const tableStructure = useMemo(() => {
    return [
      {
        key: "file_name",
        label: "FILE NAME",
        sortable: false,
        render: (temp, all) => <div>{all?.name}</div>,
      },
      {
        key: "video",
        label: "video/Image",
        sortable: false,
        render: (value, all) => <div>{renderFirstCell(all)}</div>,
      },
      {
        key: "link",
        label: "LINK",
        sortable: false,
        render: (temp, all) => (
          <div>
            <a
              href={formatUrl(all?.link)}
              target="_blank"
              className={styles.hyperlinkText}
              rel="noreferrer"
            >
              {all?.link}
            </a>
          </div>
        ),
      },

      {
        key: "status",
        label: "STATUS",
        sortable: false,
        render: (temp, all) => <div>{<StatusPill status={all?.status} />}</div>,
      },
      {
        key: "action",
        label: "action",
        sortable: false,
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
  }, [renderStatus, renderFirstCell, handleEdit, isCalling, formatUrl]);

  const tableData = useMemo(() => {
    const datatableFunctions = {
      onSortOrderChange: handleSortOrderChange,
      onPageChange: handlePageChange,
      // onRowSelection: this.handleRowSelection,
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
          title={"Splash Screen"}
          handleCreateFed={handleCreateFed}
          actionTitle={"ADD NEW"}
          arrowIcon="false"
        />
        <div style={{ width: "100%" }}>
          <FilterComponent
            is_progress={isFetching}
            filters={configFilter}
            handleSearchValueChange={handleSearchValueChange}
            handleFilterDataChange={handleFilterDataChange}
          />
        </div>
        <br />
        <div style={{ width: "100%" }}>
          <DataTables
            {...tableData.datatable}
            {...tableData.datatableFunctions}
          />
        </div>
        <VideoDialog
          isOpen={isVideoModal}
          videoLink={isVideoModal}
          handleDialog={() => {
            toggleVideoModal(null);
          }}
        />
      </PageBox>
    </>
  );
};

export default SplashScreen;
