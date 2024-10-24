import UserData, { postData } from "../../domain/userInterface"
import UserRepo from "../../useCase/interface/userRepo"
import postModel from "../database/postModel"
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

    async savePost(data: postData): Promise<postData> {
        const post = new postModel(data)
        const savedPost = await post.save()
        return savedPost
    }

    async getPosts(): Promise<postData[] | null> {
        const post =await postModel.find({})
        
        return post
    }


    async deleteByPostId(postId : string): Promise<boolean> {
        const deletePost = await postModel.findByIdAndDelete(postId)
       return deletePost ? true : false
    }
    
    async postDetails(postId: string): Promise<postData | null> {
        const data = await postModel.findById(postId).populate('userId', 'name email'); 
        return data
    }

    async updatePost(postId: string, data: postData): Promise<postData | null> {
        const updatePost = await postModel.findByIdAndUpdate(postId,data, {
            new :true,
            runValidators : true
        })
        return updatePost
    }
}

export default UserRepository