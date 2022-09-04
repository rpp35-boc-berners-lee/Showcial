import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Slider.scss';
import { BtnSlider } from './BtnSlider'
import { Card } from '@mui/material';
import { DetailModal } from '../../DetailModal/DetailModal';
import { platform } from 'os';
import ReactModal from 'react-modal';

type ChildProps = {
  vedios: any;
  config: any;
  userName: string;
  mediaType: string;
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
export const Slider: React.FC<ChildProps> = ({ vedios, config, userName, mediaType }) => {
  // console.log(vedios, 'in Slider');
  // console.log(config, 'in Slider');
  const [slideIndex, setSlideIndex] = useState(1)
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentlySelected, setCurrentlySelected] = useState();


  const getVideoDetail = async (id: number) => {
    let videoDetail = await axios.get(`http://localhost:8080/tmdb/${mediaType}/${id}`);
    videoDetail.data.media_type = mediaType;
    videoDetail.data.watchProviders = await getWatchProviders(id);
    setCurrentlySelected(videoDetail.data);
  }

  const getWatchProviders = async (id: number) => {
    let watchProviders = await axios.get(`http://localhost:8080/tmdb/${mediaType}/${id}/watch/providers`);
    return watchProviders.data.results['US'];
  }

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
    // console.log('clicked close button, now modalIsOpen ', modalIsOpen);
  }
  const sliderOnClick = (id: number) => {
    setModalIsOpen(true);
    getVideoDetail(id);
  }

  // useEffect(() => {
  //   console.log('firing useEffect after modalIsOpen changed to', modalIsOpen)

  // }, [modalIsOpen])

  return (
    <div className="container-slider">
      {vedios.map((vedio: any, index: number) => {
        return (
          <div key={`slider-${vedio.id}-${mediaType}`}>
            <Card key={`slider-${vedio.id}-${mediaType}-card`} onClick={() => sliderOnClick(vedio.id)}>
              <div className={slideIndex === index + 1 ? "slide active-anim" : "slide"}>
                <p>{vedio.name}</p>
                <img src={`${config.images.base_url}${config.images.poster_sizes[6]}${vedio.poster_path}`} />
              </div>
            </Card>
            {currentlySelected === undefined ? null :
            <DetailModal
              modalIsOpen={modalIsOpen}
              setModalIsOpen={setModalIsOpen}
              vedio={currentlySelected}
              image={`${config.images.base_url}${config.images.poster_sizes[6]}${vedios[slideIndex - 1].poster_path}`}
              closeModal={closeModal}
              userName={userName}
            />
            }
          </div>
        )
      })}
      <BtnSlider moveSlide={nextSlide} direction={"next"} />
      <BtnSlider moveSlide={prevSlide} direction={"prev"} />

      <div className="container-dots">
        {Array.from({ length: vedios.length }).map((item, index) => (
          <div
            key={`dot-${index}`}
            onClick={() => moveDot(index + 1)}
            className={slideIndex === index + 1 ? "dot active" : "dot"}
          ></div>
        ))}
      </div>

    </div>
  )
}
