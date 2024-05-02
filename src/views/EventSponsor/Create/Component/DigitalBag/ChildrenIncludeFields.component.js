import React from "react";
import { TextField, ButtonBase } from "@material-ui/core";
import styles from "./style.module.css";
import constants from "../../../../../config/constants";
import { serviceUpdateFilePartner } from "../../../../../services/Common.service";
import MultIUpload from "../../../../Exhibitor/Componet/MultIUpload/MultIUpload.component";

const ChildrenIncludeFields = ({
  index,
  changeData,
  variants,
  handlePress,
  data,
  errors,
}) => {
  const handleChange = (e, fieldName) => {
    // const name = e?.target?.name;
    // const value = e?.target?.value;
    if (fieldName) {
      if (fieldName === "title") {
        changeData(index, { [fieldName]: e.target.value });
      } else if (fieldName === "url") {
        changeData(index, { [fieldName]: e.target.value });
      } else if (fieldName === "thumbnail") {
        const fd = new FormData();
        fd.append("files", e);
        serviceUpdateFilePartner(fd).then((res) => {
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
          <div className={styles.cont}>
            <div className={"formFlex"}>
              <div className={"formGroup"}>
                <MultIUpload
                  // imageClass={styles.inputFileUploader}
                  max_size={5 * 1024 * 1024}
                  type={["png", "jpeg", "jpg"]}
                  fullWidth={true}
                  name="thumbnail"
                  accept={"image/*"}
                  default_image={data?.thumbnail ? data?.thumbnail : ""}
                  label="Upload  Image"
                  show_image={true}
                  error={errors?.thumbnail || ""}
                  value={data?.thumbnail}
                  onChange={(file) => {
                    if (file) {
                      handleChange(file, "thumbnail");
                    }
                  }}
                />
              </div>
            </div>
            <div className={styles.lowerWrap}>
              <div className={"formFlex"}>
                <div className={"formGroup"}>
                  <TextField
                    error={errors?.title}
                    onChange={(e) => handleChange(e, "title")}
                    value={data?.title}
                    fullWidth={true}
                    name="title"
                    margin={"dense"}
                    variant={"outlined"}
                    label={"Title"}
                  />
                </div>
              </div>
              <div className={"formFlex"}>
                <div className={"formGroup"}>
                  <TextField
                    error={errors?.url}
                    onChange={(e) => handleChange(e, "url")}
                    value={data?.url}
                    fullWidth={true}
                    name="url"
                    margin={"dense"}
                    variant={"outlined"}
                    label={"URL"}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={"textCenter"}>
            <ButtonBase
              className={styles.removeBtn}
              // label={this.props.index == 0 ? "+" : '-'}
              onClick={() => {
                handlePress(index == 0 ? "-" : "-", index);
              }}
            >
              {index == 0 ? "" : "Remove"}
            </ButtonBase>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildrenIncludeFields;
