import { useSelector } from "react-redux";
import SidePanelComponent from "../../../../components/SidePanel/SidePanel.component";

import styles from "./Style.module.css";
import { useCallback } from "react";
import { useMemo } from "react";
import PageBox from "../../../../components/PageBox/PageBox.component";
import DataTables from "../../../../Datatables/Datatable.table";
import Constants from "../../../../config/constants";
import AppUserCreateView from "../../../AppUsers/AppUserCreate/AppUserCreate.view";
import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import CommentPopUp from "../../../../components/CommentPopUp/CommentPopUp";
import { ButtonBase, IconButton } from "@material-ui/core";
import { Add, Comment, Delete, Info, InfoOutlined } from "@material-ui/icons";
import useEventListHook from "./EventListHook.js";
import StatusPill from "../../../../components/Status/StatusPill.component.js";
// import AssociatedEventPopUp from "./components/AssociatedEventPopUp.js";

const EventListView = ({ user_id }) => {
  const [popUp, setPopUp] = useState(false);
  const [postId, setPostId] = useState("");
  const dispatch = useDispatch();


  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleEdit,
    handleViewDetails,
    editData,
    isSidePanel,
    isCalling,
    handleToggleSidePannel,
    isAcceptPopUp,
    toggleAcceptDialog,
  } = useEventListHook({});

  const {
    data,
    all: allData,
    query,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state?.associateEvent);

  const handleDelete = (post_id) => {
    // dispatch(feedDeleteAppuser({ post_id }));
    // dispatch(feedPostAppUserData(payloadData));
  };


  const handleComments = useCallback((post_id) => {
    // dispatch(commentsByFeedsAppUser({ post_id }));
  }, []);

  const handleDeleteCommit = useCallback(
    (comment_id) => {
      // dispatch(feedCommentDeleteAppUserFeed({ comment_id }));
    },
    [postId, handleComments]
  );

  const handleClosePopUp = () => {
    // dispatch(feedPostAppUserData(payloadData));
  };

  useEffect(() => {
    // dispatch(feedPostAppUserData(payloadData));
  }, []);

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

  const imageRenderer = useCallback(
    (all) => (
      <div>
        <div className={styles.number_img}>
          <img src={all?.banner} alt="img" />
          <span>{all?.name}</span>
        </div>
      </div>
    ),
    []
  );
  const tableStructure = useMemo(() => {
    return [
      {
        key: "event",
        label: "EVENT",
        sortable: false,
        render: (temp, all) => <div>{imageRenderer(all)}</div>,
      },
      {
        key: "registration_id",
        label: " REGISTRATION ID",
        sortable: true,
        render: (temp, all) => <div>{all?.reg_id}</div>,
      },
      {
        key: "added_on_date",
        label: "ADDED ON DATE",
        sortable: true,
        render: (temp, all) => <div>{all?.participentCreatedtAT}</div>,
      },
      {
        key: "location",
        label: "LOCATION",
        sortable: true,
        render: (temp, all) => <div>{all?.location}</div>,
      },
      {
        key: "start_date",
        label: "START DATE",
        sortable: true,
        render: (temp, all) => <div>{all?.startDateText}</div>,
      },
      {
        key: "end_date",
        label: "END DATE",
        sortable: true,
        render: (temp, all) => <div>{all?.endDateText}</div>,
      },
      {
        key: "status",
        label: "Status",
        sortable: true,
        render: (temp, all) => <div>{<StatusPill status={all?.status} />}</div>,
      },
      {
        key: "user_id",
        label: "Action",
        render: (temp, all) => (
          <div className={styles.dataAlignment}>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
              onClick={()=>toggleAcceptDialog(all)}
            >
              <InfoOutlined fontSize="small" />
            </IconButton>
          </div>
        ),
      },
    ];
  }, [handleViewDetails, handleEdit, isCalling, imageRenderer]);

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
      count: allData?.length,
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
            <span className={styles.title}>Events List</span>
          </div>
          <div></div>
        </div>
        <div>
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
        <CommentPopUp
          open={popUp}
          title={"Comments"}
          onClick={handleClosePopUp}
          // commentDetail={postComment?.data}
          postId={postId}
          handleDelete={handleDeleteCommit}
        />
      </PageBox>
  
    </>
  );
};

export default EventListView;
