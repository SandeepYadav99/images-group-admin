import React from "react";
import styles from "./Style.module.css"; // Import your CSS styles
import PageBoxComponent from "../PageBox/PageBox.component";

const SessionTable = ({ data }) => {
  return (
    <div>
      <PageBoxComponent>
        <div className={styles.InfoWrap}>
          <div>
            <div>Session Rating</div>
            <div className={styles.newLine}></div>
          </div>
          <div className={styles.timeing}>
            Overall Rating
            <br />
            {data?.avg?.toFixed(1)} ⭐ ({data?.totalCount})
          </div>
        </div>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableContainerBox}>
                <th className={styles.th}>USER</th>
                <th className={styles.th}>RATING</th>
                <th className={styles.th}>COMMENT</th>
              </tr>
            </thead>
            <tbody>
              {data?.user?.map((item, index) => (
                <tr key={index}>
                  <td className={styles.td}>
                    <div className={styles.td1}>
                      <img src={item?.user.image} alt={item.name} />
                      <a href={`${"/app/user-profile/"}${item?.user?.id}`}>{item?.user.name}</a>
                    </div>
                  </td>
                  <td className={styles.td}>{item.rating}</td>
                  <td className={styles.td}>{item.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageBoxComponent>
    </div>
  );
};

export default SessionTable;
