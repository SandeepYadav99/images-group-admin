import TopNavBar from "../../../components/TopNavBar/TopNavBar.js";
import styles from "./Style.module.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import history from "../../../libs/history.utils";
import { ButtonBase} from "@material-ui/core";
import EventListView from "./EventListView/EventListView.js";


const AssociateEvent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          {" "}
          <ButtonBase onClick={() => history.push("/app")}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span>
              <b> User Details</b>
            </span>{" "}
          </ButtonBase>
          <div className={styles.newLine} />{" "}
        </div>
      </div>
      <div className={styles.topNavBar}>
        <TopNavBar data={3} />
      </div>
      <div>
        <EventListView />
      </div>
    </div>
  );
};

export default AssociateEvent;
