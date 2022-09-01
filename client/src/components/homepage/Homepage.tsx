import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import './Homepage.scss';
import { YourWatchList } from './homepage_components/YourWatchList';
import { Search } from './homepage_components/Search';
import { ConfigAPI, APIResponse } from '../../../../types';
import { CarouselList } from './homepage_components/Carousel';
import { Routes, Route, useNavigate } from 'react-router-dom';
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


interface MouseEvent {
  target: {
    id: string
  }
}

export function Homepage() {
  const [config, setConfig] = useState<ConfigAPI | undefined>();
  const [topTV, setTopTV] = useState<APIResponse | undefined>();
  const [trendingTV, setTrendingTV] = useState<APIResponse | undefined>();
  const [topMovie, setTopMovie] = useState<APIResponse | undefined>();
  const [trendingMovie, setTrendingMovie] = useState<APIResponse | undefined>();
  const [watchList, setWatchList] = useState([]);
  // temporary username
  const [userName, setUserName] = useState<string>('Nourse41');
  const [query, setQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<APIResponse | undefined>();
  const [page, setPage] = useState<number>(1);

  let navigate = useNavigate();

  useEffect(() => {
    fetchAPI();
  }, [])

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
    // let user_data = await axios.get(`http://localhost:8080/videoDB/findUser?userName=${userName}`);
    // setWatchList(watch_list.data.watchedVideos)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getSearchAPI();
  }

  const getSearchAPI = async () => {
    let search = await axios.get<APIResponse>(`http://localhost:8080/tmdb/search/${query}/${page}`);
    setSearchResults(search.data);
  }

  const handleNextPage = async () => {
    if (page !== searchResults?.total_pages) {
      setPage(page + 1)
    }
  }

  const handlePreviousPage = async () => {
    if (page !== 1) {
      setPage(page - 1)
    }
  }

  useEffect(() => {
    setSearchResults(undefined);
  }, [query === ''])

  useEffect(() => {
    getSearchAPI();
  }, [page])

  return (
      <>
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
          <form onSubmit={handleSubmit}>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <InputLabel htmlFor="search-adornment">Search</InputLabel>
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
            <Typography>SEARCH RESULTS</Typography>
            <Stack spacing={2} direction="row">
            {page < searchResults?.total_pages ?
              <Button variant="text" startIcon={<ExpandMoreIcon />} onClick={handleNextPage}>SHOW NEXT PAGE</Button> : null}
            {page > 1 ?
              <Button variant="text" startIcon={<ExpandLessIcon />} onClick={handlePreviousPage}>SHOW PREVIOUS PAGE</Button> : null}
            </Stack>
            <Search searchResults={searchResults.results} config={config}/>
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
              {topTV !== undefined ?
              <CarouselList vedioList={topTV.results} config={config}/>: null}
              <h3>CURRENTLY TRENDING</h3>
              {topMovie !== undefined ?
              <CarouselList vedioList={topMovie.results} config={config}/>: null}
              <h3>YOUR WATCH LIST</h3>
              {topTV !== undefined ?
              <YourWatchList watchList={topTV.results} config={config}/>: null}
              {/* <Routes>
                <Route path='/search' element={<Search query={search} config={config} />} />
              </Routes> */}
            </>
        }
    </>
  );
}
