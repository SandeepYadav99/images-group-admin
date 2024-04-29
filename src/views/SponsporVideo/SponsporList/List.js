import React, {
  Component,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { IconButton, MenuItem, ButtonBase, Dialog } from "@material-ui/core";
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
import historyUtils from "../../../libs/history.utils";
// import AppUserCreateView from "../AppUserCreate/AppUserCreate.view";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

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
    handleUpdate,
  } = useSponsporList({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.sponspor_video);

  const [openPopUp, setOpenPopUp] = useState(false);
  const [urlData, setUrlData] = useState("");

  const handleOpenPopUpData = (data) => {
    setOpenPopUp(true);
    setUrlData(data?.video);
  };

  const handleClosePopUp = () => {
    setOpenPopUp(false);
    setUrlData("");
  };

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

  const renderFirstCell = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.firstCellFlex}>
          <div onClick={() => handleOpenPopUpData(obj)}>
            <video
              crossOrigin="anonymous"
              src={obj?.video}
              className={styles.video}
            />
          </div>
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
            {all?.name}
          </div>
        ),
      },
      {
        key: "video",
        label: "video",
        sortable: true,
        render: (value, all) => <div>{renderFirstCell(all)}</div>,
      },

      {
        key: "status",
        label: "status",
        sortable: true,
        render: (temp, all) => <div>{<StatusPill status={all.status} />}</div>,
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
              onClick={() => handleUpdate(all)}
            >
              <Edit fontSize={"small"} />
            </IconButton>
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

  const VideoPopUp = ({ open, onClick, url }) => {
    return (
      <Dialog
        open={open}
        aria-labelledby="dialog-title"
        sx={{ width: "auto", padding: "20px" }}
      >
        <div className={styles.dialogTitle} onClick={onClick}>
          <div>Sponsor Video</div>
          <div
            onClick={onClick}
            style={{ fontSize: "24px" }}
            className={styles.crossIconArea}
          >
            x
          </div>
        </div>
        <div className={styles.commentArea}>
          <video  autoPlay controls style={{width:'500px',height:"300px"}}>
            <source src={url} type="video/mp4" />
          </video>{" "}
        </div>
      </Dialog>
    );
  };

  return (
    <div>
      <PageBox>
        <div className={styles.headerContainer}>
        <div>
            <ButtonBase onClick={() => historyUtils.goBack()}>
              <ArrowBackIosIcon fontSize={"small"} />
              <span className={"capitalize"}>
                <span className={styles.title}>Sponsor Video List</span>
              </span>
            </ButtonBase>
            <div className={styles.newLine} />
          </div>
          <div>
            <ButtonBase onClick={handleCreate} className={"createBtn"}>
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
        <VideoPopUp open={openPopUp} url={urlData} onClick={handleClosePopUp} />
      </PageBox>
    </div>
  );
};

export default SponsporList;
