import React, { useState, useEffect }  from 'react';
import './YourWatchList.scss';
import { VideoCard } from './VideoCard';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { set } from 'cypress/types/lodash';

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
  const [displayedVideos, setDisplayedVideos] = useState([]);
  const [numDisplayed, setNumDisplayed] = useState(0);
  const [maxRowCards, setMaxRowCards] = useState(0);

  useEffect(() => {
    let box = document.querySelector('.MuiGrid-container');
    // let card = document.querySelector('.MuiCard-root');
    if (box !== null) {
      let maxWidthCards = Math.floor(box.clientWidth / 300);
      setMaxRowCards(maxWidthCards);
      setNumDisplayed(numDisplayed + maxWidthCards);
      setDisplayedVideos(watchList.slice(0, maxWidthCards))
    }
  }, []);

  useEffect(() => {
    setDisplayedVideos(watchList.slice(0, numDisplayed - 1));
  }, [numDisplayed]);

   return (
    <div>
      <Typography>YOUR WATCH LIST</Typography>
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={4} justifyContent='center'>
          {displayedVideos.map((video: Video) => {
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
      <Stack spacing={2} direction="row">
        {displayedVideos.length < watchList.length ?
          <Button variant="text" startIcon={<ExpandMoreIcon />} onClick={() => setNumDisplayed(numDisplayed + maxRowCards - 1)}>SHOW MORE</Button> : null}
        {displayedVideos.length > maxRowCards ?
          <Button variant="text" startIcon={<ExpandLessIcon />} onClick={() =>
            setNumDisplayed((numDisplayed - maxRowCards - 1 < maxRowCards) ? maxRowCards : (numDisplayed - maxRowCards - 1))}>SHOW LESS</Button> : null}
      </Stack>
    </div>
   );
};
