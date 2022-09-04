import React, { useState, useEffect }  from 'react';
import axios from 'axios';
import './YourWatchList.scss';
import { VideoCard } from '../../shared/VideoCard';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { DetailModal } from '../../../components/homepage/homepage_components/DetailModal/DetailModal';

type ChildProps = {
  watchList: any;
  config: any;
  getSelected: (id: number, type: string) => void;
}

type Video = {
  base_url: string;
  backdrop_path: string;
  name: string;
  id: number;
  original_title: string;
  media_type: string;
}

export const YourWatchList:React.FC<ChildProps> = ({ watchList, config, getSelected }) => {
  const [displayedVideos, setDisplayedVideos] = useState([]);
  const [numDisplayed, setNumDisplayed] = useState(0);
  const [maxRowCards, setMaxRowCards] = useState(0);
  const [filterType, setFilterType] = useState('');
  const [filteredList, setFilteredList] = useState([]);
  const [sortType, setSortType] = useState('');
  const [sortedList, setSortedList] = useState([]);

  useEffect(() => {
    let box = document.querySelector('.MuiGrid-container');
    if (box !== null) {
      let maxWidthCards = Math.floor(box.clientWidth / 300);
      setMaxRowCards(maxWidthCards);
      setNumDisplayed(numDisplayed + maxWidthCards);
    }
  }, []);

  useEffect(() => {
    if (numDisplayed > watchList.length) {
      setNumDisplayed(watchList.length)
    }
    setDisplayedVideos(watchList.slice(0, numDisplayed));
  }, [numDisplayed]);

  const handleFilterType = (event: SelectChangeEvent) => {
    setFilterType(event.target.value as string);
  };

  const handleSortType = (event: SelectChangeEvent) => {
    setSortType(event.target.value as string);
  };

   return (
    <div>
      <div>
        <Typography>YOUR WATCH LIST</Typography>
        <FormControl sx={{ m: 1, width: '10%' }} size='small'>
          <InputLabel id="filter">Filter</InputLabel>
          <Select
            labelId="filter-label"
            id="filter-select"
            value={filterType}
            label="Filter"
            onChange={handleFilterType}
          >
            <MenuItem value={'Netflix'}>Netflix</MenuItem>
            <MenuItem value={'Hulu'}>Hulu</MenuItem>
            <MenuItem value={'HBO Max'}>HBO Max</MenuItem>
            <MenuItem value={'Disney+'}>Disney+</MenuItem>
            <MenuItem value={'Amazon Prime'}>Amazon Prime</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: '10%' }} size='small'>
          <InputLabel id="sort">Sort</InputLabel>
          <Select
            labelId="sort-label"
            id="sort-select"
            value={sortType}
            label="Sort"
            onChange={handleSortType}
          >
            <MenuItem value={'popularity'}>Trending</MenuItem>
            <MenuItem value={'vote_average'}>Ratings</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={4} justifyContent='center'>
          {displayedVideos.map((video: Video, i: number) => {
            return (
              <Grid item xs={0} key={`trending-${video.media_type}-${video.id}`}>
                <VideoCard
                  base_url={config.images.base_url}
                  backdrop_sizes={config.images.backdrop_sizes}
                  backdrop_path={video.backdrop_path}
                  name={video.name || video.original_title}
                  id={video.id}
                  mediaType={video.media_type}
                  getSelected={getSelected}
                />
              </Grid>
            )
          })}
        </Grid>
      </Box>
      <Stack spacing={2} direction="row">
        {displayedVideos.length < watchList.length ?
          <Button variant="text" startIcon={<ExpandMoreIcon />} onClick={() => setNumDisplayed(numDisplayed + maxRowCards)}>SHOW MORE</Button> : null}
        {displayedVideos.length > maxRowCards ?
          <Button variant="text" startIcon={<ExpandLessIcon />} onClick={() =>
            setNumDisplayed((numDisplayed - maxRowCards < maxRowCards) ? maxRowCards : (numDisplayed - maxRowCards))}>SHOW LESS</Button> : null}
      </Stack>
    </div>
   );
};
