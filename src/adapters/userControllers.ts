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
            const { email, password} = req.body;
            const response = await this.userUseCase.login(email, password)
            if(response){
                if(response.status ==200){
                    res.cookie('authToken',response.data.token , {
                        httpOnly:true,
                        secure: process.env.NODE_ENV === 'production',
                        maxAge: 604800000,
                    })
                }

                res.status(response?.status).json(response?.data)
            }
        } catch (error) {
            console.log(error);
            next(error); 
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
