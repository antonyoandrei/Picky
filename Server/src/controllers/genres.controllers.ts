import { Request, Response } from 'express';
import GenresModel from '../model/genres.model';
import UserModel from '../model/user.model';
import prisma from '../db/client';

export const getAllGenres = async (req: Request, res: Response) => {
    try {
        const genres = await prisma.genres.findMany();
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

        const genre = await prisma.genres.create({
            data: { name }
        });

        res.status(201).json(genre);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getGenreById = async (req: Request, res: Response) => {
    const { genreId } = req.params;

    try {
        const genre = await prisma.genres.findUnique({
            where: { id: genreId }
        });

        res.status(200).json(genre);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const updateGenre = async (req: Request, res: Response) => {
    const { genreId } = req.params;
    const { name } = req.body;

    try {
        const updatedGenre = await prisma.genres.update({
            where: { id: genreId },
            data: { name }
        });

        res.status(201).json(updatedGenre);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const deleteGenre = async (req: Request, res: Response) => {
    const { genreId } = req.params;

    try {
        const deletedGenre = await prisma.genres.delete({
            where: { id: genreId }
        })

        res.status(200).json(deletedGenre);
    } catch (error) {
        res.status(500).json(error);
    }
};
