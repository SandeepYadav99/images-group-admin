import React from "react";
import styles from "./Style.module.css";
import { removeUnderScore } from "../../../helper/helper";
// import image from "../../../../../assets/img/download.png";

const UpperInfoComponent = ({ data }) => {
  // console.log(data, "participant_type");
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
                {data?.full_contact}
              </div>
              <div className={styles.key32}>
                <span className={styles.value}>Participants Type:</span>
                <div className={styles.partWrap}>
                  {data?.participant_type?.map((item, index) => (
                    <div key={`part_${index}`} className={styles.partWrapInner}>
                      {removeUnderScore(item)}
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Lunch:</span>
                {!data?.is_lunch ? "NO" : "YES"}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Title/Designation:</span>
                {data?.designation}
              </div>
              {
                data?.custom_data?.length > 0 && data?.custom_data?.map((item,index)=>  <div className={styles.key} key={`custom_${index}`}>
                <span className={styles.value}>{item?.label}</span>
                {item?.value ? item?.value : "-"}
                </div>)
              }
            </div>
          </div>
          <div className={styles.vertical}></div>
          <div className={styles.left}>
            <div className={styles.key}>
              <span className={styles.value}>Ref Id:</span>
              {data?.ref_id || data?.reg_id}
            </div>

            <div className={styles.key32}>
              <span className={styles.value}>Email:</span>
              <div className={styles.emailWrap}>{data?.email}</div>
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Awards:</span>
              {!data?.is_awards ? "NO" : "YES"}
            </div>
            <div className={styles.key}>
                <span className={styles.value}>Company name:</span>
                {data?.company_name}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Category:</span>
                {data?.category}
              </div>   
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpperInfoComponent;
