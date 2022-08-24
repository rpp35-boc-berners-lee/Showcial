import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Homepage.scss';
import { YourWatchList } from './homepage_components/YourWatchList'
import { ConfigResponse, TVResponse, MovieResponse } from '../../../../types';

export function Homepage() {
  const [config, setConfig] = useState({});
  const [topTV, setTopTV] = useState({});
  const [trendingTV, setTrendingTV] = useState({});
  const [topMovie, setTopMovie] = useState({});
  const [trendingMovie, setTrendingMovie] = useState({});
  const [watchList, setWatchList] = useState([]);

  useEffect(() => {
    fetchAPI();
  }, [])

  async function fetchAPI () {
    let config = await axios.get<ConfigResponse>('http://localhost:8080/tmdb/configuration');
    setConfig(config.data);
    let tv_top = await axios.get<TVResponse>('http://localhost:8080/tmdb/tv/top_rated');
    setTopTV(tv_top.data);
    let tv_trending = await axios.get<TVResponse>('http://localhost:8080/tmdb/tv/popular');
    setTrendingTV(tv_trending.data);
    let movie_top = await axios.get<MovieResponse>('http://localhost:8080/tmdb/movie/top_rated');
    setTopMovie(movie_top.data);
    let movie_trending = await axios.get<MovieResponse>('http://localhost:8080/tmdb/movie/popular');
    setTrendingMovie(movie_trending.data);
  }

  return (
      <>
        <p>Hello World</p>
        <YourWatchList watchList={watchList} config={config}/>
      </>
  );
}
