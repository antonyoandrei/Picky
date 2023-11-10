import { Router } from 'express';
import { createMovie, getAllMovies, getMovieById, updateMovie, deleteMovie } from '../controllers/movies.controllers';
import { check } from "../middleware/check.middleware";

const moviesRoutes = Router();

moviesRoutes.get('/', getAllMovies);
moviesRoutes.get('/:userId', getMovieById);
moviesRoutes.patch('/:userId', updateMovie);
moviesRoutes.delete('/:userId', deleteMovie);

moviesRoutes.post('/', check, createMovie);

export default moviesRoutes;
