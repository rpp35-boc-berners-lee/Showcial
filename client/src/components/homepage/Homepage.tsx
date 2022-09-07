import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import './Homepage.scss';
import { YourWatchList } from './homepage_components/YourWatchList';
import { Search } from './homepage_components/Search';
import { ConfigAPI, APIResponse } from '../../../../types';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CarouselList } from './homepage_components/carousel/Carousel';
import { Recommendations } from './homepage_components/recommendations/Recommendations';
import { TrendingVideos } from '../shared/trending-videos/TrendingVideos';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { VideoDetails } from '../shared/VideoDetails';
import { useAuth } from '../../hooks/useAuth';
import { TrendingOrRecommendedVideos } from './homepage_components/trending/TrendingVideos'
interface MouseEvent {
   target: {
      id: string;
   };
}

export function Homepage() {
  // const auth = useAuth();
  // console.log('auth:', auth);
  const [watchList, setWatchList] = useState();
  const [config, setConfig] = useState<ConfigAPI | undefined>();
  const [topTV, setTopTV] = useState<APIResponse | undefined>();
  const [trendingTV, setTrendingTV] = useState<APIResponse | undefined>();
  const [topMovie, setTopMovie] = useState<APIResponse | undefined>();
  const [trendingMovie, setTrendingMovie] = useState<APIResponse | undefined>();
  const [userName, setUserName] = useState<string>('JamesFranco');
  // temporary username
  const [query, setQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<APIResponse | undefined>();
  const [page, setPage] = useState<number>(1);
  const [selectedId, setSelectedId] = useState<number>(0)
  const [selectedMediaType, setSelectedMediaType] = useState<string>('')
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [mediaType, setMediaType] = useState('movie');
  // temporary username


   useEffect(() => {
      fetchAPI();
   }, []);

  useEffect(() => {
    setSearchResults(undefined);
  }, [query === ''])

  useEffect(() => {
    getSearchAPI();
  }, [page])

  useEffect(() => {
    getSearchAPI();
  }, [mediaType])

  useEffect(() => {
    setSearchResults(undefined);
  }, [query === ''])
  
  const fetchAPI = async () => {
    let config = await axios.get<ConfigAPI>(`http://localhost:8080/tmdb/configuration`);
    setConfig(config.data);
    let tv_top = await axios.get<APIResponse>(`http://localhost:8080/tmdb/tv/top_rated`);
    setTopTV(tv_top.data);
    let tv_trending = await axios.get<APIResponse>(`http://localhost:8080/tmdb/tv/popular`);
    setTrendingTV(tv_trending.data);
    let movie_top = await axios.get<APIResponse>(`http://localhost:8080/tmdb/movie/top_rated`);
    setTopMovie(movie_top.data);
    let movie_trending = await axios.get<APIResponse>(`http://localhost:8080/tmdb/movie/popular`);
    setTrendingMovie(movie_trending.data);
    updateWatchList();
  }

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
   };

   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      getSearchAPI();
   };

  const handleNextPage = async () => {
    if (page !== searchResults?.total_pages) {
      setPage(page + 1)
    }
  }

  const handleMediaTypeChange = (event: SelectChangeEvent) => {
    setMediaType(event.target.value as string);
  };

  const handlePreviousPage = async () => {
    if (page !== 1) {
      setPage(page - 1)
    }
  }

  const getSearchAPI = async () => {
    let search = await axios.get<APIResponse>(`http://localhost:8080/tmdb/${mediaType}/${query}/${page}`);
    setSearchResults(search.data);
  }
  

  const updateWatchList = async () => {
    let watch_list = await axios.get(`http://localhost:8080/videoDB/user?userName=${userName}`);
    setWatchList(watch_list.data.watchedVideos);
  }

  const getSelected = (id: number, type: string) => {
    setSelectedId(id);
    setSelectedMediaType(type);
    setOpenModal(!openModal);
  }

  return (
    <div id='homepage'>
      {openModal ? <VideoDetails mediaType={selectedMediaType} id={selectedId} config={config} open={openModal} close={setOpenModal} /> : null}
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <form onSubmit={handleSubmit}>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="search-adornment">Search a show...</InputLabel>
            <OutlinedInput
              id="search-adornment"
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <SearchIcon/>
                </InputAdornment>
              }
              label="search"
            />
          </FormControl>
        </form>
      </Box>
      {searchResults !== undefined && query !== ''
        ?
        <div>
          {openModal ? <VideoDetails mediaType={selectedMediaType} id={selectedId} config={config} open={openModal} close={setOpenModal} /> : null}
          <Typography>SEARCH RESULTS</Typography>
          <Box sx={{ maxWidth: 200 }}>
            <FormControl fullWidth>
              <InputLabel id="tv-movie-filter">Filter By</InputLabel>
              <Select
                labelId="tv-movie-filter"
                id="tv-movie-select"
                value={mediaType}
                label="MediaType"
                onChange={handleMediaTypeChange}
              >
                <MenuItem value={'movie'}> Movie</MenuItem>
                <MenuItem value={'tv'}>TV</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Stack spacing={2} direction="row">
            {page < searchResults?.total_pages ?
              <Button variant="text" startIcon={<ExpandMoreIcon />} onClick={handleNextPage}>SHOW NEXT PAGE</Button> : null}
            {page > 1 ?
              <Button variant="text" startIcon={<ExpandLessIcon />} onClick={handlePreviousPage}>SHOW PREVIOUS PAGE</Button> : null}
          </Stack>
          <Search searchResults={searchResults.results} config={config} getSelected={getSelected} mediaType={mediaType}/>
          <Stack spacing={2} direction="row">
            {page < searchResults?.total_pages ?
              <Button variant="text" startIcon={<ExpandMoreIcon />} onClick={handleNextPage}>SHOW NEXT PAGE</Button> : null}
            {page > 1 ?
              <Button variant="text" startIcon={<ExpandLessIcon />} onClick={handlePreviousPage}>SHOW PREVIOUS PAGE</Button> : null}
          </Stack>
      </div>
      :
      <>
        <h3>RECOMMENDATIONS FOR YOU</h3>
        <Box sx={{ maxWidth: 200 }}>
          <FormControl fullWidth>
            <InputLabel id="tv-movie-filter">TV or Movie</InputLabel>
            <Select
              labelId="tv-movie-filter"
              id="tv-movie-select"
              value={mediaType}
              label="MediaType"
              onChange={handleMediaTypeChange}
            >
              <MenuItem value={'movie'}> Movie</MenuItem>
              <MenuItem value={'tv'}>TV</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {topTV !== undefined && mediaType === 'tv' ?
          <Recommendations vedios={topTV.results} config={config} userName={userName} mediaType={mediaType} getSelected={getSelected} /> : null}
        {topMovie !== undefined && mediaType === 'movie' ?
          <Recommendations vedios={topMovie.results} config={config} userName={userName} mediaType={mediaType} getSelected={getSelected}/> : null}
        {/* <TrendingVideos getSelected={getSelected}/> */}
        <TrendingOrRecommendedVideos mediaType={mediaType} trendingOrRecommended={'trending'} getSelected={getSelected}/>
        {/* {trendingMovie !== undefined ?
            <CarouselList vedioList={trendingMovie.results} config={config}/>: null} */}
        {watchList !== undefined ?
          <YourWatchList watchList={watchList} config={config} getSelected={getSelected}/>: null}
        </>
      }
    </div>
  );
}
