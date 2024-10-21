import { Request, Response, NextFunction } from 'express';
import UserUseCase from '../useCase/userUseCase';


class UserController {
    private userUseCase: UserUseCase;
    constructor(userUseCase: UserUseCase) {
        this.userUseCase = userUseCase
    }


    async login(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('loginpage');
            console.log(req.body);
            
          
        } catch (error) {
            console.log(error);
            next(error); // Pass the error to the next middleware
        }
    }



    async signup(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('signup page success');
           const formData = req.body
           console.log(formData);
           const  response = await this.userUseCase.signup(formData)
           if(response)
            res.status(response.status).json(response.data);
        } catch (error) {
            console.log(error);
            next(error); 
        }
    }
}

export default UserController;
