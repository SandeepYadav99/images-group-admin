import React from "react";
import styles from "./Style.module.css";

import { IconButton, ButtonBase } from "@material-ui/core";
import { Add, ArrowBackIos } from "@material-ui/icons";
import historyUtils from "../../libs/history.utils";
import FilterComponent from "../Filter/Filter.component";
const ListHeader = (props) => {
  const {
    title,
    actionTitle,
    handleCreateFed,
    isFetching,
    handleSearchValueChange,
    configFilter,
    arrowIcon
  } = props;
  return (
    <>
      <div className={styles.headerContainer}>
        <div>
          <ButtonBase onClick={() => historyUtils.goBack()}>
            {arrowIcon ==="true" &&  <ArrowBackIos fontSize={"small"} />}
           
            <span className={styles.title}>{title}</span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>

        <div className={styles.BtnWrapper}>
          <ButtonBase onClick={handleCreateFed} className={"createBtn"}>
            {actionTitle}
            <Add fontSize={"small"} className={"plusIcon"}></Add>
          </ButtonBase>
        </div>
      </div>
      <div style={{ width: "88%" }}>
        <FilterComponent
          is_progress={isFetching}
          filters={configFilter}
          handleSearchValueChange={handleSearchValueChange}
          handleFilterDataChange={"handleFilterDataChange"}
        />
      </div>
    </>
  );
};

export default ListHeader;
