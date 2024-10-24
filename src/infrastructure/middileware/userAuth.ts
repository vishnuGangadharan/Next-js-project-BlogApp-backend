import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import UserModel from "../database/userModel";

export const userAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        res.status(401).json({ message: "Authorization header missing or invalid" });
        return; 
    }

    const token = authHeader.split(" ")[1];

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload;
        
        if (decodedToken.role !== "user") {
            res.status(403).json({ message: "Unauthorized access" });
            return;
        }

        const userId = decodedToken.userId;
        console.log('Authenticated user ID:', userId);

        const user = await UserModel.findById(userId);
        
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        if (user.isBlocked) {
            res.status(403).json({ message: "User is blocked", accountType: "user" });
            return; 
        }

        next();
    } catch (error: any) {
        console.error("Error decoding token:", error.message);
        res.status(401).json({ message: "Invalid token" });
        return;
    }
};
