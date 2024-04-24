import { ButtonBase } from "@material-ui/core";
import useExhibitorDetail from "./ExhibitorDetail.hook";
import styles from "./Style.module.css";
import { ArrowBackIos } from "@material-ui/icons";
import historyUtils from "../../../../libs/history.utils";
import defaultCompany from "../../../../assets/img/defaultCompany.jpg";
import { removeUnderScore } from "../../../../helper/helper";
import { capitalizeFirstLetter } from "../../../../hooks/CapsLetter";
import DownloadSection from "./Componet/DownloadSection/DownloadSection";

const ExhibitorDetail = () => {
  const { detail } = useExhibitorDetail({});

  const businessNatureLength = detail?.details?.business_nature?.length - 1;
  const productGroup = detail?.details?.product_groups?.length - 1;
  const productCategory = detail?.details?.product_categories?.length - 1;
  const Product = detail?.details?.products?.length - 1;
  const ZoneTagData = detail?.details?.zone_tag?.length - 1;

  return (
    <div>
      <ButtonBase
        onClick={() => historyUtils.goBack()}
        style={{ marginBottom: "20px" }}
      >
        <ArrowBackIos fontSize={"small"} />{" "}
        <span>
          <span className={styles.title}>
            <b>Exhibitors Detail</b>
          </span>
        </span>
      </ButtonBase>

      <div className={styles.conatiner}>
        <div className={"plainPaper"}>
          <div className={styles.subContainer}>
            <div style={{ width: "150px", paddingTop: "20px" }}>
              {detail?.details?.company_logo ? (
                <img
                  src={detail?.details?.company_logo}
                  alt="loogo"
                  width={"120px"}
                />
              ) : (
                <div>
                  <img
                    alt="No Image Uploaded"
                    src={defaultCompany}
                    width={"120px"}
                  />
                </div>
              )}
            </div>
            <div className={styles.second}>
              <div>
                <div className={styles.headingDataType}>
                  <p className={styles.text}>Company Name:</p>
                  {detail?.details?.company_name
                    ? capitalizeFirstLetter(
                        removeUnderScore(detail?.details?.company_name)
                      )
                    : "--"}
                </div>
                <div className={styles.headingDataType}>
                  <p className={styles.text}>Brand Name:</p>
                  {detail?.details?.brand_name
                    ? capitalizeFirstLetter(detail?.details?.brand_name)
                    : "--"}
                </div>
                <div className={styles.headingDataType}>
                  <p className={styles.text}>Venue:</p>
                  {detail?.details?.event_venue
                    ? capitalizeFirstLetter(
                        removeUnderScore(detail?.details?.event_venue)
                      )
                    : "--"}
                  {""}
                </div>

                {/* <div className={styles.headingDataType}>
                  <p className={styles.text}>Zone:</p>
                  <div className={styles.wrappedContent}>
                    {detail?.details?.zone_tag?.length > 0
                      ? detail?.details?.zone_tag?.map((val, id) => (
                        <span>{removeUnderScore(val)}{ZoneTagData === id ? "" : ","}{""}{""}</span>
                      ))
                      : "--"}
                  </div>
                </div> */}
                <div className={styles.headingDataType}>
                  <p className={styles.text}>ZipCode:</p>
                  {""}
                  {detail?.details?.zip_code ? detail?.details?.zip_code : "--"}
                </div>
                <div className={styles.headingDataType}>
                  <p className={styles.text}>Product offered:</p>
                  {""}
                  {detail?.details?.product_offer
                    ? detail?.details?.product_offer
                    : "--"}
                </div>
                <div className={styles.headingDataType}>
                  <p className={styles.text}>Website:</p>
                  {detail?.details?.website ? (
                    <a
                      className={styles.linkDataText}
                      href={detail?.details?.website}
                      target="_blank"
                    >
                      {detail?.details?.website}
                    </a>
                  ) : (
                    "--"
                  )}
                </div>
                <div className={styles.headingDataType}>
                  <p className={styles.text}>Company contact:</p>
                  {""}
                  {detail?.details?.contact
                    ? `${detail?.details?.country_code} ${detail?.details?.contact}`
                    : "--"}
                </div>
                {/* <div className={styles.headingDataType}>
                  <p className={styles.text}>Pavallian:</p>
                  {""}
                  {detail?.details?.pavallian
                    ? detail?.details?.pavallian
                    : "--"}
                </div> */}
              </div>
              <div className={styles.flexGap2Row}>
                <div className={styles.headingDataType}>
                  <p className={styles.text}>Partner Type:</p>
                  {detail?.details?.partner_tag
                    ? capitalizeFirstLetter(
                        removeUnderScore(detail?.details?.partner_tag)
                      )
                    : "--"}
                </div>
                <div className={styles.headingDataType}>
                  <p className={styles.text}>Booth Number:</p>
                  {""}
                  {detail?.details?.event_stall
                    ? capitalizeFirstLetter(
                        removeUnderScore(detail?.details?.event_stall)
                      )
                    : "--"}
                </div>
                <div className={styles.headingDataType}>
                  <p className={styles.text}>Hall Number:</p>
                  {""}
                  {detail?.details?.hall?.hall_no
                    ? detail?.details?.hall?.hall_no
                    : "--"}{" "}
                  {detail?.details?.hall?.description
                    ? `(${detail?.details?.hall?.description})`
                    : ""}
                </div>
                {/* <div className={styles.headingDataType}>
                  <p className={styles.text}>Type Of Company:</p>
                  {""}
                  <div className={styles.wrappedField}>
                    {detail?.details?.business_nature?.length > 0
                      ? detail?.details?.business_nature?.map((val, id) => (
                        <span key={id} style={{marginLeft:"3px"}}>{removeUnderScore(val)}{businessNatureLength === id ? "" : ","}{""}{""}</span>
                      ))
                      : "--"}
                  </div>
                </div> */}
                <div className={styles.headingDataType}>
                  <p className={styles.text}>State:</p>
                  {""}
                  {detail?.details?.state
                    ? capitalizeFirstLetter(
                        removeUnderScore(detail?.details?.state)
                      )
                    : "--"}
                </div>
                <div className={styles.headingDataType}>
                  <p className={styles.text}>Country:</p>
                  {""}
                  {detail?.details?.country
                    ? capitalizeFirstLetter(
                        removeUnderScore(detail?.details?.country)
                      )
                    : "--"}
                </div>
                <div className={styles.headingDataType}>
                  <p className={styles.text}>Pavallian:</p>
                  {""}
                  {detail?.details?.pavallian
                    ? capitalizeFirstLetter(
                        removeUnderScore(detail?.details?.pavallian)
                      )
                    : "--"}
                </div>
                <div className={styles.headingDataType}>
                  <p className={styles.text}>Participant:</p>
                  {""}
                  {detail?.details?.is_participant ? "Yes" : "No"}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.productListing}>
            <div className={styles.headingDataType}>
              <p className={styles.text}>Product Categories:</p>
              <div className={styles.wrappedContent}>
                {detail?.details?.product_categories?.map((val, id) => (
                  <span>
                    {val?.name}
                    {productCategory === id ? "" : ","}
                    {""}
                    {""}
                  </span>
                ))}{" "}
              </div>
            </div>
            {/* <div className={styles.headingDataType}>
              <p className={styles.text}>Product:</p>
              <div className={styles.wrappedContent}>
                {detail?.details?.products?.length > 0
                  ? detail?.details?.products?.map((val, id) => (
                    <span key={id}>{val} {Product === id ? "" : ","}{""}{""}</span>
                  ))
                  : "--"}
              </div>
            </div> */}
          </div>
        </div>
        <div className={"plainPaper"}>
          <div style={{ marginBottom: "20px" }}>
            <b>Contact Details</b>
          </div>
          <div className={styles.second}>
            <div>
              <div className={styles.headingDataType}>
                <p className={styles.text}>Person Name:</p>
                {detail?.details?.company_perosn_name
                  ? capitalizeFirstLetter(detail?.details?.company_perosn_name)
                  : "--"}
              </div>
              <div className={styles.headingDataType}>
                <p className={styles.text}>Phone Number:</p>
                {detail?.details?.country_code
                  ? detail?.details?.country_code
                  : ""}{" "}
                {"  "}
                {detail?.details?.primary_conatct_number
                  ? detail?.details?.primary_conatct_number
                  : "--"}
              </div>

              <div className={styles.headingDataType}>
                <p className={styles.text}>Primary Email:</p>
                {detail?.details?.primary_email
                  ? detail?.details?.primary_email
                  : "--"}
              </div>
            </div>
            <div>
              <div className={styles.headingDataType}>
                <p className={styles.text}>Designation:</p>
                {detail?.details?.conatct_person_designation
                  ? capitalizeFirstLetter(
                      detail?.details?.conatct_person_designation
                    )
                  : "--"}
              </div>
              <div className={styles.headingDataType}>
                <p className={styles.text}>Alternate Numbers:</p>
                {detail?.details?.other_conatct_number
                  ? detail?.details?.other_conatct_number
                  : "--"}
              </div>
              <div className={styles.headingDataType}>
                <p className={styles.text}>Address:</p>
                {detail?.details?.company_address
                  ? detail?.details?.company_address
                  : "--"}
              </div>
              <div className={styles.headingDataType}>
                <p className={styles.text}>Secondary Email:</p>
                {detail?.details?.secondary_email
                  ? detail?.details?.secondary_email
                  : "--"}
              </div>
            </div>
          </div>
          {/* <div className={styles.headingDataType}>
            <p className={styles.text}>Instagram:</p>{" "}
            {detail?.details?.instagram_link ? (
              <a
                className={styles.linkDataText}
                href={detail?.details?.instagram_link}
                target="_blank"
              >
                {detail?.details?.instagram_link}
              </a>
            ) : (
              "--"
            )}
          </div>
          <div className={styles.headingDataType}>
            <p className={styles.text}>Facebook:</p>
            {detail?.details?.facebook_link ? (
              <a
                className={styles.linkDataText}
                href={detail?.details?.facebook_link}
                target="_blank"
              >
                {detail?.details?.facebook_link}
              </a>
            ) : (
              "--"
            )}
          </div>
          <div className={styles.headingDataType}>
            <p className={styles.text}>Twitter:</p>
            {detail?.details?.twitter_link ? (
              <a
                className={styles.linkDataText}
                href={detail?.details?.twitter_link}
                target="_blank"
              >
                {detail?.details?.twitter_link}
              </a>
            ) : (
              "--"
            )}
          </div>
          <div className={styles.headingDataType}>
            <p className={styles.text}>Youtube:</p>{" "}
            {detail?.details?.youtube_link ? (
              <a
                className={styles.linkDataText}
                href={detail?.details?.youtube_link}
                target="_blank"
              >
                {detail?.details?.youtube_link}
              </a>
            ) : (
              "--"
            )}
          </div>
          <div className={styles.headingDataType}>
            <p className={styles.text}>LinkedIn:</p>{" "}
            {detail?.details?.linkedin_link ? (
              <a
                className={styles.linkDataText}
                href={detail?.details?.linkedin_link}
                target="_blank"
              >
                {detail?.details?.linkedin_link}
              </a>
            ) : (
              "--"
            )}
          </div> */}
        </div>
        {detail?.details?.company_description && (
          <div className={"plainPaper"}>
            <div style={{ marginBottom: "20px" }}>
              <b>Company Details</b>
            </div>
            <div className={styles.thirdPaper}>
              <b>Description </b>
              <div>{detail?.details?.company_description}</div>
              {/* <b>Gallery Images</b> */}
            </div>
            {/* <div className={styles.wrappedContentImage}>
            {detail?.details?.gallery_images.length > 0 ? (
              detail?.details?.gallery_images?.map((val) => (
                <a href={val} target="_blank">
                  <img
                    src={val}
                    alt="images"
                    height={"100px"}
                    width={"100px"}
                  />
                </a>
              ))
            ) : (
              <span>No Image ..</span>
            )}
          </div>
          <div
            style={{
              marginBottom: "10px",
              marginTop: "10px",
              display: "flex",
              justifyContent: "flex-start",
              gap: "20px",
            }}
          >
            <b style={{ fontSize: "16px" }}>Company Brochure :</b>
            {detail?.details?.company_brochure ? (
              <a
                href={detail?.details?.company_brochure}
                target="_blank"
                style={{ fontWeight: "600", color: "blue" }}
              >
                <span>View Preview </span>
              </a>
            ) : (
              "N/A"
            )}
          </div>
          <div className={styles.lastBlock}>
            <div className={styles.headingDataType}>
              <p className={styles.text}>Created at:</p>
              {detail?.details?.createdAtText
                ? detail?.details?.createdAtText
                : "--"}
            </div>
            <div className={styles.headingDataType}>
              <p className={styles.text}>Status:</p>
              {detail?.details?.status ? detail?.details?.status : "--"}
            </div>
            <div className={styles.headingDataType}>
              <p className={styles.text}>Updated on:</p>
              {detail?.details?.updatedAtText
                ? detail?.details?.updatedAtText
                : "--"}
            </div>
          </div> */}
            <br />
          </div>
        )}
        <DownloadSection details={detail?.details?.downloads} />
      </div>
    </div>
  );
};

export default ExhibitorDetail;
