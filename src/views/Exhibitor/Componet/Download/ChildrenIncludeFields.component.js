import React from "react";
import { TextField, ButtonBase } from "@material-ui/core";
import styles from "./style.module.css";
import LogUtils from "../../../../libs/LogUtils";
import MultIUpload from "../MultIUpload/MultIUpload.component";
import { serviceUpdateFile } from "../../../../services/Common.service";

const ChildrenIncludeFields = ({
  index,
  changeData,
  handlePress,
  data,
  errors,
  exhibitorId,
}) => {
  const handleChange = (e, fieldName) => {
    // const name = e?.target?.name;
    // const value = e?.target?.value;
    if (fieldName) {
      if (fieldName === "file_name") {
        changeData(index, { [fieldName]: e.target.value });
      } else if (fieldName === "document") {
        const fd = new FormData();
        fd.append("files", e);
        serviceUpdateFile(fd).then((res) => {
          if (!res?.error) {
            const data = res?.data;
            changeData(index, { [fieldName]: data?.length > 0 ? data[0] : "" });
          }
        });
      } else {
        changeData(index, { [fieldName]: e });
      }
    }
  };
  return (
    <div>
      <div className={styles.flexContainer}>
        <div className={styles.firstRow}>
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <TextField
                error={errors?.file_name}
                onChange={(e) => handleChange(e, "file_name")}
                value={data?.file_name}
                fullWidth={true}
                name={"file_name"}
                margin={"dense"}
                variant={"outlined"}
                label={"File Name"}
              />
            </div>
          </div>
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <MultIUpload
                placeLabel
                max_size={10 * 1024 * 1024}
                type={["pdf", "doc", "docx"]}
                fullWidth={true}
                name="od1"
                label="Upload PDF"
                accept={"application/pdf,application/msword"}
                error={errors?.document}
                value={data?.document || ""}
                placeholder={"Upload PDF"}
                onChange={(file) => {
                  if (file) {
                    handleChange(file, "document");
                  }
                }}
              />
              <div className={styles.inst}>
                {exhibitorId && (
                  <a
                    href={data?.document ?? " "}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View File
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className={"textCenter"}>
            <ButtonBase
              className={styles.removeBtn}
              // label={this.props.index == 0 ? "+" : '-'}
              onClick={() => {
                handlePress(index == 2 ? "-" : "-", index);
              }}
            >
              {"Remove"}
            </ButtonBase>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildrenIncludeFields;
