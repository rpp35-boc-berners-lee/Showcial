import React, { useState, useEffect } from 'react';
import './Slider.scss';
import { BtnSlider } from './BtnSlider'
import { Card } from '@mui/material';
import { DetailModal } from '../../DetailModal/DetailModal';
import { platform } from 'os';
import ReactModal from 'react-modal';

type ChildProps = {
  vedios: any;
  config: any;
  userName: string
}
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
export const Slider: React.FC<ChildProps> = ({ vedios, config, userName }) => {
  console.log(vedios, 'in Slider');
  console.log(config, 'in Slider');
  const [slideIndex, setSlideIndex] = useState(1)
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const nextSlide = () => {
    if (slideIndex !== vedios.length) {
      setSlideIndex(slideIndex + 1)
    }
    else if (slideIndex === vedios.length) {
      setSlideIndex(1)
    }
  }

  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1)
    }
    else if (slideIndex === 1) {
      setSlideIndex(vedios.length)
    }
  }

  const moveDot = (index: number) => {
    setSlideIndex(index)
  }
  const closeModal = () => {
    setModalIsOpen(false);
    console.log('clicked close button, now modalIsOpen ', modalIsOpen);
  }

  useEffect(() => {
    console.log('firing useEffect after modalIsOpen changed to', modalIsOpen)

  }, [modalIsOpen])


  return (
    <div className="container-slider">
      {vedios.map((vedio: any, index: number) => {
        return (
          <div>
            <Card onClick={() => setModalIsOpen(true)}>
              <div key={vedio.id} className={slideIndex === index + 1 ? "slide active-anim" : "slide"}>
                <p>{vedio.name}</p>
                <img src={`${config.images.base_url}${config.images.poster_sizes[6]}${vedio.poster_path}`} />
              </div>
            </Card>
            <DetailModal
              modalIsOpen={modalIsOpen}
              setModalIsOpen={setModalIsOpen}
              vedio={vedios[slideIndex - 1]}
              image={`${config.images.base_url}${config.images.poster_sizes[6]}${vedios[slideIndex - 1].poster_path}`}
              closeModal={closeModal}
              userName={userName}
            />
          </div>
        )
      })}
      <BtnSlider moveSlide={nextSlide} direction={"next"} />
      <BtnSlider moveSlide={prevSlide} direction={"prev"} />

      <div className="container-dots">
        {Array.from({ length: vedios.length }).map((item, index) => (
          <div
            onClick={() => moveDot(index + 1)}
            className={slideIndex === index + 1 ? "dot active" : "dot"}
          ></div>
        ))}
      </div>

    </div>
  )
}
