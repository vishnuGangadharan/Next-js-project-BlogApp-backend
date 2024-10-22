import UserData from "../domain/userInterface";
import UserRepository from "../infrastructure/repository/userRepository";
import EncryptPassword from "../infrastructure/services/bcryptPassword";
import jwtService from "../infrastructure/services/generateToken";


class UserUseCase{
    private userRepository : UserRepository
    private encryptedPassword: EncryptPassword
    private jwtService : jwtService
    constructor(
        userRepository : UserRepository,
        encryptedPassword: EncryptPassword,
        jwtService : jwtService
    ){
        this.userRepository = userRepository
        this.encryptedPassword = encryptedPassword
        this.jwtService = jwtService
        
    }

    async signup(formData : UserData){
        try {
            const existingUser =await this.userRepository.findByEmail(formData.email)
            console.log('ff',existingUser);
            
            if(existingUser){
                return {
                    status: 400,
                    data:{
                        message:'User already exist'
                    }
                }
            }
            const hashPassword = await this.encryptedPassword.encryptPassword(formData.password)
            formData.password = hashPassword
          const saveUser = await this.userRepository.save(formData)
          return {
            status: 200,
            data:{
                message:'signup success'
            }
          }
        } catch (error) {
            console.log(error);
            
        }
    }


    async login (email: string, password: string){
        try {
            const userExist = await this.userRepository.findByEmail(email)
            let token = ''
            if(!userExist){
                return {
                    status: 400,
                    data:{
                        message:'User not exist'
                    }
                }
            }
            if(userExist && userExist.isBlocked){
                return {
                    status: 400,
                    data:{
                        message:'User is blocked'
                    }
                }
            }

            const passwordMatch = await this.encryptedPassword.compare(password, userExist.password)
            if(passwordMatch && userExist.isAdmin){
                token = this.jwtService.generateToken(userExist._id, 'admin')
                return {
                    status: 200,
                    data: {
                        status: true,
                        message:userExist,
                        token,
                        isAdmin: true
                    }
                }

            }
            else if(passwordMatch){
                token = this.jwtService.generateToken(userExist._id, 'user')
                
                return {
                    status: 200,
                    data: {
                        status: true,
                        message: userExist,
                        token
                    }
                }

            }else{
                return{
                status: 400,
                data: {
                    status: false,
                    message: "Invalid Credentials",
                    token: ""
                }
            }
            }
            
        } catch (error) {
            
        }
    }


}


export default UserUseCase