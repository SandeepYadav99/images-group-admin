import { ButtonBase, IconButton, Paper } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./Style.module.css";

import { useDispatch, useSelector } from "react-redux";
import useAwardCategoriesHook from "./AwardCategoriesHook";
import SidePanelComponent from "../../../../components/SidePanel/SidePanel.component";
import AwardCategories from "../../Create/AwardCategories/AwardCategoriesCreate";
import AwardCategoriesCreate from "../../Create/AwardCategories/AwardCategoriesCreate";
import { Delete, Edit } from "@material-ui/icons";
import DeleteModal from "./DeleteModal/DeleteModal";

const AwardCategoriesList = ({ data, callAPi, awardId }) => {
  const {
    isCalling,
    handleToggleSidePannel,
    isSidePanel,
    isAcceptPopUp,
    toggleAcceptDelete,
    handleDelete,
    handleDetail,
    selectedData,
    handleCallDetail,
  } = useAwardCategoriesHook({ data, callAPi });

  return (
    <div>
      <Paper
        className={styles.paperContainer}
        style={{ height: "auto", padding: "20px", marginTop: "20px" }}
      >
        <div className={styles.header_paper}>
          <p>
            <b>Award Categories</b>
          </p>

          <ButtonBase
            className={styles.update_status}
            onClick={handleToggleSidePannel}
          >
            ADD CATEGORY
          </ButtonBase>
        </div>
        <div className={styles.cateWrap}>
          {data?.length > 0 &&
            data?.map((item, index) => (
              <div className={styles.container} key={`profile_${index}`}>
                <div className={styles.profileContainer}>{item?.title}</div>
                <div>
                  <IconButton
                    className={"tableActionBtnAction"}
                    color="secondary"
                    onClick={() => handleDetail(item)}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton
                    className={"tableActionBtnError"}
                    color="secondary"
                    onClick={() => toggleAcceptDelete(item?.id)}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </div>
              </div>
            ))}
        </div>
      </Paper>
      <SidePanelComponent
        handleToggle={handleToggleSidePannel}
        title={`${selectedData?.id ? 'Update' : 'Add'} Award Category` }
        open={isSidePanel}
        side={"right"}
      >
        <AwardCategoriesCreate
          handleToggleSidePannel={handleToggleSidePannel}
          isSidePanel={isSidePanel}
          selectedData={selectedData}
          awardId={awardId}
          handleCallDetail={handleCallDetail}
        />
      </SidePanelComponent>
      <DeleteModal
        isOpen={isAcceptPopUp}
        handleToggle={toggleAcceptDelete}
        handleSubmit={handleDelete}
      />
    </div>
  );
};

export default AwardCategoriesList;
