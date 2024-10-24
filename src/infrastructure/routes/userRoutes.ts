import express from 'express'
const routes = express.Router();
import UserController from '../../adapters/userControllers';
import UserUseCase from '../../useCase/userUseCase';
import UserRepository from '../repository/userRepository';
import EncryptPassword from '../services/bcryptPassword';
import jwtService from '../services/generateToken';
import { userAuth } from '../middileware/userAuth';
import errorHandle from '../middileware/errorHandler';
const userRepository = new UserRepository()
const encryptPassword = new EncryptPassword()
const jwtServices = new jwtService()
const useCase = new UserUseCase(userRepository, encryptPassword, jwtServices)
const userController = new UserController(useCase)

routes.post('/login',(req,res,next) => userController.login(req,res,next))
routes.post('/signup',(req,res,next) => userController.signup(req,res,next))
routes.post('/addPost',userAuth,(req,res,next) => userController.addPost(req,res,next))
routes.get('/allPosts',userAuth,(req,res,next) => userController.getPost(req,res,next))
routes.delete('/deletePost/:postId',userAuth,(req,res,next) => userController.deletePost(req,res,next))
routes.get('/postDetails/:postId',userAuth,(req,res,next) => userController.postDetails(req,res,next))
routes.post('/updatePost',userAuth,(req,res,next) => userController.postUpdate(req,res,next))


routes.use(errorHandle)

export default routes