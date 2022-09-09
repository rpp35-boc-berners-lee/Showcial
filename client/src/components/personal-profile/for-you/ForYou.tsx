import React, {useState, useEffect} from 'react';
import { Grid, Paper, Box, Typography } from '@mui/material';
import { WatchProviders } from '.././watch-providers/WatchProviders'
import { PersonalFeed } from '.././personal-feed/PersonalFeed';
import { VideoCard } from '../../shared/VideoCard';

type Props = {
  userName: string;
  watchList: any;
  config: any;
  setValue: any;
  setFolloweeData: any;
}

type Video = {
  base_url: string;
  backdrop_path: string;
  name: string;
  id: number;
  original_title: string;
  media_type: string;
}

export const ForYou: React.FC<Props> = ({ userName, watchList, config, setValue, setFolloweeData }) => {
  return (
     <div className='forYou'>
       <Grid container spacing={2} className='forYou'>
         <Grid item xs={12} sm={12} md={3} className='provider-list'>
           <Paper><WatchProviders userName={userName} /></Paper>
         </Grid>
         <Grid item xs={12} sm={12} md={9} className='personal-feed'>
           <PersonalFeed
             userName={userName}
             setValue={setValue}
             setFolloweeData={setFolloweeData}
           />
         </Grid>
       </Grid>
     </div>
  );
};
