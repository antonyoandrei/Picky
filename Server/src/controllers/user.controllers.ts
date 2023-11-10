import { Request, Response } from 'express';
import UserModel from '../model/user.model';
import prisma from '../db/client';

export const getAllUsers = async (req: Request, res: Response) => {

    try {
        const allUsers = await prisma.user.findMany();
        res.status(201).json(allUsers);
    } catch (error) {
        res.status(200).send('Get All Users');
    }

};

export const getAllUsersRegistered = (req: Request, res: Response) => {
    res.status(200).send('Get All Users Registered');
};

export const createUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) throw new Error ('Missing fields');
    
        const newUser = await prisma.user.create({
            data: { name, email, password }
        });
    
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json(error);
    }

    res.status(200).send('Post: Create user');
};

export const getUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId }, 
            include: {
                movies: true,
            }
        })

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error)
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { name, email } = req.body;
    
    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { name, email }
        });
            
            res.status(201).json(updatedUser);
    } catch (error) {
        res.status(500).json(error)
    }
    
    res.status(200).send('User updated');
};

export const deleteUser = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const deletedUser = await prisma.user.delete({
            where: { id: userId }
        });
        res.status(204).json(deletedUser);
    } catch (error) {
        res.status(500).json(error);
    }

};
