require('dotenv').config();
import axios from 'axios';

const token = process.env.TOKEN;

const config = {
  headers: {
    Authorization: `Bearer ${token}`// 'Content-Type': 'application/json;charset=utf-8'
  }
}

let getConfig = async () => {
  return await axios.get(`https://api.themoviedb.org/3/configuration`, config)
    .then(results => {
      return results.data;
    });
}

let getTV = async (tv_id: number) => {
  return await axios.get(`https://api.themoviedb.org/3/tv/${tv_id}`, config)
    .then(results => {
      return results.data;
    });
}

let getTopTVs = async () => {
  return await axios.get('https://api.themoviedb.org/3/tv/top_rated', config)
    .then(results => {
      return results.data;
    });
}

let getPopularTVs = async () => {
  return await axios.get('https://api.themoviedb.org/3/tv/popular', config)
    .then(results => {
      return results.data;
    });
}

let getTVWatchProviders = async (tv_id: number) => {
  return await axios.get(`https://api.themoviedb.org/3/tv/${tv_id}/watch/providers`, config)
    .then(results => {
      return results.data;
    });
}

let getMovie = async (movie_id: number) => {
  return await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}`, config)
    .then(results => {
      return results.data;
    });
}

let getTopMovies = async () => {
  return await axios.get('https://api.themoviedb.org/3/movie/top_rated', config)
    .then(results => {
      return results.data;
    });
}

let getPopularMovies = async () => {
  return await axios.get('https://api.themoviedb.org/3/movie/popular', config)
    .then(results => {
      return results.data;
    });
}

let getMovieWatchProviders = async (movie_id: number) => {
  return await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}/watch/providers`, config)
    .then(results => {
      return results.data;
    });
}

let getSearchResults = async (query: string, page: number) => {
  return await axios.get(`https://api.themoviedb.org/3/search/multi?query=${query}&page=${page}`, config)
    .then(results => {
      return results.data;
    })
}

export default {
  getTV,
  getTopTVs,
  getPopularTVs,
  getTVWatchProviders,
  getMovie,
  getTopMovies,
  getPopularMovies,
  getMovieWatchProviders,
  getConfig,
  getSearchResults,
};
