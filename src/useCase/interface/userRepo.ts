import UserData, { postData } from "../../domain/userInterface";


interface UserRepo{
    findByEmail(email:string) : Promise<UserData | null>
    save(userInfo: UserData) : Promise<UserData>
    savePost(data:postData) : Promise<postData>
    getPosts() : Promise<postData[] | null>
    deleteByPostId(postId: string): Promise<boolean>
    postDetails(postId : string) :Promise<postData | null>
    updatePost(postId:string, data: postData) : Promise <postData | null>
}

export default UserRepo