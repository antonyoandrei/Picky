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
    const { name } = req.body;

    try {
        const genre = await prisma.genres.create({ data: { name } });
        res.status(201).json(genre);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const addGenreToMovieById = async (req: Request, res: Response) => {
    const { movieId } = req.params;
    const { genreId } = req.body;
  
    try {
      const movie = await prisma.movies.findUnique({
        where: { id: movieId },
    });
  
    if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
    }
  
    const updatedMovie = await prisma.movies.update({
        where: { id: movieId },
        data: {
          genres: {
            connect: { id: genreId },
        }}
    });
      res.status(200).json(updatedMovie);
    } catch (error) {
      res.status(500).json(error);
    }
};

export const deleteGenre = async (req: Request, res: Response) => {
    const { genreId } = req.params;

    try {
        const deletedGenre = await prisma.genres.delete({
            where: { id: genreId }
        });

        res.status(200).json(deletedGenre);
    } catch (error) {
        res.status(500).json(error);
    }
};
