import TopNavBar from "../../../components/TopNavBar/TopNavBar.js";
import styles from "./Style.module.css";
import Paper from "@material-ui/core/Paper";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import history from "../../../libs/history.utils";
import { ButtonBase } from "@material-ui/core";
import UserProfileView from "./ProfileDetails/UserProfileView.js";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
// import AditnalDetail from "./ProfileDetails/AditinalDetail.js";
import { Sync } from "@material-ui/icons";
import AditnalDetail from "./ProfileDetails/AditinalDetail.js";
import UpdateStatusPopup from "./components/UpdateStatusPopup.js";

const UserProfile = () => {
  const params = useParams();
  const [isAcceptPopUp, setIsAcceptPopUp] = useState(false);

  const toggleAcceptDialog = useCallback(
    (obj) => {
      setIsAcceptPopUp((e) => !e);
      // setDataValue({ ...obj });
    },
    [isAcceptPopUp, params?.id]
  );
  useEffect(() => {}, [params?.id]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          {" "}
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span>
              <b> User Details</b>
            </span>{" "}
          </ButtonBase>
          <div className={styles.newLine} />{" "}
        </div>
      </div>
      <div className={styles.topNavBar}>{/* <TopNavBar data={0} /> */}</div>
      <div>
        <div>
          <Paper
            className={styles.paperContainer}
            style={{ height: "auto", padding: "20px" }}
          >
            <div className={styles.header_paper}>
              <p>
                <b>Personal Information</b>
              </p>
              <ButtonBase className={styles.update_status} onClick={toggleAcceptDialog}>
                Update Status <Sync />
              </ButtonBase>
            </div>
            <UserProfileView id={params?.id} />
          </Paper>
        </div>
        <br />
        <Paper
          className={styles.paperContainer}
          style={{ height: "auto", padding: "20px" }}
        >
          <div>
            <b>Additional Details</b>
          </div>
          <AditnalDetail id={params?.id} />
        </Paper>
      </div>
      <UpdateStatusPopup
        isOpen={isAcceptPopUp}
        handleToggle={toggleAcceptDialog}
        candidateId={params?.id}
      />
    </div>
  );
};

export default UserProfile;
