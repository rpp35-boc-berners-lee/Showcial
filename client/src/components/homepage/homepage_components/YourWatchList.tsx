import React from 'react';
import './YourWatchList.scss';
import { VideoCard } from './VideoCard';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

type ChildProps = {
  watchList: any;
  config: any;
}

type Video = {
  base_url: string;
  backdrop_path: string;
  name: string;
  id: number;
}

export const YourWatchList:React.FC<ChildProps> = ({ watchList, config }) => {
   return (
    <Box sx={{ flexGrow: 1}}>
      <Grid container spacing={2}>
        {watchList.map((video: Video) => {
          return (
            <Grid xs={3}>
              <VideoCard base_url={config.images.base_url}
                        backdrop_sizes={config.images.backdrop_sizes}
                        backdrop_path={video.backdrop_path}
                        name={video.name}
                        key={video.id}
              />
            </Grid>
          )
        })}
      </Grid>
    </Box>
   );
};
