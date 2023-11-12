import { Router } from 'express';
import { createGenre, getAllGenres, addGenreToMovie, deleteGenre } from '../controllers/genres.controllers';
import { check } from "../middleware/check.middleware";

const genresRoutes = Router();

genresRoutes.get('/', getAllGenres);
genresRoutes.post('/', check, createGenre);
genresRoutes.get('/:movieId/', addGenreToMovie);
genresRoutes.delete('/:genreId', deleteGenre);

export default genresRoutes;
