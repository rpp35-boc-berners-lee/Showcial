import { Request, Response, Router } from 'express';
const router = Router();
import tmdb from '../controller/tmdb_controller';

type Params = {
   tv_id: number;
   movie_id: number;
   search: string;
   page: number;
};

type Query = {
   search: string;
   page: number;
}

// CONFIGURATION
router.get('/configuration', async (req: Request, res: Response) => {
   let params = req.params as unknown as Params;
   res.send(await tmdb.getConfig());
});

// TVs
router.get('/tv/:tv_id', async (req: Request, res: Response) => {
   let params = req.params as unknown as Params;
   res.send(await tmdb.getTV(params.tv_id));
});

router.get('/tv/top_rated', async (req: Request, res: Response) => {
   res.send(await tmdb.getTopTVs());
});

router.get('/tv/popular', async (req: Request, res: Response) => {
   res.send(await tmdb.getPopularTVs());
});

router.get(
   '/tv/:tv_id/watch/providers',
   async (req: Request, res: Response) => {
      let params = req.params as unknown as Params;
      res.send(await tmdb.getTVWatchProviders(params.tv_id));
   }
);

// MOVIES
router.get('/movie/:movie_id', async (req: Request, res: Response) => {
   let params = req.params as unknown as Params;
   res.send(await tmdb.getMovie(params.movie_id));
});

router.get('/movie/top_rated', async (req: Request, res: Response) => {
   res.send(await tmdb.getTopMovies());
});

router.get('/movie/popular', async (req: Request, res: Response) => {
   res.send(await tmdb.getPopularMovies());
});

router.get(
   '/movie/:movie_id/watch/providers',
   async (req: Request, res: Response) => {
      let params = req.params as unknown as Params;
      res.send(await tmdb.getMovieWatchProviders(params.movie_id));
   }
);

// SEARCH
router.get('/search/:search/:page', async (req: Request, res: Response) => {
   let params = req.params as unknown as Params;
   res.send(await tmdb.getSearchResults(params.search, params.page));
});

router.get('/search/tv/:search/:page', async (req: Request, res: Response) => {
   let params = req.params as unknown as Params;
   res.send(await tmdb.getSearchResults(params.search, params.page));
});

router.get('/search/movie/:search/:page', async (req: Request, res: Response) => {
   let params = req.params as unknown as Params;
   res.send(await tmdb.getSearchResults(params.search, params.page));
});

// TRENDING
router.get('/trending/tv', async (req: Request, res: Response) => {
   res.send(await tmdb.getTVTrending());
});

router.get('/trending/movie', async (req: Request, res: Response) => {
   res.send(await tmdb.getMovieTrending());
});

export default router;
