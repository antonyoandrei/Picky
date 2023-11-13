import { Router } from 'express';
import { createMovie, getAllMovies, getMovieById, updateMovie, deleteMovie } from '../controllers/movies.controllers';
import { check } from "../middleware/check.middleware";

const moviesRoutes = Router();

moviesRoutes.get('/', getAllMovies);
moviesRoutes.get('/:movieId', getMovieById);
moviesRoutes.post('/:userId', createMovie);
moviesRoutes.patch('/:movieId', updateMovie);
moviesRoutes.delete('/:movieId', deleteMovie);

export default moviesRoutes;