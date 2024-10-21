import UserData from "../../domain/userInterface"
import UserRepo from "../../useCase/interface/userRepo"
import UserModel from "../database/userModel"

class UserRepository implements UserRepo {

    async findByEmail(email: string): Promise<UserData | null> {
         const exist = await UserModel.findOne({email:email})        
        return exist
    }

    async save(userInfo: UserData): Promise<UserData> {
        const user = new UserModel(userInfo)
        const saveUser = await user.save()
        return saveUser
    }
 
}

export default UserRepository