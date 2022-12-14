import React, { useState, useEffect, useRef } from 'react';
import './TrendingVideos.scss';
import { VideoCard } from '../VideoCard';
import axios from 'axios';
import { Typography, Stack, Grid, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { VideoDetails } from '../VideoDetails'

type PopularMovie = {
   backdrop_path: string;
   adult: boolean;
   id: number;
   title: string;
   original_language: string;
   original_title: string;
   overview: string;
   popularity: number;
   release_date: string;
   vote_average: number;
   vote_count: number;
};

type Props = {
   getSelected?: (id: number, type: string) => void;
   mediaType?: string;
};

export const TrendingVideos: React.FC<Props> = ({ getSelected, mediaType }) => {
   const [popularMovies, setPopularMovies] = useState<PopularMovie[] | []>([]);
   const [imageUrl, setImageUrl] = useState<string>('');
   const [imageSize, setImageSize] = useState<string[]>(['']);
   const [scrollPosition, setScrollPosition] = useState<number>(0);
   const [showBtnRight, setShowBtnRight] = useState<boolean>(true);
   const sliderRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      axios
         .get(`http://localhost:8080/tmdb/trending/${mediaType || 'movie'}`)
         .then((response) => {
            axios
               .get('http://localhost:8080/tmdb/configuration')
               .then((config) => {
                  setImageUrl(config.data.images.secure_base_url);
                  setImageSize(config.data.images.backdrop_sizes);
                  setPopularMovies(response.data.results);
               });
         })
         .catch((err) => {
            console.log('err:', err);
         });
   }, []);

   const handleSlideRight = () => {
      if (sliderRef.current) {
         let currentPosition = sliderRef.current.scrollLeft + 310;
         sliderRef.current.scrollLeft = currentPosition;
         setScrollPosition(currentPosition);
         const maxPosition =
            sliderRef.current.scrollWidth - sliderRef.current.clientWidth;

         if (currentPosition >= maxPosition) {
            setShowBtnRight(false);
         }
      }
   };

   const handleSlideLeft = () => {
      setShowBtnRight(true); //show btn right in case it was disabled
      if (sliderRef.current) {
         let currentPosition = sliderRef.current.scrollLeft - 310;
         sliderRef.current.scrollLeft = currentPosition;
         currentPosition < 0
            ? setScrollPosition(0)
            : setScrollPosition(currentPosition);
      }
   };

   return (
      <>
         <Typography variant='h4' component='h2' align='center' sx={{ pb: 1 }}>
            Currently Trending
         </Typography>
         <div className='outer-container'>
            {scrollPosition === 0 ? (
               <div className='slider-arrow-disabled'>
                  <IconButton onClick={handleSlideLeft}>
                     <ArrowBackIosIcon />
                  </IconButton>
               </div>
            ) : (
               <div className='slider-arrow'>
                  <IconButton onClick={handleSlideLeft}>
                     <ArrowBackIosIcon />
                  </IconButton>
               </div>
            )}
            <div className='slider-container'>
               <div id='slider' ref={sliderRef}>
                  {popularMovies.map((movie, index) => (
                     <div className='slider-card' key={index}>
                        <VideoCard
                           base_url={imageUrl}
                           backdrop_sizes={imageSize}
                           backdrop_path={movie.backdrop_path}
                           name={movie.title}
                           id={movie.id}
                           mediaType={mediaType || 'movie'}
                           getSelected={getSelected}
                        />
                     </div>
                  ))}
               </div>
            </div>
            {showBtnRight ? (
               <div className='slider-arrow'>
                  <IconButton onClick={handleSlideRight}>
                     <ArrowForwardIosIcon />
                  </IconButton>
               </div>
            ) : (
               <div className='slider-arrow-disabled'>
                  <IconButton onClick={handleSlideRight}>
                     <ArrowForwardIosIcon />
                  </IconButton>
               </div>
            )}
         </div>
      </>
   );
};
