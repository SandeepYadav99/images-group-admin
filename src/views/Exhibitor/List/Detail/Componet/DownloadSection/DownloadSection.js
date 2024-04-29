import React from "react";
import styles from "./Styles.module.css";
const DownloadSection = ({ details }) => {
  return (
    <div className={"plainPaper"}>
      <div style={{ marginBottom: "20px" }}>
        <b>Download </b>
      </div>
      <div className={styles.thirdPaper}>
        <div>
          {details?.map((res, index) => {
            return (
              <div key={index} className={"mt10"}>
                <a href={res?.document} target="_blank" rel="noreferrer">
                  {res?.file_name}
                </a>
              </div>
            );
          })}
        </div>
        {/* <b>Gallery Images</b> */}
      </div>

      <br />
    </div>
  );
};

export default DownloadSection;
