import UserData, { postData } from "../domain/userInterface";
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


    async addPost(data : postData){
        try {
            const savePost = this.userRepository.savePost(data)
            if(savePost && savePost !== null){
                return {
                    status: 200,
                    data:{
                        message: 'post added successfully',
                        data : data
                    }
                }
            }else{
                return {
                    status: 400,
                    data:{
                        message: 'some error in adding post',
                        data : data
                    }
                }
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    async getPosts(){
        try {
            const posts = await this.userRepository.getPosts()
            if(posts){
                return {
                    status: 200,
                    data:posts
                }
            }
        } catch (error) {
            
        }
    }

    async deletePost(postId : string) {
        try {
            const deletePost = await this.userRepository.deleteByPostId(postId)

            if(deletePost){
                return{
                    status: 200,
                    data :{
                        message: 'post deleted',
                    }
                }
            }
        } catch (error) {
            
        }
    }


    async postDetails(postId: string){
        try {
            const postDetails = await  this.userRepository.postDetails(postId)
            if(postDetails){
                return {
                    status: 200,
                    data :{
                        data: postDetails
                    }
                }
            }
        } catch (error) {
            
        }
    }

    async upadatePost(postId: string , changes: postData){
        try {
            const updatePost = await this.userRepository.updatePost(postId,changes)
            if(updatePost){
                return {
                    status: 200,
                    data:{
                        message:'post updated',
                        data: updatePost
                    }
                }
            }
        } catch (error) {
            console.log(error);
            
        }
    }

}


export default UserUseCase