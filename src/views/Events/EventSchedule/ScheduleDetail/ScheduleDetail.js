import React from "react";
import PageBoxComponent from "../../../../components/PageBox/PageBox.component";

import styles from "./Style.module.css";
import SessionTable from "../../../../components/SectionTable/SectionTable";
const ScheduleDetail = ({ handleScheduleDetail, isScheduleDetail, empId }) => {
  const userData = [
    {
      name: "Abhay Gupta",
      avatar: "..",
      rating: 3,
      comment: "comment added by user will be shown here",
    },
    
  ];
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
      <div className={"mt"} >
        <SessionTable data={userData} />
      </div>
    </div>
  );
};

export default ScheduleDetail;
