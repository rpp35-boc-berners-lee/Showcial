import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Slider.scss';
import { BtnSlider } from './BtnSlider'
import { Card, Typography, CardMedia, CardContent, Container, CardHeader } from '@mui/material';
import { DetailModal } from '../../DetailModal/DetailModal';
import { platform } from 'os';
import ReactModal from 'react-modal';

type ChildProps = {
  vedios: any;
  config: any;
  userName: string;
  mediaType: string;
  inWatchList?: boolean,
  setInWatchList?: (bool: boolean) => void,
  updateWatchList?: () => void,
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
export const Slider: React.FC<ChildProps> = ({ vedios, config, userName, mediaType, inWatchList, setInWatchList, updateWatchList }) => {
  const [slideIndex, setSlideIndex] = useState(0)
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
    // When it's not the last slide, add index increase by 1
    if (slideIndex < vedios.length - 1) {
      setSlideIndex(slideIndex + 1)
    }
    else {
      // When it reached the last slide, go back to first slide
      setSlideIndex(0)
    }
  }

  const prevSlide = () => {
    if (slideIndex > 0) {
      setSlideIndex(slideIndex - 1)
    }
    else {
      setSlideIndex(vedios.length - 1)
    }
  }

  const moveDot = (index: number) => {
    setSlideIndex(index)
  }
  const closeModal = () => {
    setModalIsOpen(false);
  }
  const sliderOnClick = (id: number): void => {
    setModalIsOpen(true);
    getVideoDetail(id);
  }
  console.log('config', config)
  console.log('vedios: ', vedios)
  console.log('slideIndex: ', vedios[slideIndex].title);
  return (
    <div className="container-slider">
      {vedios.map((vedio: any, index: number) => {
        return (
          <div key={`slider-${vedio.id}-${mediaType}`}>
            <Card key={`slider-${vedio.id}-${mediaType}-card`} >
              <div className={slideIndex === index ? "slide active-anim" : "slide"}>
                <CardMedia
                component="img"
                image={`${config.images.base_url}${config.images.backdrop_sizes[2]}${vedio.backdrop_path}`}
                onClick={() => sliderOnClick(vedios[slideIndex].id)} />
              </div>
            </Card>

            {currentlySelected === undefined ? null :
            <DetailModal
              modalIsOpen={modalIsOpen}
              setModalIsOpen={setModalIsOpen}
              vedio={currentlySelected}
              image={`${config.images.base_url}${config.images.backdrop_sizes[2]}${vedios[slideIndex].backdrop_path}`}
              closeModal={closeModal}
              userName={userName}
              inWatchList={inWatchList}
              setInWatchList={setInWatchList}
              updateWatchList={updateWatchList}
            />
            }
          </div>
        )
      })}
      <BtnSlider moveSlide={nextSlide} direction={"next"} />
      <BtnSlider moveSlide={prevSlide} direction={"prev"} />
      <div className="container-footer">
        <h1 className='video-title'>
          {vedios[slideIndex].title}
        </h1>
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
    </div>
  )
}
