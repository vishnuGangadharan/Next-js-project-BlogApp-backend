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
                        httpOnly:false,
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

    async addPost(req: Request, res: Response, next: NextFunction){
        try {
            console.log('add post page');
            console.log(req.body);
            let data = req.body
            const response = await this.userUseCase.addPost(data)
            if(response)
                res.status(response.status).json(response.data)
        } catch (error) {
            console.log(error);
            next(error)
            
        }
    }

    async getPost(req: Request, res: Response, next: NextFunction){
        try {
            console.log('get psots');

            const response = await this.userUseCase.getPosts()
            if(response)
                res.status(response.status).json(response.data)
            
        } catch (error) {
            console.log(error);
            next(error)
            
        }
    }



    async deletePost(req: Request, res: Response, next: NextFunction){
        try {
            const { postId } = req.params;
            console.log(postId);
            
        const response = await this.userUseCase.deletePost(postId)   
        if(response){
            res.status(response.status).json(res.json)
        }         
            
        } catch (error) {
            console.log(error);
            next(error)
            
        }
    }


    async postDetails(req: Request, res: Response, next: NextFunction){
        try {
            console.log('details page');
            const { postId } = req.params;
            console.log(postId);
            const response = await this.userUseCase.postDetails(postId)
            if(response)
                res.status(response.status).json(response.data)
        } catch (error) {
            next(error)
        }
    }

    async postUpdate(req: Request, res: Response, next: NextFunction){
        try {
            const { postId, ...changes } = req.body;
            const response = await this.userUseCase.upadatePost(postId,changes)
            if(response){
                res.status(response.status).json(response.data)
            }
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}

export default UserController;
