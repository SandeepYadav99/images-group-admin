import React from "react";
import history from "../../../libs/history.utils";
import { ButtonBase, CircularProgress, MenuItem } from "@material-ui/core";
import styles from "./Style.module.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import useEventCreate from "./EventCreate.hook";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import CustomDatePicker from "../../../components/FormFields/DatePicker/CustomDatePicker";
import File from "../../../components/FileComponent/FileComponent.component";
import CustomCheckbox from "../../../components/FormFields/CustomCheckbox";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { useSelector } from "react-redux";
import CustomSwitch from "../../../components/FormFields/CustomSwitch";

function EventCreate() {
  const {
    form,
    errorData,
    listData,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isSubmitting,
    changeFeatureData,
    feature,
    select,
    setSelect,
    id,
    logo,
    thumb,
    linkBanner,
    appBanner,
    appBgBanner,
  } = useEventCreate({});

  const { role } = useSelector((state) => state.auth);

  return (
    <div className={styles.claimListWrapper}>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />
            <span className={"capitalize"}>
              <b> {id ? "Update" : "Create"} Event</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Event Details</div>
          </h4>
        </div>
        <div className={styles.nameWrapper}>
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <CustomTextField
                isError={errorData?.name}
                errorText={errorData?.name}
                label={"Event Title"}
                value={form?.name}
                onTextChange={(text) => {
                  changeTextData(text, "name");
                }}
                onBlur={() => {
                  onBlurHandler("name");
                }}
              />
            </div>
          </div>
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <CustomTextField
                disabled={true}
                isError={errorData?.slug}
                errorText={errorData?.slug}
                label={"Event Slug"}
                value={form?.slug}
                onTextChange={(text) => {
                  changeTextData(text, "slug");
                }}
                onBlur={() => {
                  onBlurHandler("slug");
                }}
              />
            </div>
          </div>
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <CustomTextField
                isError={errorData?.project_id}
                errorText={errorData?.project_id}
                label={"Premagic Project ID"}
                value={form?.project_id}
                onTextChange={(text) => {
                  changeTextData(text, "project_id");
                }}
                onBlur={() => {
                  onBlurHandler("project_id");
                }}
              />
            </div>
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomDatePicker
              clearable
              label={"Start Date"}
              // maxDate={new Date()}
              onChange={(date) => {
                changeTextData(date, "start_date");
              }}
              value={form?.start_date}
              isError={errorData?.start_date}
            />
          </div>
          <div className={"formGroup"}>
            <CustomDatePicker
              clearable
              label={"End Date"}
              onChange={(date) => {
                changeTextData(date, "end_date");
              }}
              value={form?.end_date}
              isError={errorData?.end_date}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.location}
              errorText={errorData?.location}
              label={"Location"}
              value={form?.location}
              onTextChange={(text) => {
                changeTextData(text, "location");
              }}
              onBlur={() => {
                onBlurHandler("location");
              }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.url}
              errorText={errorData?.url}
              label={"Event URL"}
              value={form?.url}
              onTextChange={(text) => {
                changeTextData(text, "url");
              }}
              onBlur={() => {
                onBlurHandler("url");
              }}
            />
          </div>

          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.registration_url}
              errorText={errorData?.registration_url}
              label={"Event Registration URL"}
              value={form?.registration_url}
              onTextChange={(text) => {
                changeTextData(text, "registration_url");
              }}
              onBlur={() => {
                onBlurHandler("registration_url");
              }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomSelectField
              isError={errorData?.registration_status}
              errorText={errorData?.registration_status}
              label={"Registration Status"}
              value={form?.registration_status}
              handleChange={(value) => {
                changeTextData(value, "registration_status");
              }}
            >
              <MenuItem value="YES">YES</MenuItem>
              <MenuItem value="NO">NO</MenuItem>
            </CustomSelectField>
          </div>
          <div className={"formGroup"}>
            <CustomSelectField
              isError={errorData?.is_digital}
              errorText={errorData?.is_digital}
              label={"Is Event Digital?"}
              value={form?.is_digital}
              handleChange={(value) => {
                changeTextData(value, "is_digital");
              }}
            >
              <MenuItem value="YES">YES</MenuItem>
              <MenuItem value="NO">NO</MenuItem>
            </CustomSelectField>
          </div>
        </div>
        <div className={"formFlex"}></div>
        <div className={"formGroup"}>
          <CustomTextField
            isError={errorData?.event_prefix}
            errorText={errorData?.event_prefix}
            label={"RegID Prefix"}
            value={form?.event_prefix}
            onTextChange={(text) => {
              changeTextData(text, "event_prefix");
            }}
            onBlur={() => {
              onBlurHandler("event_prefix");
            }}
          />
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.description}
              errorText={errorData?.description}
              label={"About Event"}
              value={form?.description}
              onTextChange={(text) => {
                changeTextData(text, "description");
              }}
              onBlur={() => {
                onBlurHandler("description");
              }}
              multiline
              rows={3}
            />
          </div>
        </div>

        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <File
              max_size={10 * 1024 * 1024}
              type={["jpeg", "jpg", "png"]}
              fullWidth={true}
              name="od1"
              label="Upload Event Banner Image"
              accept={"application/pdf,application/msword,image/*"}
              error={errorData?.banner}
              value={form?.banner}
              placeholder={"Upload Event Banner Image"}
              onChange={(file) => {
                if (file) {
                  changeTextData(file, "banner");
                }
              }}
            />
            <div className={styles.inst}>
              <InfoOutlinedIcon />
              Recommended Size for banner image is 1600x900 px
            </div>
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={styles.adharBack}>
            <div className={styles.adharWrap}>
              <File
                bannerLabel="Top partner logo"
                default_image={logo ? logo : ""}
                // imageClass={styles.inputFileUploader}
                max_size={5 * 1024 * 1024}
                type={["png", "jpeg", "jpg"]}
                fullWidth={true}
                name="document"
                accept={"image/*"}
                label="Please Upload Image"
                show_image={true}
                error={errorData?.logo}
                value={form?.logo}
                onChange={(file) => {
                  if (file) {
                    changeTextData(file, "logo");
                  }
                }}
              />
              {/* <div>Upload Event Logo</div> */}
            </div>
            {/* <div className={styles.adharWrap}>
              <File
                bannerLabel="Upload Thumbnail"
                default_image={thumb ? thumb : ""}
                // imageClass={styles.inputFileUploader}
                max_size={5 * 1024 * 1024}
                type={["png", "jpeg", "jpg", "gif"]}
                fullWidth={true}
                name="document"
                accept={"image/*"}
                label="Aadhar Back"
                show_image={true}
                error={errorData?.thumbnail}
                value={form?.thumbnail}
                onChange={(file) => {
                  if (file) {
                    changeTextData(file, "thumbnail");
                  }
                }}
              />
            </div> */}
          </div>
        </div>
        <div className={styles.inst}>
          <InfoOutlinedIcon />
          Recommended size for partner logo is 150 x 150
        </div>
        {/* <div className={"formFlex"}> */}
        {/* <div className={styles.adharBack}> */}
        {/* <div className={styles.adharWrap}>
              <File
                bannerLabel="Login Banner Image"
                default_image={logo ? logo : ""}
                // imageClass={styles.inputFileUploader}
                max_size={5 * 1024 * 1024}
                type={["png", "jpeg", "jpg"]}
                fullWidth={true}
                name="document"
                accept={"image/*"}
                label="Please Upload Image"
                show_image={true}
                error={errorData?.banner_image}
                value={form?.banner_image}
                onChange={(file) => {
                  if (file) {
                    changeTextData(file, "banner_image");
                  }
                }}
              />
            </div> */}
        {/* </div> */}
        {/* </div> */}
      </div>
      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>App Banner</div>
          </h4>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <File
              max_size={10 * 1024 * 1024}
              type={["jpeg", "jpg", "png"]}
              fullWidth={true}
              name="login_banner"
              label="Login Screen Image"
              accept={"application/pdf,application/msword,image/*"}
              error={errorData?.login_banner}
              value={form?.login_banner}
              placeholder={"Login Screen Image"}
              onChange={(file) => {
                if (file) {
                  changeTextData(file, "login_banner");
                }
              }}
              link={form?.login_banner ? "" : appBanner}
            />
            <div className={styles.inst}>
              <InfoOutlinedIcon />
              Recommended Size for banner image is 1080x960 px.
            </div>
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <File
              max_size={10 * 1024 * 1024}
              type={["jpeg", "jpg", "png"]}
              fullWidth={true}
              name="background_image"
              label="Background Image Banner"
              accept={"application/pdf,application/msword,image/*"}
              error={errorData?.background_image}
              value={form?.background_image}
              placeholder={"Background Image Banner"}
              onChange={(file) => {
                if (file) {
                  changeTextData(file, "background_image");
                }
              }}
              link={form?.background_image ? "" : appBgBanner}
            />
            <div className={styles.inst}>
              <InfoOutlinedIcon />
              Recommended Size for banner image is 1600x900 px.
            </div>
          </div>
        </div>
      </div>
      <div className={"plainPaper"}>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <div className={"heading"}>
              <b> Add connect on section </b>{" "}
            </div>
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.youtube_link}
              errorText={errorData?.youtube_link}
              label={"Social Media youtube"}
              value={form?.youtube_link}
              onTextChange={(text) => {
                changeTextData(text, "youtube_link");
              }}
              onBlur={() => {
                onBlurHandler("youtube_link");
              }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.instagram_link}
              errorText={errorData?.instagram_link}
              label={"Social Media Instagram"}
              value={form?.instagram_link}
              onTextChange={(text) => {
                changeTextData(text, "instagram_link");
              }}
              onBlur={() => {
                onBlurHandler("instagram_link");
              }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.facebook_link}
              errorText={errorData?.facebook_link}
              label={"Social Media Facebook"}
              value={form?.facebook_link}
              onTextChange={(text) => {
                changeTextData(text, "facebook_link");
              }}
              onBlur={() => {
                onBlurHandler("facebook_link");
              }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.linkedin_link}
              errorText={errorData?.linkedin_link}
              label={"Social Media Linkedin"}
              value={form?.linkedin_link}
              onTextChange={(text) => {
                changeTextData(text, "linkedin_link");
              }}
              onBlur={() => {
                onBlurHandler("linkedin_link");
              }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.twitter_link}
              errorText={errorData?.twitter_link}
              label={"Social Media Twitter"}
              value={form?.twitter_link}
              onTextChange={(text) => {
                changeTextData(text, "twitter_link");
              }}
              onBlur={() => {
                onBlurHandler("twitter_link");
              }}
            />
          </div>
          <div className={"formGroup"}></div>
        </div>
      </div>
      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Linkedin Popup</div>
          </h4>
        </div>
        <div className={"formGroup"}>
          <File
            max_size={5 * 1024 * 1024}
            type={["jpeg", "jpg", "png"]}
            fullWidth={true}
            name="linkedin_image"
            label="Upload Banner for LinkedIn "
            accept={"application/pdf,application/msword,image/*"}
            error={errorData?.linkedin_image}
            value={form?.linkedin_image}
            placeholder={"Upload Banner for LinkedIn"}
            onChange={(file) => {
              if (file) {
                changeTextData(file, "linkedin_image");
              }
            }}
            link={form?.linkedin_image ? "" : linkBanner}
          />
          <div className={styles.inst}>
            <InfoOutlinedIcon />
            Recommended Size for banner image is 1200x628 px and size upto 5mb .
          </div>
        </div>
        <div className={"formGroup"}>
          <CustomTextField
            isError={errorData?.linkedin_content}
            errorText={errorData?.linkedin_content}
            label={"LinkedIn Content"}
            value={form?.linkedin_content}
            onTextChange={(text) => {
              changeTextData(text, "linkedin_content");
            }}
            onBlur={() => {
              onBlurHandler("linkedin_content");
            }}
            multiline
            rows={3}
          />
        </div>
        <div className={"formGroup"}>
          <CustomSwitch
            value={form?.show_linkedin}
            handleChange={() => {
              changeTextData(!form?.show_linkedin, "show_linkedin");
            }}
            label={`Show linkedin`}
          />
        </div>
      </div>
      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Event Theme</div>
          </h4>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.primary_colour}
              errorText={errorData?.primary_colour}
              label={"Primary Color"}
              value={form?.primary_colour}
              onTextChange={(text) => {
                changeTextData(text, "primary_colour");
              }}
              onBlur={() => {
                onBlurHandler("primary_colour");
              }}
              InputLabelProps={{ shrink: true }}
            />
          </div>

          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.secondary_colour}
              errorText={errorData?.secondary_colour}
              label={"Secondary Color"}
              value={form?.secondary_colour}
              onTextChange={(text) => {
                changeTextData(text, "secondary_colour");
              }}
              onBlur={() => {
                onBlurHandler("secondary_colour");
              }}
              InputLabelProps={{ shrink: true }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.action_colour}
              errorText={errorData?.action_colour}
              label={"Action Color"}
              value={form?.action_colour}
              onTextChange={(text) => {
                changeTextData(text, "action_colour");
              }}
              onBlur={() => {
                onBlurHandler("action_colour");
              }}
              InputLabelProps={{ shrink: true }}
            />
          </div>

          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.menu_text_colour}
              errorText={errorData?.menu_text_colour}
              label={"Menu Text Color"}
              value={form?.menu_text_colour}
              onTextChange={(text) => {
                changeTextData(text, "menu_text_colour");
              }}
              onBlur={() => {
                onBlurHandler("menu_text_colour");
              }}
              InputLabelProps={{ shrink: true }}
            />
          </div>
        </div>

        {/*  */}
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.primary_button_bg_color}
              errorText={errorData?.primary_button_bg_color}
              label={"Primary Button bg color"}
              value={form?.primary_button_bg_color}
              onTextChange={(text) => {
                changeTextData(text, "primary_button_bg_color");
              }}
              onBlur={() => {
                onBlurHandler("primary_button_bg_color");
              }}
              InputLabelProps={{ shrink: true }}
            />
          </div>

          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.primary_button_text_color}
              errorText={errorData?.primary_button_text_color}
              label={"Primary Button text Color"}
              value={form?.primary_button_text_color}
              onTextChange={(text) => {
                changeTextData(text, "primary_button_text_color");
              }}
              onBlur={() => {
                onBlurHandler("primary_button_text_color");
              }}
              InputLabelProps={{ shrink: true }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.Secondary_button_bg_color}
              errorText={errorData?.Secondary_button_bg_color}
              label={"Secondary Button bg color"}
              value={form?.Secondary_button_bg_color}
              onTextChange={(text) => {
                changeTextData(text, "Secondary_button_bg_color");
              }}
              onBlur={() => {
                onBlurHandler("Secondary_button_bg_color");
              }}
              InputLabelProps={{ shrink: true }}
            />
          </div>

          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.Secondary_button_text_color}
              errorText={errorData?.Secondary_button_text_color}
              label={"Secondary Button text Color"}
              value={form?.Secondary_button_text_color}
              onTextChange={(text) => {
                changeTextData(text, "Secondary_button_text_color");
              }}
              onBlur={() => {
                onBlurHandler("Secondary_button_text_color");
              }}
              InputLabelProps={{ shrink: true }}
            />
          </div>
        </div>
      </div>
      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Event Feature</div>
          </h4>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomCheckbox
              color={"primary"}
              label={"Event Participants"}
              checked={feature?.event_participants}
            />
          </div>
          <div className={"formGroup"}>
            <CustomCheckbox
              color={"primary"}
              // handleChange={(text) => {
              //   changeFeatureData(!feature?.event_schedule, "event_schedule");
              // }}
              label={"Event Schedule"}
              checked={feature?.event_schedule}
            />
          </div>
          <div className={"formGroup"}>
            <CustomCheckbox
              color={"primary"}
              // handleChange={(text) => {
              //   changeFeatureData(!feature?.about_event, "about_event");
              // }}
              label={"About Event"}
              checked={feature?.about_event}
            />
          </div>
          <div className={"formGroup"}>
            <CustomCheckbox
              color={"primary"}
              handleChange={(text) => {
                changeFeatureData(
                  !feature?.event_organizing_committee,
                  "event_organizing_committee"
                );
              }}
              label={"Event Organizing Committee"}
              checked={feature?.event_organizing_committee}
            />
          </div>
          <div className={"formGroup"}>
            <CustomCheckbox
              color={"primary"}
              handleChange={(text) => {
                changeFeatureData(!feature?.event_speakers, "event_speakers");
              }}
              label={"Event Speakers"}
              checked={feature?.event_speakers}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomCheckbox
              color={"primary"}
              handleChange={(text) => {
                changeFeatureData(!feature?.event_gallery, "event_gallery");
              }}
              label={"Event Gallery"}
              checked={feature?.event_gallery}
            />
          </div>
          <div className={"formGroup"}>
            <CustomCheckbox
              color={"primary"}
              handleChange={(text) => {
                changeFeatureData(!feature?.analytics, "analytics");
              }}
              label={"Analytics"}
              checked={feature?.analytics}
            />
          </div>
          <div className={"formGroup"}>
            <CustomCheckbox
              color={"primary"}
              handleChange={(text) => {
                changeFeatureData(!feature?.help_desk, "help_desk");
              }}
              label={"Help Desk"}
              checked={feature?.help_desk}
            />
          </div>
          <div className={"formGroup"}>
            <CustomCheckbox
              color={"primary"}
              handleChange={(text) => {
                changeFeatureData(!feature?.poll, "poll");
              }}
              label={"Poll"}
              checked={feature?.poll}
            />
          </div>
          <div className={"formGroup"}>
            <CustomCheckbox
              color={"primary"}
              handleChange={(text) => {
                changeFeatureData(!feature?.surveys, "surveys");
              }}
              label={"Surveys"}
              checked={feature?.surveys}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomCheckbox
              color={"primary"}
              handleChange={(text) => {
                changeFeatureData(!feature?.sponsors, "sponsors");
              }}
              label={"Sponsors"}
              checked={feature?.sponsors}
            />
          </div>
          <div className={"formGroup"}>
            <CustomCheckbox
              color={"primary"}
              handleChange={(text) => {
                changeFeatureData(!feature?.city_guide, "city_guide");
              }}
              label={"Venue Guide"}
              checked={feature?.city_guide}
            />
          </div>
          <div className={"formGroup"}>
            <CustomCheckbox
              color={"primary"}
              // handleChange={(text) => {
              //   changeFeatureData(!feature?.event_feed, "event_feed");
              // }}
              label={"Event Feed"}
              checked={feature?.event_feed}
            />
          </div>
          <div className={"formGroup"}>
            <CustomCheckbox
              color={"primary"}
              // handleChange={(text) => {
              //   changeFeatureData(!feature?.profile, "profile");
              // }}
              label={"Profile"}
              checked={feature?.profile}
            />
          </div>
          <div className={"formGroup"}>
            <CustomCheckbox
              color={"primary"}
              // handleChange={(text) => {
              //   changeFeatureData(!feature?.networking, "networking");
              // }}
              label={"Networking"}
              checked={feature?.networking}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomCheckbox
              // disabled={true}
              color={"primary"}
              handleChange={(text) => {
                changeFeatureData(!feature?.feedback, "feedback");
              }}
              label={"Feedback"}
              checked={feature?.feedback}
            />
          </div>
          <div className={"formGroup"}>
            <CustomCheckbox
              // disabled={true}
              color={"primary"}
              handleChange={(text) => {
                changeFeatureData(!feature?.event_banner, "event_banner");
              }}
              label={"Event Banner"}
              checked={feature?.event_banner}
            />
          </div>
          <div className={"formGroup"}>
            <CustomCheckbox
              // disabled={true}
              color={"primary"}
              handleChange={(text) => {
                changeFeatureData(!feature?.youtube_live, "youtube_live");
              }}
              label={"YouTube Live"}
              checked={feature?.youtube_live}
            />
          </div>
          <div className={"formGroup"}>
            <CustomCheckbox
              // disabled={true}
              color={"primary"}
              handleChange={(text) => {
                changeFeatureData(
                  !feature?.information_center,
                  "information_center"
                );
              }}
              label={"Information Center"}
              checked={feature?.information_center}
            />
          </div>
          <div className={"formGroup"}>
            <CustomCheckbox
              // disabled={true}
              color={"primary"}
              handleChange={(text) => {
                changeFeatureData(!feature?.exhibitor, "exhibitor");
              }}
              label={"Exhibitor"}
              checked={feature?.exhibitor}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomCheckbox
              color={"primary"}
              handleChange={(text) => {
                changeFeatureData(!feature?.testimonial, "testimonial");
              }}
              label={"testimonial"}
              checked={feature?.testimonial}
            />
          </div>
          <div className={"formGroup"}>
            <CustomCheckbox
              color={"primary"}
              handleChange={(text) => {
                changeFeatureData(!feature?.manu_graphic, "manu_graphic");
              }}
              label={"Menu Graphic"}
              checked={feature?.manu_graphic}
            />
          </div>
          <div className={"formGroup"}>
            <CustomCheckbox
              color={"primary"}
              handleChange={(text) => {
                changeFeatureData(!feature?.sponsor_video, "sponsor_video");
              }}
              label={"Sponsor Video"}
              checked={feature?.sponsor_video}
            />
          </div>
          <div className={"formGroup"}>
            <CustomCheckbox
              color={"primary"}
              handleChange={(text) => {
                changeFeatureData(
                  !feature?.event_highlights,
                  "event_highlights"
                );
              }}
              label={"Event HighLights"}
              checked={feature?.event_highlights}
            />
          </div>
          <div className={"formGroup"}>
            <CustomCheckbox
              color={"primary"}
              handleChange={(text) => {
                changeFeatureData(!feature?.meeting_rooms, "meeting_rooms");
              }}
              label={"Meeting Rooms"}
              checked={feature?.meeting_rooms}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomCheckbox
              color={"primary"}
              handleChange={(text) => {
                changeFeatureData(!feature?.award, "award");
              }}
              label={"Awards"}
              checked={feature?.award}
            />
          </div>
          <div className={"formGroup"}>
            <CustomCheckbox
              color={"primary"}
              handleChange={(text) => {
                changeFeatureData(
                  !feature?.meeting_calendar,
                  "meeting_calendar"
                );
              }}
              label={"Meeting Calendar"}
              checked={feature?.meeting_calendar}
            />
          </div>
          {/* <div style={{ marginLeft: "35px" }}>
            <CustomCheckbox
              color={"primary"}
              handleChange={(text) => {
                changeFeatureData(!feature?.event_calendar, "event_calendar");
              }}
              label={"Event Calendar"}
              checked={feature?.event_calendar}
            />
          </div> */}
          <div className={"formGroup"}>
            <CustomCheckbox
              color={"primary"}
              handleChange={(text) => {
                changeFeatureData(
                  !feature?.privilaged_member,
                  "privilaged_member"
                );
              }}
              label={"Privilege Members"}
              checked={feature?.privilaged_member}
            />
          </div>
          <div className={"formGroup"}>
            <CustomCheckbox
              color={"primary"}
              handleChange={(text) => {
                changeFeatureData(!feature?.exhibitor_query, "exhibitor_query");
              }}
              label={"Exhibitor Query"}
              checked={feature?.exhibitor_query}
            />
          </div>
          <div className={"formGroup"}>
            <CustomCheckbox
              color={"primary"}
              handleChange={(text) => {
                changeFeatureData(!feature?.event_calendar, "event_calendar");
              }}
              label={"Event Calendar"}
              checked={feature?.event_calendar}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomCheckbox
              color={"primary"}
              handleChange={(text) => {
                // changeFeatureData(!feature?.custom_participant, "custom_participant");
              }}
              label={"Custom Participant Events"}
              checked={feature?.custom_participant}
            />
          </div>
          <div className={"formGroup"}>
            <CustomCheckbox
              color={"primary"}
              handleChange={(text) => {
                // changeFeatureData(!feature?.hall_master, "hall_master");
              }}
              label={"Hall Master"}
              checked={feature?.hall_master}
            />
          </div>
          <div className={"formGroup"}></div>
          <div className={"formGroup"}></div>
          <div className={"formGroup"}></div>
        </div>
      </div>

      <div className={"plainPaper"}>
        {id ? (
          <>
            {form?.status !== "INDRAFT" ? (
              <div className={styles.btnWrappepr}>
                <ButtonBase
                  disabled={isSubmitting ? true : false}
                  type={"button"}
                  className={styles.createBtn}
                  onClick={() => handleSubmit()}
                >
                  {isSubmitting ? (
                    <CircularProgress color="success" size="20px" />
                  ) : (
                    "UPDATE"
                  )}
                </ButtonBase>
              </div>
            ) : (
              <div className={styles.btnWrappepr}>
                <div className={styles.actionButton}>
                  <ButtonBase
                    type={"button"}
                    className={styles.createBtn}
                    onClick={() => handleSubmit("PENDING")}
                  >
                    {isSubmitting ? (
                      <CircularProgress color="success" size="20px" />
                    ) : (
                      "Add "
                    )}
                  </ButtonBase>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className={styles.btnWrappepr}>
            <div className={styles.actionButton}>
              <ButtonBase
                // disabled={isSubmitting ? true : false}
                type={"button"}
                className={styles.createBtn}
                onClick={() => handleSubmit("UPCOMING")}
              >
                {isSubmitting ? (
                  <CircularProgress color="success" size="20px" />
                ) : (
                  "Add "
                )}
              </ButtonBase>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventCreate;
