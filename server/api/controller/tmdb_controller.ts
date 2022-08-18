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
  return axios.get(`https://api.themoviedb.org/3/tv/${tv_id}`, config)
    .then(results => {
      return results.data;
    });
}

let getPopularTVs = () => {
  return axios.get('https://api.themoviedb.org/3/tv/popular', config)
    .then(results => {
      return results.data;
    });
}

let getTVWatchProviders = (tv_id: number) => {
  return axios.get(`https://api.themoviedb.org/3/tv/${tv_id}/watch/providers`)
    .then(results => {
      return results.data;
    });
}

let getMovie = (movie_id: number) => {
  return axios.get(`https://api.themoviedb.org/3//movie/${movie_id}`, config)
    .then(results => {
      return results.data;
    });
}

let getPopularMovies = () => {
  return axios.get('https://api.themoviedb.org/3/movie/popular', config)
    .then(results => {
      return results.data;
    });
}

let getMovieWatchProviders = (movie_id: number) => {
  return axios.get(`https://api.themoviedb.org/3//movie/${movie_id}/watch/providers`)
    .then(results => {
      return results.data;
    });
}

export default {
  getTV,
  getPopularTVs,
  getTVWatchProviders,
  getMovie,
  getPopularMovies,
  getMovieWatchProviders
};
