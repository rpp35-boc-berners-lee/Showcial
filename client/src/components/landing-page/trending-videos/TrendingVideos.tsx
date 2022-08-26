import React, { useState, useEffect } from 'react';
import './TrendingVideos.scss';
import { TrendingVideoItem } from './trending-video-item/TrendingVideoItem';
import axios from 'axios';
import { Typography, Stack, Grid, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

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

export const TrendingVideos = () => {
   const [popularMovies, setPopularMovies] = useState<PopularMovie[] | []>([]);
   const [imageUrl, setImageUrl] = useState<string>('');
   const [imageSize, setImageSize] = useState<string>('');
   const [currentIndex, setCurrentIndex] = useState<number>(0);
   const [activeMovies, setActiveMovies] = useState<PopularMovie[] | []>([]);
   useEffect(() => {
      axios
         .get('http://localhost:8080/tmdb/movie/popular')
         .then((response) => {
            axios
               .get('http://localhost:8080/tmdb/configuration')
               .then((config) => {
                  setImageUrl(config.data.images.secure_base_url);
                  setImageSize(config.data.images.backdrop_sizes[0]);
                  setPopularMovies(response.data.results);
                  setActiveMovies(response.data.results.slice(0, 3));
               });
         })
         .catch((err) => {
            console.log('err:', err);
         });
   }, []);

   const handleSlideRight = () => {
      let updatedIndex = currentIndex - 1;
      setCurrentIndex(updatedIndex);
      let currentMovies: any;
      if (updatedIndex === popularMovies.length - 2) {
         currentMovies = popularMovies
            .slice(updatedIndex, updatedIndex + 2)
            .concat(popularMovies.slice(0, 1));
      } else if (updatedIndex === -1) {
         updatedIndex = popularMovies.length - 1;
         currentMovies = popularMovies
            .slice(updatedIndex, popularMovies.length)
            .concat(popularMovies.slice(0, 2));
      } else if (updatedIndex === popularMovies.length - 1) {
         currentMovies = popularMovies

            .slice(updatedIndex, popularMovies.length)
            .concat(popularMovies.slice(0, 2));
      } else {
         currentMovies = popularMovies.slice(updatedIndex, updatedIndex + 3);
      }
      setCurrentIndex(updatedIndex);
      setActiveMovies(currentMovies);
   };

   const handleSlideLeft = () => {
      let updatedIndex = currentIndex + 1;
      if (updatedIndex >= popularMovies.length) {
         updatedIndex = 0;
      }
      setCurrentIndex(updatedIndex);
      let currentMovies: any;

      if (popularMovies.length - 1 === updatedIndex) {
         currentMovies = popularMovies
            .slice(updatedIndex, updatedIndex + 1)
            .concat(popularMovies.slice(0, 2));
      } else if (popularMovies.length - 2 === updatedIndex) {
         currentMovies = popularMovies
            .slice(updatedIndex, updatedIndex + 2)
            .concat(popularMovies.slice(0, 1));
      } else {
         currentMovies = popularMovies.slice(updatedIndex, updatedIndex + 3);
      }

      setActiveMovies(currentMovies);
   };

   if (popularMovies.length > 0) {
      return (
         <>
            <Stack direction='column' sx={{ height: '100%', width: '100%' }}>
               <Typography variant='h4' component='h2'>
                  Currently Trending
               </Typography>
               <div className='trending-videos-container'>
                  <IconButton onClick={handleSlideLeft}>
                     <ArrowBackIosIcon />
                  </IconButton>
                  <Grid
                     wrap='wrap'
                     direction='row'
                     container
                     gap='1rem'
                     justifyContent='space-around'
                     rowSpacing={2}
                     sx={{ overflow: 'hidden', height: '260px', width: '100%' }}
                     columns={{ xs: 4, sm: 4, md: 12 }}
                  >
                     {activeMovies.map((movie, index) => (
                        <TrendingVideoItem
                           itemIndex={index}
                           currentIndex={currentIndex}
                           key={movie.id}
                           image={movie.backdrop_path}
                           title={movie.title}
                           imageUrl={imageUrl}
                           imageSize={imageSize}
                           totalArrayLength={popularMovies.length}
                        />
                     ))}
                  </Grid>
                  <IconButton onClick={handleSlideRight}>
                     <ArrowForwardIosIcon />
                  </IconButton>
               </div>
            </Stack>
         </>
      );
   } else {
      return null;
   }
};
