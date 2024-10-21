import mongoose, { Schema, Model }  from "mongoose";
import UserData from "../../domain/userInterface";

const userSchema:Schema = new Schema<UserData | Document>({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String,
         required: true
        },
    password: {
        type: String, 
        required: true
        },
    profilePicture: {
        type: String,
         default: "https://www.w3schools.com/w3images/avatar2.png"
        },
    isBlocked: {
        type: Boolean,
         default: false
        },
    isAdmin: {
        type: Boolean, 
        default: false
        },
    Designation :{
        type:String,
        required:true
    }
},{ timestamps: true });

const UserModel:Model<UserData&Document>=mongoose.model<UserData & Document>("User", userSchema);

export default UserModel;