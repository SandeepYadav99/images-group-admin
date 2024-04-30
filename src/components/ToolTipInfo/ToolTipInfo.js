import { Tooltip } from "@material-ui/core";
import { InfoOutlined } from "@material-ui/icons";
import React from "react";
import styles from "./Styles.module.css";
const ToolTipInfo = ({ value }) => {
  return (
    <Tooltip
      classes={{ tooltip: styles.customTooltip }}
      title={`Image size less than ${value ? value : "2"}mb | 1000x1000 px`}
    >
      <div className={styles.imageInfo}>
        <InfoOutlined fontSize="small" />
        Image Guide
      </div>
    </Tooltip>
  );
};

export default ToolTipInfo;
