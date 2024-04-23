import React, { useEffect, useState } from "react";
import PageBoxComponent from "../../../../components/PageBox/PageBox.component";

import styles from "./Style.module.css";
import SessionTable from "../../../../components/SectionTable/SectionTable";
import { serviceEventScheduleRatingCount } from "../../../../services/EventSchedule.service";
const ScheduleDetail = ({ handleScheduleDetail, isScheduleDetail, empId }) => {
  const [updateData, setUpdateData] = useState([]);

  useEffect(() => {
    if (!empId) return;
    serviceEventScheduleRatingCount({ schedule_id: empId }).then((res) => {
      if (!res.error) {
        const data = res?.data;
        console.log({ data });
        setUpdateData(data);
      }
    });
  }, [empId]);
  
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
      <div className={"mt"}>
        <SessionTable data={updateData} />
      </div>
    </div>
  );
};

export default ScheduleDetail;
