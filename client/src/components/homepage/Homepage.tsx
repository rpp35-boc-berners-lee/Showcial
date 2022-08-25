import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Homepage.scss';
import { YourWatchList } from './homepage_components/YourWatchList'
import { ConfigAPI, ConfigImages, ConfigResponse, TVAPI, TVResults, TVResponse, MovieAPI, MovieResults, MovieResponse } from '../../../../types';

export function Homepage() {
  const [config, setConfig] = useState<ConfigAPI | undefined>();
  const [topTV, setTopTV] = useState<TVAPI | undefined>();
  const [trendingTV, setTrendingTV] = useState<TVAPI | undefined>();
  const [topMovie, setTopMovie] = useState<MovieAPI | undefined>();
  const [trendingMovie, setTrendingMovie] = useState<MovieAPI | undefined>();
  const [watchList, setWatchList] = useState([]);

  useEffect(() => {
    fetchAPI();
  }, [])

  async function fetchAPI () {
    let config = await axios.get<ConfigAPI>('http://localhost:8080/tmdb/configuration');
    console.log(config.data);
    setConfig(config.data);
    let tv_top = await axios.get<TVAPI>('http://localhost:8080/tmdb/tv/top_rated');
    console.log(tv_top.data);
    setTopTV(tv_top.data);
    let tv_trending = await axios.get<TVAPI>('http://localhost:8080/tmdb/tv/popular');
    setTrendingTV(tv_trending.data);
    let movie_top = await axios.get<MovieAPI>('http://localhost:8080/tmdb/movie/top_rated');
    setTopMovie(movie_top.data);
    let movie_trending = await axios.get<MovieAPI>('http://localhost:8080/tmdb/movie/popular');
    setTrendingMovie(movie_trending.data);
  }

  return (
      <>
        <p>Hello World</p>
        <h3>YOUR WATCH LIST</h3>
        {topTV !== undefined ?
        <YourWatchList watchList={topTV.results} config={config}/>: null}
      </>
  );
}