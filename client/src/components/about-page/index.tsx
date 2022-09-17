import React from 'react';
import './index.scss';
import { Features } from './feature-list/Features';
import {
   Typography,
   Grid,
   Stack,
   Button,
   useAutocomplete,
} from '@mui/material';
import AboutPageImage from './images/Subscribe.svg';
import { useNavigate } from 'react-router-dom';
const AboutPage = () => {
   const navigate = useNavigate();
   return (
      <>
         <div className='landing-page'>
            <Grid
               container
               columns={{ xs: 4, sm: 8, md: 12 }}
               direction='row'
               spacing={4}
            >
               <Grid
                  item
                  component='img'
                  src={AboutPageImage}
                  alt='main page image'
                  xs={4}
                  sm={4}
                  md={6}
               />

               <Grid item xs={4} sm={4} md={6} alignSelf={'center'}>
                  <Typography
                     variant='h2'
                     component='h1'
                     align='left'
                     sx={{ fontWeight: 'bold' }}
                  >
                     Enter Tagline Here
                  </Typography>
                  <Typography variant='body1' align='left' paragraph={true}>
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                     sed do eiusmod tempor incididunt ut labore et dolore magna
                     aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                     ullamco laboris nisi ut aliquip ex ea commodo consequat.
                     Duis aute irure dolor in reprehenderit in voluptate velit
                     esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                     occaecat cupidatat non proident, sunt in culpa qui officia
                     deserunt mollit anim id est laborum.
                  </Typography>

                  <Stack direction='row' spacing={1}>
                     <Button
                        variant='contained'
                        fullWidth
                        onClick={() => navigate('/signin')}
                     >
                        Sign In
                     </Button>
                     <Button
                        variant='contained'
                        fullWidth
                        color='secondary'
                        onClick={() => navigate('/signup')}
                     >
                        Sign Up
                     </Button>
                  </Stack>
               </Grid>
            </Grid>
            <Features />
         </div>
      </>
   );
};

export default AboutPage;
