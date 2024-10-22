import express from 'express'
const routes = express.Router();
import UserController from '../../adapters/userControllers';
import UserUseCase from '../../useCase/userUseCase';
import UserRepository from '../repository/userRepository';
import EncryptPassword from '../services/bcryptPassword';
import jwtService from '../services/generateToken';
const userRepository = new UserRepository()
const encryptPassword = new EncryptPassword()
const jwtServices = new jwtService()
const useCase = new UserUseCase(userRepository, encryptPassword, jwtServices)
const userController = new UserController(useCase)

routes.post('/login',(req,res,next) => userController.login(req,res,next))
routes.post('/signup',(req,res,next) => userController.signup(req,res,next))

export default routes