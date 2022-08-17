import { Request, Response, Router } from 'express';
const router = Router();
import tmdb from '../controller/tmdb_controller';

type Params = {
  tv_id: number;
  movie_id: number;
};

// TVs
router.get('/tv/:tv_id', (req: Request, res: Response) => {
  let params = req.params as unknown as Params;
  res.send(tmdb.getTV(params.tv_id));
})

router.get('/tv/popular', (req: Request, res: Response) => {
  res.send(tmdb.getPopularTVs());
})

router.get('/tv/:tv_id/watch/providers', (req: Request, res: Response) => {
  let params = req.params as unknown as Params;
  res.send(tmdb.getTVWatchProviders(params.tv_id));
})

// MOVIES
router.get('/movie/:movie_id', (req: Request, res: Response) => {
  let params = req.params as unknown as Params;
  res.send(tmdb.getMovie(params.movie_id));
})

router.get('/movie/popular', (req: Request, res: Response) => {
  res.send(tmdb.getPopularMovies());
})

router.get('/movie/:movie_id/watch/providers', (req: Request, res: Response) => {
  let params = req.params as unknown as Params;
  res.send(tmdb.getMovieWatchProviders(params.movie_id));
})

export default router;