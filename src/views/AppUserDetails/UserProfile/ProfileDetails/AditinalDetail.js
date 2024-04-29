import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { actionDetailAppUser } from "../../../../actions/AppUser.action";
import styles from "./Style.module.css";
import historyUtils from "../../../../libs/history.utils";

import { replaceUnderscores } from "../../../../hooks/CapsLetter";
import StatusPill from "../../../../components/Status/StatusPill.component";

const AditnalDetail = ({ id }) => {
  const getStatusPillStyle = useCallback((name) => {
    let background, color;

    // Determine styles based on value.name
    switch (name) {
      case "DELEGATE":
        background = "#E4FBFE";
        color = "#18B3C7";
        break;
      case "SPEAKER":
        background = "#FEF7E4";
        color = "#C89712";
        break;
      case "AWARD PRESENTATION":
        background = "#EFFEE8";
        color = "#0CA13E";
        break;
      case "JURY":
        background = "#FFECF9";
        color = "#C71887";
        break;
      case "INNOVATORS CLUB":
        background = "#ECEDFF";
        color = "#4018C7";
        break;
      case "EXHIBITOR":
        background = "#ECEDFF";
        color = "#4018C7";
        break;
      default:
        // Default styles if value.name does not match any specific case
        background = "#FFFFFF";
        color = "#0CA13E";
        break;
    }

    return {
      background,
      color,
      border: "none",
    };
  }, []);
  // const StatusPill = ({ status, style }) => (
  //   <div style={style}>{replaceUnderscores(status)}</div>
  // );

  const dispatch = useDispatch();
  const [value, setValue] = useState();

  useEffect(() => {
    if (!value) {
      dispatch(actionDetailAppUser({ id }));
    }
  }, [id]);

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.App_User);

  useEffect(() => {
    setValue(data?.data?.details);
  });

  const truncate = (str) => {
    return str.length > 30 ? str.substring(0, 30) + "..." : str;
  };
  const handleRouteMember = () => {
    if (value?.is_member) {
      historyUtils.push(`/member/details/` + `${value?.member?.id}`);
    }
  };

  return !value ? (
    <p> Loading.... </p>
  ) : (
    <div className={styles.profileTitle1}>
      <div className={styles.profileFlex}>
        <div>
          <b>Participant Type:</b>
        </div>
        <div className={styles.flexPill}>
          {" "}
          {value?.participant_type?.length > 0 ? (
            value.participant_type.map((status, index) => (
              <div key={index}>
                <StatusPill
                  status={replaceUnderscores(status)}
                  style={getStatusPillStyle(replaceUnderscores(status))}
                />

                {/* {index < value.participant_type.length - 1 && ","} */}
              </div>
            ))
          ) : (
            <span>N/A</span>
          )}{" "}
        </div>
      </div>

      <div className={styles.profileFlex}>
        <div>
          <b>Lunch Access:</b>
        </div>
        <div className={styles.textColor}>
          {" "}
          {value?.is_lunch ? "Yes" : "No"}
        </div>
      </div>
      <div className={styles.profileFlex}>
        <div>
          <b>Award Access:</b>{" "}
        </div>
        <div className={styles.textColor}>
          {" "}
          {value?.is_awards ? "Yes" : "No"}
        </div>
      </div>

      <div className={styles.QRCode_Container}></div>
    </div>
  );
};

export default AditnalDetail;
