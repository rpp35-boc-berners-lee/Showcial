import React from 'react';
import { Grid, Paper } from '@mui/material';
import { WatchProviders } from '.././watch-providers/WatchProviders'
import { PersonalFeed } from '.././personal-feed/PersonalFeed';

export const ForYou = () => {
  return (
     <div>
       <Grid container spacing={2} className='personal-profile'>
         <Grid item xs={12} sm={12} md={3} className='provider-list'>
           <Paper><WatchProviders /></Paper>
         </Grid>
         <Grid item xs={12} sm={12} md={9} className='personal-feed'>
           <PersonalFeed />
         </Grid>
       </Grid>
     </div>
  );
};