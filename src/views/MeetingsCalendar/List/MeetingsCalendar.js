import React, { useCallback, useMemo } from "react";
import { IconButton, ButtonBase } from "@material-ui/core";
import { useSelector } from "react-redux";
import PageBox from "../../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import FilterComponent from "../../../components/Filter/Filter.component";
import StatusPill from "../../../components/Status/StatusPill.component";

import { Add, DoneAll, Edit, Clear } from "@material-ui/icons";

import speakerDefault from "../../../assets/img/speaker_list_deafult.png";

import { capitalizeFirstLetter } from "../../../hooks/CapsLetter";
import useMeetingsCalendarHook from "./MeetingsCalendarHook";
import SidePanelComponent from "../../../components/SidePanel/SidePanel.component";
import MeetingsCalendarCreate from "../Create/MeetingsCalendarCreate";

const MeetingsCalendar = ({}) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleEdit,
    handleSearchValueChange,
    handleViewDetails,
    isCalling,
    handleCreateFed,
    handleUpdateFed,
    toggleFeatured,
    handleToggleSidePannel,
    isSidePanel
  } = useMeetingsCalendarHook({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.SpeakerMaster);

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

  const UpperInfo = useCallback(
    (obj) => {
      if (obj) {
        return (
          <div className={styles.InfoWrap}>
            <div>
              {true ? "Edit Meeting Calendar " : "Add Meeting Calendar "}{" "}
            </div>
            <div className={styles.newLine}></div>
          </div>
        );
      }
      return null;
    },
    []
  );
  const tableStructure = useMemo(() => {
    return [
      {
        key: "name",
        label: "NAME",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.firstCellFlex}>
            <img
              src={all?.s_image ? all?.s_image : speakerDefault}
              alt=""
              className={styles.driverImgCont}
              crossOrigin="anonymous"
            />
            {capitalizeFirstLetter(all?.s_name)}
          </div>
        ),
      },
      {
        key: "description",
        label: "DESCRIPTION",
        sortable: false,
        render: (value, all) => (
          <div className={styles.desData}>{ all?.s_description ? capitalizeFirstLetter(all?.s_description) : "N/A"}</div>
        ),
      },

      {
        key: "designation",
        label: "DESIGNATION",
        sortable: false,
        render: (temp, all) => <div>{all?.s_designation ? capitalizeFirstLetter(all?.s_designation) : "N/A"}</div>,
      },
      {
        key: "company",
        label: "COMPANY",
        sortable: false,
        render: (temp, all) => <div>{all?.s_company}</div>,
      },
      {
        key: "status",
        label: "STATUS",
        sortable: false,
        render: (temp, all) => (
          <div>{<StatusPill status={all?.s_status} />}</div>
        ),
      },
      {
        key: "user_id",
        label: "Action",
        render: (temp, all) => (
          <div style={{display:"flex",flexWrap:"wrap",gap:"5px"}}>
            {/* <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
              onClick={() => {
                toggleFeatured(all);
              }}
            >
              {all?.is_featured == true ? (
                <div className={styles.removeFeatured}>
                  <Clear fontSize={"small"} />
                  <small>REMOVE FEATURED</small>
                </div>
              ) : (
                <div className={styles.iconFeatured}>
                  <DoneAll fontSize={"small"} />
                  <small>SET FEATURED</small>
                </div>
              )}
            </IconButton> */}

            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
              onClick={() => {
                handleUpdateFed(all);
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
        <div className={styles.headerContainer}>
          {/* <ButtonBase onClick={() => historyUtils.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} /> */}
            <div>
              <span className={styles.title}>Speakers Master</span>
              <div className={styles.newLine} />
            </div>
          {/* </ButtonBase> */}

          <div className={styles.BtnWrapper}>
            <ButtonBase onClick={handleToggleSidePannel} className={"createBtn"}>
              ADD SPEAKER 
              <Add fontSize={"small"} className={"plusIcon"}></Add>
            </ButtonBase>
          </div>
        </div>

        <div>
          <div style={{ width: "88%" }}>
            <FilterComponent
              is_progress={isFetching}
              filters={""}
              handleSearchValueChange={handleSearchValueChange}
              handleFilterDataChange={"handleFilterDataChange"}
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
        </div>
        <SidePanelComponent
          handleToggle={handleToggleSidePannel}
          title={<UpperInfo />}
          open={isSidePanel}
          side={"right"}
        >
          <MeetingsCalendarCreate
            handleToggleSidePannel={handleToggleSidePannel}
            isSidePanel={isSidePanel}
            empId={true}
          />
        </SidePanelComponent>
      </PageBox>
    </>
  );
};

export default MeetingsCalendar;
