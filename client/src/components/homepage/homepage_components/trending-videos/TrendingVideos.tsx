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

export const TrendingOrRecommendedVideos = ({mediaType, trendingOrRecommended}: {mediaType: string; trendingOrRecommended: string}) => {
   const [popularMovies, setPopularMovies] = useState<PopularMovie[] | []>([]);
   const [imageUrl, setImageUrl] = useState<string>('');
   const [imageSize, setImageSize] = useState<string[]>(['']);
   const [currentIndex, setCurrentIndex] = useState<number>(0);
   const [activeMovies, setActiveMovies] = useState<PopularMovie[] | []>([]);
   useEffect(() => {
      let url = trendingOrRecommended === 'trending'? `http://localhost:8080/tmdb/${mediaType}/popular` : 
      axios
         .get(`http://localhost:8080/tmdb/${mediaType}/popular`)
         .then((response) => {
            axios
               .get('http://localhost:8080/tmdb/configuration')
               .then((config) => {
                  setImageUrl(config.data.images.secure_base_url);
                  setImageSize(config.data.images.backdrop_sizes);
                  setPopularMovies(response.data.results);
                  setActiveMovies(response.data.results.slice(0, 6));
               });
         })
         .catch((err) => {
            console.log('err:', err);
         });
   }, [mediaType]);

   const handleSlideRight = () => {
      console.log('currentIndex:', currentIndex);
      let updatedIndex = currentIndex - 1;
      let currentMovies: any;
      if (updatedIndex === -1) {
         currentMovies = popularMovies
            .slice(updatedIndex)
            .concat(popularMovies.slice(0, 7 + updatedIndex));
         updatedIndex = popularMovies.length - 1;
      } else if (updatedIndex >= popularMovies.length - 6) {
         currentMovies = popularMovies
            .slice(updatedIndex, popularMovies.length)
            .concat(
               popularMovies.slice(0, 7 - (popularMovies.length - updatedIndex))
            );
      } else {
         currentMovies = popularMovies.slice(updatedIndex, updatedIndex + 7);
      }
      setCurrentIndex(updatedIndex);
      setActiveMovies(currentMovies);
   };

   const handleSlideLeft = () => {
      let updatedIndex = currentIndex + 1;

      if (updatedIndex >= popularMovies.length) {
         updatedIndex = 0;
      }

      let currentMovies: any;
      if (updatedIndex >= popularMovies.length - 6) {
         currentMovies = popularMovies
            .slice(updatedIndex, popularMovies.length)
            .concat(
               popularMovies.slice(0, 7 - (popularMovies.length - updatedIndex))
            );
      } else {
         currentMovies = popularMovies.slice(updatedIndex, updatedIndex + 7);
      }
      setCurrentIndex(updatedIndex);
      setActiveMovies(currentMovies);
   };

   if (popularMovies.length > 0) {
      return (
         <>
            <Stack
               direction='column'
               sx={{ height: '100%', width: '100%', pt: '2rem' }}
            >
               <Typography variant='h4' component='h2' align='center'>
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
                     rowSpacing={2}
                     sx={{
                        overflow: 'hidden',
                        height: '260px',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                     }}
                     columns={{ xs: 4, sm: 6, md: 12, lg: 12, xl: 20 }}
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
                           id={movie.id}
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
