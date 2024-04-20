import { ButtonBase, IconButton, Paper } from "@material-ui/core";
import React, { useEffect } from "react";
import styles from "./Style.module.css";

import { useDispatch, useSelector } from "react-redux";
import useAwardCategoriesHook from "./AwardCategoriesHook";
import SidePanelComponent from "../../../../components/SidePanel/SidePanel.component";
import AwardCategories from "../../Create/AwardCategories/AwardCategoriesCreate";
import AwardCategoriesCreate from "../../Create/AwardCategories/AwardCategoriesCreate";
import { Delete, Edit } from "@material-ui/icons";

const AwardCategoriesList = () => {
  const { editData, isSidePanel, toggleAcceptDialog, handleToggleSidePannel } =
    useAwardCategoriesHook({});
  const dispatch = useDispatch();
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
            <b>Award Categories</b>
          </p>

          <ButtonBase
            className={styles.update_status}
            onClick={handleToggleSidePannel}
          >
            ADD CATEGORY
          </ButtonBase>
        </div>
        <div className={styles.container}>
          <div className={styles.profileContainer}>hii</div>

          <div >
            <IconButton   className={"tableActionBtnAction"}  color="secondary"
             >
              <Edit fontSize="small" />
            </IconButton>
            <IconButton className={"tableActionBtnError"}
              color="secondary">
              <Delete fontSize="small" />
            </IconButton>
          </div>
        </div>
      </Paper>
      <SidePanelComponent
        handleToggle={handleToggleSidePannel}
        title={"Update About"}
        open={isSidePanel}
        side={"right"}
      >
        <AwardCategoriesCreate
          handleToggleSidePannel={handleToggleSidePannel}
          isSidePanel={isSidePanel}
          empId={editData}
        />
      </SidePanelComponent>
    </div>
  );
};

export default AwardCategoriesList;
