import React, { useState, useEffect } from 'react';
import './TrendingVideos.scss';
import { TrendingVideoItem } from './TrendingVideoItem';
import axios from 'axios';
import { Typography, Stack } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

type PopularMovie = {
   backdrop_path: string;
   first_air_date: string;
   id: number;
   name: string;
   origin_country: string[];
   original_language: string;
   original_name: string;
   overview: string;
   popularity: number;
   post_path: string;
   vote_average: number;
   vote_count: number;
};

export const TrendingVideos = () => {
   const [popularMovies, setPopularMovies] = useState<PopularMovie[] | []>([]);
   const [imageUrl, setImageUrl] = useState<string>('');
   const [imageSize, setImageSize] = useState<string>('');
   const [index, setIndex] = useState<number>(0);

   useEffect(() => {
      axios
         .get('http://localhost:8080/tmdb/movie/popular')
         .then((response) => {
            console.log('response.data:', response.data);
            axios
               .get('http://localhost:8080/tmdb/configuration')
               .then((config) => {
                  console.log('config:', config);
                  setImageUrl(config.data.images.secure_base_url);
                  setImageSize(config.data.images.backdrop_sizes[1]);
                  setPopularMovies(response.data.results);
               });
         })
         .catch((err) => {
            console.log('err:', err);
         });
   }, []);

   const handleSlideLeft = () => {};

   const handleSlideRight = () => {};
   if (popularMovies.length > 0) {
      return (
         <>
            <Stack direction='column' sx={{ height: '100%', width: '100%' }}>
               <Typography variant='h4' component='h2'>
                  Currently Trending
               </Typography>
               <div className='trending-videos-container'>
                  <ArrowBackIosIcon onClick={handleSlideLeft} />
                  <div className='visible-videos'>
                     {popularMovies.map((movie) => (
                        <TrendingVideoItem
                           key={movie.id}
                           image={movie.backdrop_path}
                           name={movie.name}
                           imageUrl={imageUrl}
                           imageSize={imageSize}
                        />
                     ))}
                  </div>
                  <ArrowForwardIosIcon onClick={handleSlideRight} />
               </div>
            </Stack>
         </>
      );
   } else {
      return null;
   }
};
