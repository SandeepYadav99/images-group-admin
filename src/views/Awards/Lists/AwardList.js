import { ButtonBase, IconButton, Paper } from "@material-ui/core";
import React, { useEffect } from "react";
import styles from "./Style.module.css";
import SidePanelComponent from "../../../components/SidePanel/SidePanel.component";
import useAwardListHook from "./AwardListHook";
import UpdateAbout from "../Create/UpdateAbout";
import AwardCategoriesList from "./AwardCategoriesList/AwardCategories";
import PreviousAwardees from "./PreviousAwardees/PreviousAwardees";
import AwardJuryList from "./AwardJuryList/AwardJuryList";
import { ArrowBackIos } from "@material-ui/icons";
import historyUtils from "../../../libs/history.utils";

const AwardList = () => {
  const {
    editData,
    isSidePanel,
    handleToggleSidePannel,
    data,
    aboutData,
    handleClose,
  } = useAwardListHook({});
  return (
    <div>
      {/* <div className={styles.header_paper1}> */}
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => historyUtils.goBack()}>
            <ArrowBackIos fontSize={"small"} />

            <span className={styles.title}>Awards</span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>

      <Paper
        className={styles.paperContainer}
        style={{ height: "auto", padding: "20px", marginTop: "20px" }}
      >
        <div className={styles.header_paper}>
          <p>
            <b>About Awards</b>
          </p>

          <ButtonBase
            className={styles.update_status}
            onClick={handleToggleSidePannel}
          >
            UPDATE ABOUT
          </ButtonBase>
        </div>
        <div className={styles.container}>
          <div className={styles.profileContainer}>
            <b>Banner</b>
            <br />
            <div className={styles.profile_image}>
              <img
                src={
                  data?.image
                    ? data?.image
                    : require("../../../assets/img/ic_default_post@2x.png")
                }
                alt="Profile_Image"
              />
            </div>
          </div>
          <div className={styles.QRCode_Container}>
            <b>Content</b>
            <p className={styles.content}>
              {data?.contant ? data?.contant : "-"}
            </p>
          </div>
        </div>
      </Paper>
      <SidePanelComponent
        handleToggle={handleToggleSidePannel}
        title={"Update About"}
        open={isSidePanel}
        side={"right"}
      >
        <UpdateAbout
          handleToggleSidePannel={handleToggleSidePannel}
          isSidePanel={isSidePanel}
          aboutData={aboutData}
          handleClose={handleClose}
        />
      </SidePanelComponent>
      <div>
        <AwardCategoriesList
          data={data?.award_categories ? data?.award_categories : []}
        />
        <AwardJuryList />
        <PreviousAwardees />
      </div>
    </div>
  );
};

export default AwardList;
