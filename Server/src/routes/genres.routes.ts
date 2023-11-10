import { Router } from 'express';
import { createGenre, getAllGenres, getGenreById, updateGenre, deleteGenre } from '../controllers/genres.controllers';
import { check } from "../middleware/check.middleware";

const genresRoutes = Router();

genresRoutes.get('/', getAllGenres);
genresRoutes.get('/:genreId', getGenreById);
genresRoutes.patch('/:genreId', updateGenre);
genresRoutes.delete('/:genreId', deleteGenre);

genresRoutes.post('/', check, createGenre);

export default genresRoutes;
