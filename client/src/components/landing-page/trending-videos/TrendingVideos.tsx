import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const TrendingVideos = () => {
   useEffect(() => {
      axios
         .get('http://localhost:8080/tmdb/movie/popular')
         .then((results) => {
            console.log('results:', results);
         })
         .catch((err) => {
            console.log('err:', err);
         });
   }, []);
   return <></>;
};
