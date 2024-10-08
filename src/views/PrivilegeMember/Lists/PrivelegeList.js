import { ButtonBase, IconButton, Paper } from "@material-ui/core";
import React, { useEffect } from "react";
import styles from "./Style.module.css";
import SidePanelComponent from "../../../components/SidePanel/SidePanel.component";
import usePrivilegeListHook from "./PrivelegeListHook";
import UpdateAbout from "../Create/PrivilegeUpdateAbout";
import AwardCategoriesList from "./AwardCategoriesList/AwardCategories";
import PreviousAwardees from "./PreviousAwardees/PreviousAwardees";
import { ArrowBackIos } from "@material-ui/icons";
import historyUtils from "../../../libs/history.utils";

const PrivelegeList = () => {
  const {
    editData,
    isSidePanel,
    handleToggleSidePannel,
    data,
    aboutData,
    handleClose,
    callAPi,
  } = usePrivilegeListHook({});
  return (
    <div>
      {/* <div className={styles.header_paper1}> */}
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => historyUtils.goBack()}>
            <ArrowBackIos fontSize={"small"} />

            <span className={styles.title}>Privileged Member</span>
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
            <b>About Membership</b>
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
              {data?.content ? data?.content : "-"}
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
          data={data?.privilaged_member_categories ? data?.privilaged_member_categories : []}
          awardId={data?.id ? data?.id : ""}
          callAPi={callAPi}
        />
        <PreviousAwardees
          data={data?.privilaged_member_boards ? data?.privilaged_member_boards : []}
          awardId={data?.id ? data?.id : ""}
          callAPi={callAPi}
        />
       
      </div>
    </div>
  );
};

export default PrivelegeList;
