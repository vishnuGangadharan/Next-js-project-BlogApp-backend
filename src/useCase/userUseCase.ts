import UserData from "../domain/userInterface";
import UserRepository from "../infrastructure/repository/userRepository";
import EncryptPassword from "../infrastructure/services/bcryptPassword";
class UserUseCase{
    private userRepository : UserRepository
    private encryptedPassword: EncryptPassword
    constructor(
        userRepository : UserRepository,
        encryptedPassword: EncryptPassword
    ){
        this.userRepository = userRepository
        this.encryptedPassword = encryptedPassword
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


}


export default UserUseCase