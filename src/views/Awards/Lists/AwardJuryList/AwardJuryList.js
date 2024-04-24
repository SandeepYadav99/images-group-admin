import { ButtonBase, IconButton, Paper } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./Style.module.css";
import SidePanelComponent from "../../../../components/SidePanel/SidePanel.component";
import { Delete, DeleteOutline, Edit } from "@material-ui/icons";
import AwardJuryCreate from "../../Create/AwardJuryCreate/AwardJuryCreate";
import useAwardJuryListHook from "./AwardJuryListHook";
import DeleteModal from "../AwardCategoriesList/DeleteModal/DeleteModal";

const AwardJuryList = ({ data, awardId, callAPi }) => {
  const {
    handleToggleSidePannel,
    isSidePanel,
    isAcceptPopUp,
    toggleAcceptDelete,
    handleDelete,
    handleDetail,
    selectedData,
    handleCallDetail,
  } = useAwardJuryListHook({ data, awardId, callAPi });

  return (
    <div>
      <Paper
        className={styles.paperContainer}
        style={{ height: "auto", padding: "20px", marginTop: "20px" }}
      >
        <div className={styles.header_paper}>
          <p>
            <b>Award Jury</b>
          </p>

          <ButtonBase
            className={styles.update_status}
            onClick={handleToggleSidePannel}
          >
            ADD JURY MEMBER
          </ButtonBase>
        </div>
        {data?.length > 0 &&
          data?.map((item, index) => (
            <div className={styles.container} key={`jury_${index}`}>
              <img
                src={
                  item?.image
                    ? item?.image
                    : require("../../../../assets/img/video_icon.png")
                }
                alt=".."
              />
              <div className={styles.titleCompany}>{item?.name}</div>
              <div>{item?.company}</div>
              <div className={styles.delete}>
                <DeleteOutline
                  fontSize="small"
                  onClick={() => toggleAcceptDelete(item?.id)}
                />
              </div>
            </div>
          ))}
      </Paper>
      <SidePanelComponent
        handleToggle={handleToggleSidePannel}
        title={"Add Jury"}
        open={isSidePanel}
        side={"right"}
      >
        <AwardJuryCreate
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

export default AwardJuryList;
