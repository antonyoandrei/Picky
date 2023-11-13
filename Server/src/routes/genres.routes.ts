import { Router } from 'express';
import { createGenre, getAllGenres, addGenreToMovieById, deleteGenre } from '../controllers/genres.controllers';

const genresRoutes = Router();

genresRoutes.get('/', getAllGenres);
genresRoutes.post('/', createGenre);
genresRoutes.get('/:movieId/', addGenreToMovieById);
genresRoutes.delete('/:genreId', deleteGenre);

export default genresRoutes;