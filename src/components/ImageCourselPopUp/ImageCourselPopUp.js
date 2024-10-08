import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@material-ui/core";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Style.module.css";
import Close from "../../assets/img/ic_close.png";
import {
  ArrowBack,
  ArrowBackIos,
  ArrowForward,
  ArrowForwardIos,
} from "@material-ui/icons";

const ImageCarouselPopUp = ({ open, handleClose, content }) => {
  const sliderRef = React.useRef(null);

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const goToNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const goToPrevious = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  return (
    <div className={styles.container}>
      <Dialog open={open} onClose={handleClose} aria-labelledby="dialog-title">
        <DialogTitle
          id="dialog-title"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <img src={Close} alt="Close" onClick={handleClose} />
        </DialogTitle>
        <DialogContent>
          <div style={{ position: "relative" }}>
            <Slider
              ref={sliderRef}
              {...settings}
              style={{
                width: "400px",
                height: "400px",
                overflowX: "hidden",
                overflowY: "hidden",
              }}
            >
              {content?.map((val, i) => (
                <div key={i}>
                  <img
                    src={val?.images || val}
                    alt="text-image"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>
              ))}
            </Slider>
            <IconButton
              className={styles.previousButton}
              onClick={goToPrevious}
              style={{
                position: "absolute",
                top: "50%",
                left: "-30px",
                transform: "translateY(-50%)",
              }}
            >
              {content?.length > 1 &&  <ArrowBackIos fontSize="small" />}
             
            </IconButton>
            <IconButton
              className={styles.nextButton}
              onClick={goToNext}
              style={{
                position: "absolute",
                top: "50%",
                right: "-30px",
                transform: "translateY(-50%)",
              }}
            >
              {content?.length > 1 && <ArrowForwardIos fontSize="small" />}
            </IconButton>
            
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageCarouselPopUp;
