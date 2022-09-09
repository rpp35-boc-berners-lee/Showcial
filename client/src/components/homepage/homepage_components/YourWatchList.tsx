import React, { useState, useEffect }  from 'react';
import axios from 'axios';
import './YourWatchList.scss';
import { VideoCard } from '../../shared/VideoCard';
import { Box, Grid, Stack, Button, Typography, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { SelectChangeEvent } from '@mui/material/Select';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

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
  title: string;
  media_type: string;
}

export const YourWatchList:React.FC<ChildProps> = ({ watchList, config, getSelected }) => {
  const [displayedVideos, setDisplayedVideos] = useState([]);
  const [numDisplayed, setNumDisplayed] = useState(0);
  const [maxRowCards, setMaxRowCards] = useState(0);
  const [filterType, setFilterType] = useState('');
  const [alterList, setAlterList] = useState(watchList);
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
    if (numDisplayed > alterList.length) {
      setNumDisplayed(alterList.length)
    }
    setDisplayedVideos(alterList.slice(0, numDisplayed));
  }, [numDisplayed]);

  useEffect(() => {
    handleFilterAndSort();
  }, [filterType]);

  useEffect(() => {
    handleFilterAndSort();
  }, [sortType]);

  useEffect(() => {
    setDisplayedVideos(alterList.slice(0, numDisplayed));
  }, [alterList])

  const handleFilterType = (event: SelectChangeEvent) => {
    setFilterType(event.target.value as string);
  };

  const handleSortType = (event: SelectChangeEvent) => {
    setSortType(event.target.value as string);
  };

  const handleReset = () => {
    setFilterType('');
    setSortType('');
    setAlterList(watchList);
    setNumDisplayed(numDisplayed + maxRowCards);
  }

  const sort = (array: any) => {
    let copy = array.slice();
    let sorted = copy.sort((a: any, b: any) => {
      if (a[sortType] < b[sortType]) {
        return -1
      }
      if (a[sortType] > b[sortType]) {
        return 1
      }
      if (a[sortType] === b[sortType]) {
        return 0
      }
    })
    return sorted;
  }

  const filter = (array: any) => {
    let copy = array.slice();
    let filtered = copy.filter((video: any) => {
      if (video.watchProviders.flatrate !== undefined) {
        let services = video.watchProviders.flatrate;
        for (var i = 0; i < services.length; i++) {
          if (services[i].provider_name.includes(filterType)) {
            return true
          }
        }
      }
      return false;
    });
    return filtered;
  }

  const handleFilterAndSort = () => {
    let newWatchList = watchList.slice();
    if (sortType !== '') {
      newWatchList = sort(newWatchList);
    }
    if (filterType !== '') {
      newWatchList = filter(newWatchList);
    }
    setAlterList(newWatchList);
  }

   return (
    <div>
      <Typography variant='h5' sx={{ my: 3, ml: 5, fontWeight: "bold" }} component='h2' align='center'>
        YOUR WATCH LIST
      </Typography>
      <Stack spacing={2} direction='row' alignItems='center' justifyContent='center' sx={{ mb: 5, ml: 5 }}>
        <FormControl sx={{ width: '10%' }} size='small'>
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
            <MenuItem value={'HBO'}>HBO Max</MenuItem>
            <MenuItem value={'Disney Plus'}>Disney+</MenuItem>
            <MenuItem value={'Amazon'}>Amazon Prime</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ width: '10%' }} size='small'>
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
        {filterType !== '' || sortType !== ''
          ?
          <Button sx={{ m: 1, width: '10%' }} size='small' variant="outlined" startIcon={<RestartAltIcon />} onClick={handleReset}>
            Reset
          </Button>
          : null
        }
      </Stack>
      <Box sx={{ width: '100%', borderTop: '1px solid rgba(211, 211, 211, .5)', borderBottom: '1px solid rgba(211, 211, 211, .5)', pt: '2vh', pb: '1vh' }}>
        {alterList.length === 0 ?
          <Typography variant='h6' sx={{ fontWeight: "bold" }} component='h2' align='center'>
            There are no videos under this filter.
          </Typography> :
          <Grid container spacing={2} justifyContent='center'>
            {displayedVideos.map((video: Video, i: number) => {
              return (
                <Grid item xs={0} key={`trending-${video.media_type}-${video.id}`}>
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
      }
      <Stack spacing={2} direction='row' alignItems='center' justifyContent='center' sx={{ paddingTop: '1vh' }}>
        {displayedVideos.length < watchList.length ?
          <Button sx={{ml: 5, my: 3}} variant="text" startIcon={<ExpandMoreIcon />} onClick={() =>
          setNumDisplayed((numDisplayed + maxRowCards) > alterList.length ? alterList.length : (numDisplayed + maxRowCards))}>SHOW MORE</Button>
           : null}
        {displayedVideos.length > maxRowCards ?
          <Button sx={{ml: 5, my: 3}} variant="text" startIcon={<ExpandLessIcon />} onClick={() =>
            setNumDisplayed((numDisplayed - maxRowCards < maxRowCards) ? maxRowCards : (numDisplayed - maxRowCards))}>SHOW LESS</Button> : null}
      </Stack>
      </Box>
    </div>
   );
};
