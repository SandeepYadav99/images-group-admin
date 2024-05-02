import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { actionDetailAppUser } from "../../../../actions/AppUser.action";
import styles from "./Style.module.css";
import historyUtils from "../../../../libs/history.utils";
import { capitalizeFirstLetter } from "../../../../hooks/CapsLetter";

const UserProfileView = ({ id }) => {
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
          <img
            src={value?.image}
            alt="Profile_Image"
            style={{ height: "50px", width: "50px", borderRadius: "100%" }}
          />
          <div className={styles.profileDetails}>
            <span className={styles.profileTitleName}>
              <b>{capitalizeFirstLetter(value?.name)}</b>
            </span>
            <span className={styles.profileTitle}>
              {value?.country_code} {value?.contact}
            </span>
            <span className={styles.profileTitle}>{value?.email || "N/A"}</span>
            {/* <span className={styles.profileTitle}>
              Category: {value?.category || "N/A"}
            </span> */}
          </div>
        </div>
        <div className={styles.description_value}>
          <div className={styles.profileDetails1}>
            <div className={styles.companyDetail}>
              <div>
                <div>Company: </div>
                <div className={styles.des_title}>Designation:</div>
                {/* <div className={styles.des_title}>Registration id:</div> */}
                <div className={styles.des_title}>Status:</div>
              </div>
              <div>
                <div onClick={handleRouteMember} className={styles.des_title1}>
                  {" "}
                  {value?.company_name || "N/A"}
                </div>
                <div className={styles.des_title}>{value?.designation || "N/A"}</div>
                {/* <div className={styles.des_title}>{value?.reg_id || "N/A"}</div> */}
                <div
                  className={`${
                    value?.status === "ACTIVE"
                      ? styles.status_description
                      : styles.statusInactive
                  }`}
                >
                  {value?.status}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.QRCode_Container}></div>
    </div>
  );
};

export default UserProfileView;
