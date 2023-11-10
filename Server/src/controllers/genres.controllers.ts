import { Request, Response } from 'express';
import GenresModel from '../model/genres.model';
import UserModel from '../model/user.model';

export const getAllGenres = async (req: Request, res: Response) => {
    try {
        const genres = await GenresModel.find();
        res.status(200).json(genres);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const createGenre = async (req: Request, res: Response) => {
    const { name, userId } = req.body;

    try {
        if (!name || !userId) {
            throw new Error('Missing fields');
        }

        const genre = await GenresModel.create({
            name
        });

        await UserModel.findByIdAndUpdate(
            { _id: userId },
            { $push: { genres: genre._id } }
        );

        res.status(201).json(genre);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getGenreById = async (req: Request, res: Response) => {
    const { genreId } = req.params;

    try {
        const genre = await GenresModel.findById({ _id: genreId });

        res.status(200).json(genre);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const updateGenre = async (req: Request, res: Response) => {
    const { genreId } = req.params;
    const { name } = req.body;

    try {
        const genre = await GenresModel.findByIdAndUpdate(
            { _id: genreId },
            { $set: { name } },
            { new: true }
        );

        res.status(201).json(genre);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const deleteGenre = async (req: Request, res: Response) => {
    const { genreId } = req.params;

    try {
        const genre = await GenresModel.findByIdAndDelete({ _id: genreId });

        if (!genre) throw new Error('Genre not found');

        res.status(200).json(genre);
    } catch (error) {
        res.status(500).json(error);
    }
};
