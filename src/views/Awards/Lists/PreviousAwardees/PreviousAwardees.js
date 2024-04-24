import { ButtonBase, Paper } from "@material-ui/core";
import React from "react";
import styles from "./Style.module.css";
import SidePanelComponent from "../../../../components/SidePanel/SidePanel.component";
import { DeleteOutline, Edit } from "@material-ui/icons";
import usePreviousAwardeesHook from "./PreviousAwardeesHook";
import PreviousAwardeesCreate from "../../Create/PreviousAwardeesCreate/PreviousAwardeesCreate";
import DeleteModal from "../AwardCategoriesList/DeleteModal/DeleteModal";

const PreviousAwardees = ({ data, awardId, callAPi }) => {
  const {
    handleToggleSidePannel,
    isSidePanel,
    isAcceptPopUp,
    toggleAcceptDelete,
    handleDelete,
    handleDetail,
    selectedData,
    handleCallDetail,
  } = usePreviousAwardeesHook({ data, awardId, callAPi });

  return (
    <div>
      <Paper
        className={styles.paperContainer}
        style={{ height: "auto", padding: "20px", marginTop: "20px" }}
      >
        <div className={styles.header_paper}>
          <p>
            <b>Previous Awardees</b>
          </p>

          <ButtonBase
            className={styles.update_status}
            onClick={handleToggleSidePannel}
          >
            ADD AWARDEE
          </ButtonBase>
        </div>
        {data?.length > 0 &&
          data?.map((item, index) => (
            <div className={styles.container} key={`prev_${index}`}>
              <img
                src={
                  item?.image
                    ? item?.image
                    : require("../../../../assets/img/video_icon.png")
                }
                alt=".."
              />
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
        title={"Add Awardees"}
        open={isSidePanel}
        side={"right"}
      >
        <PreviousAwardeesCreate
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

export default PreviousAwardees;
