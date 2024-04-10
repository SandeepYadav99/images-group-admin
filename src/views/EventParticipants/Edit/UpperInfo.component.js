import React from "react";
import styles from "./Style.module.css";
// import image from "../../../../../assets/img/download.png";

const UpperInfoComponent = ({ data }) => {
  console.log(data, "data is here");
  return (
    <div className={styles.plainPaper}>
      <div className={styles.newContainer}>
        <div className={styles.mainFlex}>
          <div className={styles.left221}>
            <div>
              <div className={styles.key}>
                <span className={styles.value}>Name:</span>
                {data?.name}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Phone Number:</span>
                {data?.contact}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Participants Type:</span>
                {data?.participant_type}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Lunch:</span>
                {!data?.is_lunch ? "NO" : "YES"}
              </div>
            </div>
          </div>
          <div className={styles.vertical}></div>
          <div className={styles.left}>
            <div className={styles.key}>
              <span className={styles.value}>Reg Id:</span>
              {data?.reg_id}
            </div>

            <div className={styles.key}>
              <span className={styles.value}>Email:</span>
              {data?.email}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Awards:</span>
              {!data?.is_awards ? "NO" : "YES"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpperInfoComponent;
