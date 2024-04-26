// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import { actionDetailAppUser } from "../../../../actions/AppUser.action";
// import styles from "./Style.module.css";

// const AditnalDetail = ({ id }) => {
//   const dispatch = useDispatch();
//   const [value, setValue] = useState();

//   useEffect(() => {
//     if (!value) {
//       dispatch(actionDetailAppUser({ id }));
//     }
//   }, []);

//   const {
//     data,
//     all: allData,
//     currentPage,
//     is_fetching: isFetching,
//   } = useSelector((state) => state.App_User);

//   useEffect(() => {
//     setValue(data?.data?.details);
//   });

//   return (
//     <>
//       <div className={styles.container}>
//         <div className={styles.profileContainer}>
//           <div className={styles.profileDetails}>
//             <div className={styles.description_subContainer}>
//               <div className={styles.description_key}>
//                 <span>
//                   <b>Participant Type:</b>
//                 </span>
//                 <br />
//                 <span>
//                   <b>Award Access: </b>
//                 </span>
//               </div>
//               <div className={styles.description_value}>
//                 <div>
//                   {
//                     <StatusPill
//                       status={'Delegate'}
//                       style={getStatusPillStyle('Delegate')}
//                     />
//                   }
//                 </div>{" "}
//                 <br />
//                 <br />
//                 <div>
//                   {value?.country_code} {value?.contact}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className={styles.profileDescription}>
//           <div className={styles.description_subContainer}>
//             <div className={styles.description_key}>
//               <span>
//                 <b>Lunch Access:</b>
//               </span>
//             </div>
//             <div className={styles.description_value}>
//               <span>Yes</span>

//               {/* <span className={styles.status_description}>{value?.status}</span> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AditnalDetail;

import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { actionDetailAppUser } from "../../../../actions/AppUser.action";
import styles from "./Style.module.css";
import historyUtils from "../../../../libs/history.utils";
import StatusPill from "../../../../components/Status/StatusPill.component";

const AditnalDetail = ({ id }) => {
  const getStatusPillStyle = useCallback((name) => {
    let background, color;

    // Determine styles based on value.name
    switch (name) {
      case "Delegate":
        background = "#E4FBFE";
        color = "#18B3C7";
        break;
      case "Speaker":
        background = "#FEF7E4";
        color = "#C89712";
        break;
      case "Award Presentation":
        background = "#EFFEE8";
        color = "#0CA13E";
        break;
      case "Ayush":
        background = "#FFECF9";
        color = "#C71887";
        break;
      case "EXHIBITOR":
        background = "#ECEDFF";
        color = "#4018C7";
        break;
      default:
        // Default styles if value.name does not match any specific case
        background = "#FFFFFF";
        color = "#000000";
        break;
    }

    return {
      background,
      color,
      border: "none",
    };
  }, []);
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
    <div className={styles.container}>
      <div className={styles.profileContainer}>
        <div className={styles.profile_image}>
          <div className={styles.profileDetails}>
            <div className={styles.profileTitle}>
              <b>Participant Type:</b>

              {value?.participant_type?.length > 0 ? (
                value.participant_type.map((status, index) => (
                  <div key={index} className={styles.participantStatus}>
                    {status}
                    {index < value.participant_type.length - 1 && ",   "}
                  </div>
                ))
              ) : (
                <span>N/A</span>
              )}
            </div>
            <div></div>
            <span className={styles.profileTitle}>
              <b>Award Access: </b>
              <span className={styles.textColor}>
                {" "}
                {value?.is_awards ? "Yes" : "No"}
              </span>
            </span>

            <span className={styles.profileTitle}>{value?.full_contact}</span>
          </div>
        </div>
        <div className={styles.description_value}>
          <div className={styles.profileDetails1}>
            <div>
              <span>
                <b>Lunch Access: </b>
              </span>
              <span className={styles.textColor}>
                {" "}
                {value?.is_lunch ? "Yes" : "No"}
              </span>

              {/* <span
                style={{
                  textDecoration: "underline",
                  color: "#AB183D",
                  marginLeft: "2rem ",
                }}
                onClick={handleRouteMember}
              >
                {value?.company_name}
              </span> */}
            </div>
            <div>
              <span>
                <b></b>
              </span>
              <span className={styles.textColor}> </span>

              <span
                style={{
                  textDecoration: "underline",
                  color: "#AB183D",
                  marginLeft: "2rem ",
                }}
              ></span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.QRCode_Container}></div>
    </div>
  );
};

export default AditnalDetail;
