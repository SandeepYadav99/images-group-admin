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
        <h3>{updateData?.schedule?.eve_name}</h3>
        <p className={styles.timeing}>
          {updateData?.schedule?.eve_description}
        </p>
        <p className={styles.timeing}>
          {updateData?.schedule?.date} | {updateData?.schedule?.start_time} -{" "}
          {updateData?.schedule?.end_time}
        </p>
      </PageBoxComponent>
      <div className={"mt"}>
        <SessionTable data={updateData} />
      </div>
    </div>
  );
};

export default ScheduleDetail;
