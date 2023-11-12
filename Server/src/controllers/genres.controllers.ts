import { Request, Response } from 'express';
import GenresModel from '../model/genres.model';
import UserModel from '../model/user.model';
import MoviesModel from '../model/movies.model';

export const getAllGenres = async (req: Request, res: Response) => {
    try {
        const genres = await GenresModel.find();
        res.status(200).json(genres);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const createGenre = async (req: Request, res: Response) => {
    const { name } = req.body;

    try {
        const genre = await GenresModel.create({ name });
    
        res.status(201).json(genre);
    } catch (error) {
        res.status(500).json(error);
    };
};
    
export const addGenreToMovie = async (req: Request, res: Response) => {
    const { name } = req.body;
    const { movieId } = req.params;

    try {
        const existingGenreId = req.body.genre[0];

        const existingGenre = await GenresModel.findById(existingGenreId);

        if (!existingGenre) {
            return res.status(404).json({ error: 'Genre does not exist' });
        }

        const updatedMovie = await MoviesModel.findByIdAndUpdate(
            { _id: movieId },
            { $addToSet: { genre: existingGenre._id } },
            { new: true }
        );

        res.status(202).json({ updatedMovie, existingGenre });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const deleteGenre = async (req: Request, res: Response) => {
    const { genreId } = req.params;
  
    try {
        const genre = await GenresModel.findByIdAndDelete({ _id: genreId });
  
        res.status(200).json(genre);
  
    } catch (error) {
        res.status(500).json(error);
    }
};
