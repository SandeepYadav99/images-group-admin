import { ButtonBase, IconButton, Paper } from "@material-ui/core";
import React, { useEffect } from "react";
import styles from "./Style.module.css";
import SidePanelComponent from "../../../components/SidePanel/SidePanel.component";
import useAwardListHook from "./AwardListHook";
import UpdateAbout from "../Create/UpdateAbout";

import { serviceGetAward } from "../../../services/Award.servcice";

import AwardCategoriesList from "./AwardCategoriesList/AwardCategories";
import PreviousAwardees from "./PreviousAwardees/PreviousAwardees";
import AwardJuryList from "./AwardJuryList/AwardJuryList";
import { ArrowBack, ArrowBackIos } from "@material-ui/icons";
import historyUtils from "../../../libs/history.utils";

const AwardList = () => {
  const { editData, isSidePanel, toggleAcceptDialog, handleToggleSidePannel } =
    useAwardListHook({});

  useEffect(() => {
    serviceGetAward({
      index: 1,
      row: null,
      order: null,
      query: "",
      query_data: null,
    }).then((res) => {
      console.log(res);
    });
  }, []);

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
            Banner <br />
            <div className={styles.profile_image}>
              <img
                src={require("../../../assets/img/ic_default_post@2x.png")}
                alt="Profile_Image"
              />
            </div>
          </div>

          <div className={styles.QRCode_Container}>
            <p>Content</p>
            <p className={styles.content}>
              Instituted in 2004, the IMAGES Retail Awards (IRA) recognise and
              honour outstanding achievements in every major format and category
              of modern retail in India. They employ a unique, 360-degree
              evaluation process that covers a host of operational benchmarks
              along with qualitative factors such as innovation and excellence
              in customer service, supplier relations, employee management,
              marketing/consumer promotions, including any other features or
              achievements, for the duration of the assessment.
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
          empId={editData}
        />
      </SidePanelComponent>
      <div>
        <AwardCategoriesList />
        <PreviousAwardees />
        <AwardJuryList />
      </div>
    </div>
  );
};

export default AwardList;
