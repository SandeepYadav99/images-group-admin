import React from "react";
import PageBoxComponent from "../../../../components/PageBox/PageBox.component";

import styles from "./Style.module.css";
const ScheduleDetail = ({ handleScheduleDetail, isScheduleDetail, empId }) => {
  return (
    <div className={styles.pageContainer}>
      <PageBoxComponent>
        <h3>Session Name</h3>
        <p className={styles.timeing}>
          Session description will be shown here. Session description will be
          shown here.
        </p>
        <p className={styles.timeing}>8 MAY | 11:00 AM - 12:00 PM</p>
      </PageBoxComponent>
      <div style={{ marginTop: "20px" }}>
        <PageBoxComponent>
          <div className={styles.InfoWrap}>
            <div>
              <div>Session Rating</div>
              <div className={styles.newLine}></div>
            </div>
            <div className={styles.timeing}>
              Overall Rating
              <br />4 ⭐ (120)
            </div>
          </div>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <tr className={styles.tableContainerBox}>
                <th className={styles.th}>USER</th>
                <th className={styles.th}>RATING</th>
                <th className={styles.th}>COMMENT</th>
              </tr>
              <tbody>
                <tr>
                  <td className={styles.td}>
                    <div className={styles.td1}>
                      <img src="" />
                      <div>Name</div>
                    </div>
                  </td>
                  <td className={styles.td}>3</td>
                  <td className={styles.td}>
                    comment added by user will be shown here
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </PageBoxComponent>
      </div>
    </div>
  );
};

export default ScheduleDetail;
