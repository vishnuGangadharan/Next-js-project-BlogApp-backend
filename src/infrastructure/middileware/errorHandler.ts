import { Request, Response, NextFunction } from "express";

let errorHandle = async (error: Error, req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.error("Error caught in middleware:", error); // Optional: log the error for debugging purposes
    res.status(400).json({ message: error.message });
    return;
};

export default errorHandle;
