import React, { useState } from 'react';
import './Slider.scss';
import {BtnSlider} from './BtnSlider'


type ChildProps = {
  vedios: any;
  config: any;
}

export const Slider: React.FC<ChildProps> = ({ vedios, config }) => {
  console.log(vedios, 'in Slider');
  console.log(config, 'in Slider');
  const [slideIndex, setSlideIndex] = useState(1)

  const nextSlide = () => {
      if(slideIndex !== vedios.length){
          setSlideIndex(slideIndex + 1)
      }
      else if (slideIndex === vedios.length){
          setSlideIndex(1)
      }
  }

  const prevSlide = () => {
      if(slideIndex !== 1){
          setSlideIndex(slideIndex - 1)
      }
      else if (slideIndex === 1){
          setSlideIndex(vedios.length)
      }
  }

  const moveDot = (index: number) => {
      setSlideIndex(index)
  }

  return (

    <div className="container-slider">
      {vedios.map((vedio: any, index: number) => {
        return (
          <div
            key={vedio.id}
            className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
          >
            <img src={`${config.images.base_url}${config.images.backdrop_sizes[1]}${vedio.backdrop_path}`}/>
          </div>
        )
      })}
      <BtnSlider moveSlide={nextSlide} direction={"next"} />
      <BtnSlider moveSlide={prevSlide} direction={"prev"} />

      <div className="container-dots">
        {Array.from({ length: vedios.length}).map((item, index) => (
          <div
            onClick={() => moveDot(index + 1)}
            className={slideIndex === index + 1 ? "dot active" : "dot"}
          ></div>
        ))}
      </div>
    </div>
  )
}
