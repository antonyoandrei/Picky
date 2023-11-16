import { Router } from 'express';
import { createMovie, getAllMovies, getMoviesByUserId, updateMovie, deleteMovie } from '../controllers/movies.controllers';
import { checkJwtMiddleware } from '../middlewares/checkJwt.middleware';

const moviesRoutes = Router();

moviesRoutes.get('/', getAllMovies);
moviesRoutes.get('/user/:userId', getMoviesByUserId);
moviesRoutes.post('/:userId', checkJwtMiddleware, createMovie);
moviesRoutes.patch('/:movieId', updateMovie);
moviesRoutes.delete('/:movieId', deleteMovie);

export default moviesRoutes;
