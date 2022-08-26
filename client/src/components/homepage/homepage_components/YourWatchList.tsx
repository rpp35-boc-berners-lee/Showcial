import React from 'react';
import './YourWatchList.scss';
import { VideoCard } from './VideoCard';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';

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
    <Accordion defaultExpanded={true}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='watch_list'
        id='watch_list'
      >
        <Typography>YOUR WATCH LIST</Typography>
      </AccordionSummary>
      <AccordionDetails>
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={4}>
          {watchList.map((video: Video) => {
            return (
              <Grid item xs={0} key={video.id}>
                <VideoCard base_url={config.images.base_url}
                          backdrop_sizes={config.images.backdrop_sizes}
                          backdrop_path={video.backdrop_path}
                          name={video.name}
                />
              </Grid>
            )
          })}
        </Grid>
      </Box>
      </AccordionDetails>
    </Accordion>
   );
};
