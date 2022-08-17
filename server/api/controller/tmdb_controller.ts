require('dotenv').config();
import axios from 'axios';

const token = process.env.TOKEN;

const config = {
  headers: {
    Authorization: `Bearer ${token}`
    // 'Content-Type': 'application/json;charset=utf-8'
  }
}

let getTV = (tv_id: number) => {
  return axios.get(`https://api.themoviedb.org/3//tv/${tv_id}`, config);
}

let getPopularTVs = () => {
  return axios.get('https://api.themoviedb.org/3/tv/popular', config);
}

let getTVWatchProviders = (tv_id: number) => {
  return axios.get(`https://api.themoviedb.org/3//tv/${tv_id}/watch/providers`)
}

let getMovie = (movie_id: number) => {
  return axios.get(`https://api.themoviedb.org/3//movie/${movie_id}`, config);
}

let getPopularMovies = () => {
  return axios.get('https://api.themoviedb.org/3/movie/popular', config);
}

let getMovieWatchProviders = (movie_id: number) => {
  return axios.get(`https://api.themoviedb.org/3//movie/${movie_id}/watch/providers`)
}

let getTVProviders = () => {
  return axios.get('https://api.themoviedb.org/3/watch/providers/tv', config);
}

export {
  getTV,
  getPopularTVs,
  getTVWatchProviders,
  getMovie,
  getPopularMovies,
  getMovieWatchProviders,
  getTVProviders
};
