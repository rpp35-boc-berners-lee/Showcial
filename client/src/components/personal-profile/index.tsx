import React from 'react';
import './PersonalProfile.scss';
import { Grid, Paper } from '@mui/material';
import { PersonalFeed } from './personal-feed/PersonalFeed';
import { SelectBar } from './select-bar/SelectBar';

export const PersonalProfile = () => {
   return (
      <div>
        <SelectBar />
        <Grid container spacing={2} className='personal-profile'>
          <Grid item xs={12} sm={12} md={3} className='provider-list'>
            <Paper>Watch Providers List</Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={9} className='personal-feed'>
            <PersonalFeed />
          </Grid>
        </Grid>
      </div>
   );
};