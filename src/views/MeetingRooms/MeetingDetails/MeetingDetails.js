import styles from "./Style.module.css";
import history from "../../../libs/history.utils";
import { ButtonBase } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import useMeetingDetailHook from "./MeetingDetails.hook";
import StatusPill from "../../../components/Status/StatusPill.component";
import { Add, PostAdd, WidgetsTwoTone } from "@material-ui/icons";
import { fontSize } from "suneditor/src/plugins";
import PageBoxComponent from "../../../components/PageBox/PageBox.component";

const MeetingDetails = ({ location }) => {
  const { dataValue } = useMeetingDetailHook({ location });

  return (
    <>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />
            <span className={"capitalize"}>
              <b>Meeting Room Detail</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>{" "}
      <div className={styles.paperData}>
        <div className={styles.roomName}>
          <b>{dataValue?.name}</b>
          <span>{dataValue?.code}</span>
        </div>
        <div>
          <StatusPill status={dataValue?.status} style={{padding:"10px",width:"100px"}} />
        </div>
        <div className={styles.btnFlex}>
          <ButtonBase className={"createBtn"} id={styles.bgColor}>
            DUPLICATE 
          </ButtonBase>
          <ButtonBase className={"createBtn"} id={styles.bgColor}>
            UPDATE INFORMATION
          </ButtonBase>
        </div>
      </div>
      <br/>
      <PageBoxComponent>

      </PageBoxComponent>

    </>
  );
};

export default MeetingDetails;
