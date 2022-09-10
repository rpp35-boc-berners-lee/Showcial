import React, { useState, useEffect }  from 'react';
import { VideoCard } from '../../shared/VideoCard';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

type ChildProps = {
  searchResults: any;
  config: any;
  getSelected?: (id: number, type: string) => void;
}

type Video = {
  base_url: string;
  backdrop_path: string;
  name: string;
  id: number;
  title: string;
  media_type: string;
}

export const Search:React.FC<ChildProps> = ({ searchResults, config, getSelected }) => {
  const [displayedVideos, setDisplayedVideos] = useState([]);

  useEffect(() => {
    setDisplayedVideos(searchResults)
  }, [searchResults]);

   return (
    <div>
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={4} justifyContent='center'>
          {displayedVideos === undefined ? null : displayedVideos.map((video: Video) => {
            return (
              <Grid item xs={0} key={video.id}>
                <VideoCard
                  base_url={config.images.base_url}
                  backdrop_sizes={config.images.backdrop_sizes}
                  backdrop_path={video.backdrop_path}
                  name={video.name || video.title}
                  id={video.id}
                  mediaType={video.media_type}
                  getSelected={getSelected}
                />
              </Grid>
            )
          })}
        </Grid>
      </Box>
    </div>
   );
};