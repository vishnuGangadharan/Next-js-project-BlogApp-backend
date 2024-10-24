import mongoose, { Schema, Model }  from "mongoose";
import { postData } from "../../domain/userInterface";

const postSchema:Schema = new Schema<postData | Document>({
    heading: {
        type: String, 
        required: true
    },
    content: {
        type: String,
        required:true
    },
    topics :{
        type: [String],
    },
    fileUrl:{
        type:String
    },
    Category :{
        type:String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }

   
},{ timestamps: true });

const postModel:Model<postData&Document>=mongoose.model<postData & Document>("Post", postSchema);

export default postModel;