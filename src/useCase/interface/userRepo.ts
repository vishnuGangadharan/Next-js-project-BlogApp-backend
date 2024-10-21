import UserData from "../../domain/userInterface";


interface UserRepo{
    findByEmail(email:string) : Promise<UserData | null>
    save(userInfo: UserData) : Promise<UserData>
}

export default UserRepo