import React from "react";
import "./Slider.scss";
import leftArrow from "./icons/left-arrow.svg";
import rightArrow from "./icons/right-arrow.svg";

type ChildProps = {
  direction: String,
  moveSlide: any
}

export const BtnSlider: React.FC<ChildProps> = ({direction,  moveSlide}) => {
  // console.log(direction, moveSlide);
  return (
    <button
      onClick={moveSlide}
      className={direction === "next" ? "btn-slide next" : "btn-slide prev"}
    >
      <img src={direction === "next" ? rightArrow : leftArrow} />
    </button>
  );
}