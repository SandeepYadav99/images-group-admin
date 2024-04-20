import { ButtonBase, IconButton, Paper } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./Style.module.css";

import SidePanelComponent from "../../../../components/SidePanel/SidePanel.component";

import { Delete, DeleteOutline, Edit } from "@material-ui/icons";
// import DeleteModal from "./DeleteModal/DeleteModal";

import AwardJuryCreate from "../../Create/AwardJuryCreate/AwardJuryCreate";
import useAwardJuryListHook from "./AwardJuryListHook";

const AwardJuryList = () => {
  const { editData, isSidePanel, toggleAcceptDialog, handleToggleSidePannel } =
  useAwardJuryListHook({});
  const [isAcceptPopUp, setIsAcceptPopUp] = useState(false);

  const toggleAcceptDelete = useCallback(
    (obj) => {
      setIsAcceptPopUp((e) => !e);
      // setDataValue({ ...obj });
    },
    [isAcceptPopUp]
  );

  useEffect(() => {
    // serviceGetAward({
    //     index: 1,
    //     row: null,
    //     order: null,
    //     query: "",
    //     query_data: null,
    //   }).then((res)=>{
    //     console.log(res)
    //   })
  }, []);

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
        <div className={styles.container}>
          <img
            src={require("../../../../assets/img/video_icon.png")}
            alt=".."
          />
          <div className={styles.delete}>
            <DeleteOutline fontSize="small" />
          </div>
        </div>
      </Paper>
      <SidePanelComponent
        handleToggle={handleToggleSidePannel}
        title={"Update About"}
        open={isSidePanel}
        side={"right"}
      >
        <AwardJuryCreate
          handleToggleSidePannel={handleToggleSidePannel}
          isSidePanel={isSidePanel}
          empId={editData}
        />
      </SidePanelComponent>
      {/* <DeleteModal
        isOpen={isAcceptPopUp}
        handleToggle={toggleAcceptDelete}
        // candidateId={params?.id}
      /> */}
    </div>
  );
};

export default AwardJuryList;
