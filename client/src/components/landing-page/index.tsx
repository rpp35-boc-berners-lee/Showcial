import React from 'react';
import './index.scss';
import { Features } from './feature-list/Features';
import { Typography, Grid, Stack } from '@mui/material';
import LandingPageImage from './images/Subscribe.svg';
import { TrendingVideos } from './trending-videos/TrendingVideos';

const LandingPage = () => {
   return (
      <>
         <Grid
            container
            columns={{ xs: 4, sm: 8, md: 12 }}
            direction='row'
            className='landing-page'
            spacing={4}
         >
            <Grid
               item
               component='img'
               src={LandingPageImage}
               alt='main page image'
               xs={4}
               sm={4}
               md={6}
            />

            <Grid item xs={4} sm={4} md={6} alignSelf='center'>
               <Typography
                  variant='h2'
                  component='h1'
                  align='left'
                  sx={{ fontWeight: 'bold' }}
               >
                  Enter Tagline Here
               </Typography>
               <Typography variant='body1' align='left' paragraph={true}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
               </Typography>
            </Grid>

            <Features />
            <TrendingVideos />
         </Grid>
      </>
   );
};

export default LandingPage;
