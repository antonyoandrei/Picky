import { Request, Response } from 'express';
import MoviesModel from '../model/movies.model';
import UserModel from '../model/user.model';

export const getAllMovies = async (req: Request, res: Response) => {
    try {
        const movies = await MoviesModel.find();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const createMovie = async (req: Request, res: Response) => {
    const { name, poster_image, score } = req.body;
    const { userId } = req.params;

    try {
        const movie = await MoviesModel.create({
            name,
            poster_image,
            score,
            userId
        });

        await UserModel.findByIdAndUpdate(
            { _id: userId },
            { $push: { movie: movie._id } }
        );

        res.status(201).json(movie);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getMovieById = async (req: Request, res: Response) => {
    const { movieId } = req.params;

    try {
        const movie = await MoviesModel.findById({ _id: movieId }).populate('user').populate('genre');

        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const updateMovie = async (req: Request, res: Response) => {
    const { movieId } = req.params;
    const { name, poster_image, score, genre } = req.body;

    try {
        const movie = await MoviesModel.findByIdAndUpdate(
            { _id: movieId },
            { $set: { name, poster_image, score, genre } },
            { new: true }
        );

        res.status(201).json(movie);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const deleteMovie = async (req: Request, res: Response) => {
    const { movieId } = req.params;

    try {
        const movie = await MoviesModel.findByIdAndDelete({ _id: movieId });

        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json(error);
    }
};
