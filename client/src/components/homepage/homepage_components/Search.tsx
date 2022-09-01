import React, { useState, useEffect }  from 'react';
import { VideoCard } from '../../shared/VideoCard';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

type ChildProps = {
  searchResults: any;
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

export const Search:React.FC<ChildProps> = ({ searchResults, config }) => {
  const [displayedVideos, setDisplayedVideos] = useState([]);

  useEffect(() => {
    setDisplayedVideos(searchResults)
  }, [searchResults]);

   return (
    <div>
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={4} justifyContent='center'>
          {displayedVideos === undefined ? null : displayedVideos.map((video: Video) => {
            if (video.media_type !== 'person') {
              return (
                <Grid item xs={0} key={video.id}>
                  <VideoCard
                    base_url={config.images.base_url}
                    backdrop_sizes={config.images.backdrop_sizes}
                    backdrop_path={video.backdrop_path}
                    name={video.name || video.original_title}
                    id={video.id}
                  />
                </Grid>
              )
            } else {
              return null
            }
          })}
        </Grid>
      </Box>
    </div>
   );
};