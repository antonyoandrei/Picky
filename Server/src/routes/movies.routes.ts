import { Router } from 'express';
import { createMovie, getAllMovies, getMovieById, updateMovie, deleteMovie } from '../controllers/movies.controllers';
import { check } from "../middleware/check.middleware";

const moviesRoutes = Router();

moviesRoutes.get('/', getAllMovies);
moviesRoutes.get('/:userId', getMovieById);
moviesRoutes.post('/:userId', createMovie);
moviesRoutes.patch('/:userId', updateMovie);
moviesRoutes.delete('/:id', deleteMovie);

export default moviesRoutes;
