import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Homepage.scss';
import { any } from 'cypress/types/bluebird';

interface TVAPI {
  page: number;
  results: TVResults;
  total_results: number;
  total_pages: number;
}

interface TVResults {
  poster_path: string | null;
  popularity: number;
  id: number;
  backdrop_path: string | null;
  vote_average: number;
  overview: string;
  first_air_date: string;
  origin_country: string[];
  genre_ids: number[];
  original_language: string;
  vote_count: number;
  name: string;
  original_name: string;
}

type TVResponse = {
  data: TVAPI[];
}

interface MovieAPI {
  page: number;
  results: MovieResults;
  total_results: number;
  total_pages: number;
}

interface MovieResults {
  poster_path: string | null;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

type MovieResponse = {
  data: MovieAPI[];
}

export function Homepage() {
  const [topTV, setTopTV] = useState({});
  const [trendingTV, setTrendingTV] = useState({});
  const [topMovie, setTopMovie] = useState({});
  const [trendingMovie, setTrendingMovie] = useState({});
  const [watchList, setWatchList] = useState({});

  useEffect(() => {
    fetchData();
  }, [])

  async function fetchData () {
    let tv_top = await axios.get<TVResponse>('http://localhost:8080/tmdb/tv/top_rated');
    console.log()
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
      </>
  );
}
