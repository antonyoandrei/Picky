import { NextFunction, Request, Response } from "express";

export const check = (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;

    if (name.length < 3) {
        res.status(400).json({ message: 'Name must be at least 3 characters long'});
    }

    next();
};
