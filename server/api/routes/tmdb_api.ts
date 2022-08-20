import { Request, Response, Router } from 'express';
const router = Router();
import tmdb from '../controller/tmdb_controller';

type Params = {
  tv_id: number;
  movie_id: number;
};

// TVs
router.get('/tv/:tv_id', async (req: Request, res: Response) => {
  let params = req.params as unknown as Params;
  res.send(await tmdb.getTV(params.tv_id));
})

router.get('/tv/top_rated', async (req: Request, res: Response) => {
  res.send(await tmdb.getTopTVs());
})

router.get('/tv/popular', async (req: Request, res: Response) => {
  res.send(await tmdb.getPopularTVs());
})

router.get('/tv/:tv_id/watch/providers', async (req: Request, res: Response) => {
  let params = req.params as unknown as Params;
  res.send(await tmdb.getTVWatchProviders(params.tv_id));
})

// MOVIES
router.get('/movie/:movie_id', async (req: Request, res: Response) => {
  let params = req.params as unknown as Params;
  res.send(await tmdb.getMovie(params.movie_id));
})

router.get('/movie/top_rated', async (req: Request, res: Response) => {
  res.send(await tmdb.getTopMovies());
})

router.get('/movie/popular', async (req: Request, res: Response) => {
  res.send(await tmdb.getPopularMovies());
})

router.get('/movie/:movie_id/watch/providers', async (req: Request, res: Response) => {
  let params = req.params as unknown as Params;
  res.send(await tmdb.getMovieWatchProviders(params.movie_id));
})

export default router;