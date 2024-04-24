import React, { useCallback, useMemo, useState } from "react";
import { IconButton, ButtonBase } from "@material-ui/core";
import { useSelector } from "react-redux";
import PageBox from "../../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import FilterComponent from "../../../components/Filter/Filter.component";
import StatusPill from "../../../components/Status/StatusPill.component";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Add, DoneAll, Edit, Clear } from "@material-ui/icons";
import useSpeakerListHook from "./SpeakerList_hook";
import historyUtils from "../../../libs/history.utils";
import speakerDefault from "../../../assets/img/speaker_list_deafult.png";
import AssociateDialog from "../component/AssociateDialog/AssociateDialog.view";
import { useParams } from "react-router-dom";
import CustomCheckbox from "../../../components/FormFields/CustomCheckbox";

const EventSpeakerList = ({}) => {
  const [is_recommended, setIs_Recommended]=useState(false)
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
    toggleAcceptDialog,
    isAcceptPopUp,
    handleCreateFedPage,
    speakerList,
    toggleRecommended
  } = useSpeakerListHook({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.eventSpeaker);

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

  const params = useParams();

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
            {all?.s_name || "N/A"}
          </div>
        ),
      },
      {
        key: "description",
        label: "DESCRIPTION",
        sortable: false,
        render: (value, all) => (
          <div className={styles.desData}>{all?.s_description || "N/A"}</div>
        ),
      },

      {
        key: "designation",
        label: "DESIGNATION",
        sortable: false,
        render: (temp, all) => <div>{all?.s_designation || "N/A"}</div>,
      },
      {
        key: "company",
        label: "COMPANY",
        sortable: false,
        render: (temp, all) => <div>{all?.s_company || "N/A"}</div>,
      },
      {
        key: "status",
        label: "STATUS",
        sortable: true,
        render: (temp, all) => (
          <div>{<StatusPill status={all?.s_status} />}</div>
        ),
      },
      {
        key: "user_id",
        label: "Action",
        render: (temp, all) => (
          
          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
            <IconButton
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
            </IconButton>

            {/* <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
              onClick={() => {
                handleUpdateFed(all);
              }}
            >
              <Edit fontSize={"small"} />
            </IconButton> */}
                <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
              onClick={() => {
                toggleRecommended(all);
              }}
            >
              {all?.is_recommended == true ? (
                <div className={styles.removeFeatured}>
                  <Clear fontSize={"small"} />
                  <small>Unmark Recommend</small>
                </div>
              ) : (
                <div className={styles.iconFeatured}>
                  <DoneAll fontSize={"small"} />
                  <small>Mark Recommend</small>
                </div>
              )}
            </IconButton>
           
             {/* <CustomCheckbox
              value={is_recommended}
              // handleChange={() => 
              //   changeTextHandler()
              //   // changeTextData(!form?.is_moderator, "is_moderator");
              // }}
              label={`Recommended`}
            />  */}
        
            {params?.id ? (
              ""
            ) : (
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
            )}
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
           <ButtonBase onClick={() => historyUtils.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />
            <div>
              <span className={styles.title}>Speakers </span>
              <div className={styles.newLine} />
            </div>
         </ButtonBase>

          <div className={styles.BtnWrapper}>
            <ButtonBase
              onClick={params?.id ? toggleAcceptDialog : handleCreateFedPage}
              className={"createBtn"}
            >
              {params?.id ? "ASSOCIATE SPEAKER" : "ADD SPEAKER"}
              <Add fontSize={"small"} className={"plusIcon"}></Add>
            </ButtonBase>
          </div>
        </div>
        <AssociateDialog
          isOpen={isAcceptPopUp}
          handleToggle={toggleAcceptDialog}
          data={speakerList}
        />

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
      </PageBox>
    </>
  );
};

export default EventSpeakerList;
