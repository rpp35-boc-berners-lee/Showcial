import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Grid, Paper, Box, Typography } from '@mui/material';
import { WatchProviders } from '.././watch-providers/WatchProviders'
import { PersonalFeed } from '.././personal-feed/PersonalFeed';
import { YourWatchList } from '../../homepage/homepage_components/YourWatchList';
import { VideoCard } from '../../shared/VideoCard';

type Props = {
  userName: string;
  watchList: any;
  config: any;
}

type Video = {
  base_url: string;
  backdrop_path: string;
  name: string;
  id: number;
  original_title: string;
  media_type: string;
}

export const ForYou: React.FC<Props> = ({ userName, watchList, config }) => {
  return (
     <div>
       <Grid container spacing={2} className='personal-profile'>
         <Grid item xs={12} sm={12} md={3} className='provider-list'>
           <Paper><WatchProviders userName={userName} /></Paper>
         </Grid>
         <Grid item xs={12} sm={12} md={9} className='personal-feed'>
           <PersonalFeed userName={userName}/>
         </Grid>
       </Grid>
       <Box sx={{ width: '100%' }}>
        <Typography>My Watch List</Typography>
        <Grid container spacing={4} justifyContent='center'>
          {watchList.map((video: Video, i: number) => {
            return (
              <Grid item xs={0} key={`trending-${video.media_type}-${video.id}`}>
                <VideoCard
                  base_url={config.images.base_url}
                  backdrop_sizes={config.images.backdrop_sizes}
                  backdrop_path={video.backdrop_path}
                  name={video.name || video.original_title}
                  id={video.id}
                  mediaType={video.media_type}
                />
              </Grid>
            )
          })}
        </Grid>
      </Box>
     </div>
  );
};
