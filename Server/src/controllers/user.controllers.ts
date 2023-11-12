import { Request, Response } from 'express';
import UserModel from '../model/user.model';
import MoviesModel from '../model/movies.model';

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const user = await UserModel.find().populate('movie').populate('movie.genre');
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const createUser = async (req: Request, res: Response) => {
    const { name, email, password, movie } = req.body;

    try {
    
        const newUser = await UserModel.create({ name, email, password, movie });
    
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const user = await UserModel.findById({ _id: userId }).populate('movie').populate('movie.genre');

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error)
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { name, email } = req.body;
    
    try {
        const user = await UserModel.findByIdAndUpdate(
            { _id: userId}, 
            { $set: { name: name, email: email } },
            { new:true } 
            );
            
            res.status(201).json(user);
    } catch (error) {
        res.status(500).json(error)
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const user = await UserModel.findByIdAndDelete({ _id: userId });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
};
