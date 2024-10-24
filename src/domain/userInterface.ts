import { Document, Schema } from "mongoose";


export default interface UserData {
    _id:string
    name: string
    email: string
    Designation: string
    password: string
    profilePicture: string
    isBlocked: boolean;
    isAdmin: boolean;
    
}

export interface postData {
    heading : string;
    content : string;
    topics  : string[];
    fileUrl : string | null;
    Category: string ;
    userId:  Schema.Types.ObjectId; 

}