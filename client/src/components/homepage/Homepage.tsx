import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Homepage.scss';
import { YourWatchList } from './homepage_components/YourWatchList';
import { ConfigAPI, APIResponse } from '../../../../types';
import { CarouselList } from './homepage_components/Carousel';

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


  useEffect(() => {
    fetchAPI();
  }, [])

  async function fetchAPI () {
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

  const addToWatchList = async (event: MouseEvent) => {
    let videoID = Number(event.target.id);
    await axios.post(`http://localhost:8080/videoDB/addToWatchedList?userName=${userName}&videoID=${videoID}`)
      .then(() => {
        console.log(`Video id ${videoID} has been added to ${userName}'s watched list`);
      })
      .catch((err: any) => {
        console.log(`There was an error adding the video id ${videoID} to ${userName}'s watched list`);
      })
    }

  const removeFromWatchList = async (event: MouseEvent) => {
    let videoID = Number(event.target.id);
    await axios.post(`http://localhost:8080/videoDB/removeFromWatchedList?userName=${userName}&videoID=${videoID}`)
      .then(() => {
        console.log(`Video id ${videoID} has been added to ${userName}'s watched list`);
      })
      .catch((err: any) => {
        console.log(`There was an error adding the video id ${videoID} to ${userName}'s watched list`);
      })
    }

  return (
      <>
        <p>Hello World</p>
        <h3>RECOMMENDATIONS FOR YOU</h3>
        {topTV !== undefined ?
        <CarouselList vedioList={topTV.results} config={config}/>: null}
        <h3>CURRENTLY TRENDING</h3>
        {topMovie !== undefined ?
        <CarouselList vedioList={topMovie.results} config={config}/>: null}
        <h3>YOUR WATCH LIST</h3>
        {topTV !== undefined ?
        <YourWatchList watchList={topTV.results} config={config}/>: null}
      </>
  );
}
